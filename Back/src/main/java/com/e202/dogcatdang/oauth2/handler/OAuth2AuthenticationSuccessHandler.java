package com.e202.dogcatdang.oauth2.handler;

import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.oauth2.dto.CustomOAuth2User;
import com.e202.dogcatdang.user.dto.CustomUserDetails;
import com.e202.dogcatdang.user.jwt.JWTUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Iterator;
import java.util.Optional;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;


    public OAuth2AuthenticationSuccessHandler(JWTUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("authentication : " + authentication);
        // 인증 정보에서 사용자의 고유 식별자 추출 (예: 사용자 이름)
        String username = authentication.getName();

        // 사용자의 인증 정보를 세션에 저장
        request.getSession().setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
        // 리다이렉션할 프론트엔드 URL 설정
        String targetUrl = "http://localhost:5173/oauth-success"; // 프론트엔드에서 처리할 경로
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
////Controller 로 코드 옮기기 (jwt 발급)
//        System.out.println("success 핸들러 들오냐?");
//        String email = "";
//        Object principal = authentication.getPrincipal();
//        if (principal instanceof CustomOAuth2User) {
//            email = ((CustomOAuth2User) principal).getEmail();
//        }
////         사용자 정보 조회 및 JWT 토큰 생성 로직
////         이메일을 기반으로 사용자 정보 조회 및 JWT 토큰 생성
//        Optional<User> userOptional = userRepository.findByEmail(email);
//        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " ));
//        String token = jwtUtil.createJwt(user.getId(), user.getUsername(), user.getRole(), user.getNickname(), 86400000L); // 1일 만료
//
//        // JWT를 쿠키에 저장하는 대신, 인증 성공 정보 페이지로 리디렉션
//        String targetUrl = "http://localhost:5173/oauth-success";
//        getRedirectStrategy().sendRedirect(request, response, targetUrl);
//    }
//
//@Override
//public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//    System.out.println("OAuth2 Authentication Success Handler");
//
//    // 인증된 사용자 이메일 추출
//    String email = "";
//    Object principal = authentication.getPrincipal();
//    if (principal instanceof CustomOAuth2User) {
//        email = ((CustomOAuth2User) principal).getEmail();
//    }
//
//
//    // 이메일을 기반으로 사용자 정보 조회 및 JWT 토큰 생성
//    Optional<User> userOptional = userRepository.findByEmail(email);
//    User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " ));
//    String token = jwtUtil.createJwt(user.getId(), user.getUsername(), user.getRole(), user.getNickname(), 86400000L); // 1일 만료
//
//    // jwt 쿠키 저장
//    String encodedToken = URLEncoder.encode("Bearer " + token, StandardCharsets.UTF_8.toString());
//
//    System.out.println("token :" + encodedToken);
//    Cookie cookie = new Cookie("Authorization", encodedToken);
//    cookie.setHttpOnly(true); // XSS 공격 방지
//    cookie.setPath("/"); // 전체 경로에서 쿠키 사용
//    cookie.setMaxAge(86400); // 쿠키 유효 시간
//    response.addCookie(cookie);
//
//    String targetUrl = "http://localhost:5173";
//    System.out.println("리다이렉트 간다?  ");
//    getRedirectStrategy().sendRedirect(request, response, targetUrl);
//    }


}
