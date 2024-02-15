package com.e202.dogcatdang.user.jwt;

import com.e202.dogcatdang.db.entity.RefreshToken;
import com.e202.dogcatdang.refresh.service.RefreshTokenService;
import com.e202.dogcatdang.user.dto.CustomUserDetails;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    private final RefreshTokenService refreshTokenService;


    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, RefreshTokenService refreshTokenService) {
        this.refreshTokenService = refreshTokenService;

        super.setAuthenticationManager(authenticationManager);
        super.setFilterProcessesUrl("/api/users/login"); // 로그인 처리 경로 설정
        // 기타 초기화 코드...

        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

//    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
//
//        this.authenticationManager = authenticationManager;
//        this.jwtUtil = jwtUtil;
//    }

//
//    @Override
//    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
//
//        //클라이언트 요청에서 uid, password 추출
//        String uid = obtainUsername(request);
//        String password = obtainPassword(request);
//
//        System.out.println(uid);
//        //System.out.println(password);
//        //스프링 시큐리티에서 uid과 password를 검증하기 위해서는 token에 담아야 함
//        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(uid, password, null);
//
//        //token에 담은 검증을 위한 AuthenticationManager로 전달
//        return authenticationManager.authenticate(authToken);
//    }
@Override
public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
    try {
        // 요청 본문에서 JSON 데이터를 파싱하여 username과 password 추출
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(request.getInputStream());
        String username = jsonNode.get("username").asText();
        String password = jsonNode.get("password").asText();

        // 인증을 위한 UsernamePasswordAuthenticationToken 생성
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);

        // AuthenticationManager로 전달하여 인증 시도
        return authenticationManager.authenticate(authToken);
    } catch (IOException e) {
        throw new RuntimeException("Could not read request body", e);
    }
}

    //로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        String username= customUserDetails.getUsername();
        String nickname = customUserDetails.getNickname();
        Long id = customUserDetails.getId();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();

        String role = auth.getAuthority();

        String token= jwtUtil.createJwt(id,username,role,nickname,5400000L);
        // String token= jwtUtil.createJwt(id,username,role,nickname,10_000L);


        //key , 암호화 방식(끝에 꼭 한칸 띄우기) ,
        response.addHeader("Authorization","Bearer " + token);
        // 리프레시 토큰 생성 및 헤더에 추가
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(id);
        System.out.println("refreshToken 헤더에 추가~");
        response.addHeader("RefreshToken", refreshToken.getToken()); // 리프레시 토큰 헤더에 추가
        System.out.println("완료~~~");

    }

    //로그인 실패시 실행하는 메소드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {

        response.setStatus(401);
    }
}
