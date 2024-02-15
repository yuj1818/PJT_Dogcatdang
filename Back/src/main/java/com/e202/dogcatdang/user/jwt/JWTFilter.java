package com.e202.dogcatdang.user.jwt;

import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.user.dto.CustomUserDetails;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;


    //주입
    public JWTFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    //
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        //request에서 Authorization 헤더를 찾음
        String authorization= request.getHeader("Authorization");

        //Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {

            System.out.println("token null");
            filterChain.doFilter(request, response);

            //조건이 해당되면 메소드 종료 (필수)
            return;
        }


        if (authorization != null && authorization.startsWith("Bearer ")) {
            String token = authorization.substring(7); // "Bearer " 이후의 문자열을 토큰으로 사용
            try {
                // 토큰에서 사용자 이름을 추출합니다.
                String username = jwtUtil.getUsername(token);
                // 추가적으로 필요한 검증을 여기서 수행할 수 있습니다.

                // 사용자의 인증 정보를 설정합니다.
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(username, null, null); // 마지막 인자는 권한 목록입니다.
                SecurityContextHolder.getContext().setAuthentication(authentication);

                // 필터 체인을 계속 진행합니다.
                filterChain.doFilter(request, response);
            } catch (ExpiredJwtException e) {
                // 토큰 만료 예외 처리
                handleException(response, "Token expired", HttpServletResponse.SC_UNAUTHORIZED);
            } catch (Exception e) {
                // 다른 예외 처리
                handleException(response, "Authentication error", HttpServletResponse.SC_UNAUTHORIZED);
            }
        } else {
            filterChain.doFilter(request, response); // 토큰이 없거나 Bearer 타입이 아니면 다음 필터로 넘깁니다.
        }
    }

    private void handleException(HttpServletResponse response, String message, int status) throws IOException {
        System.out.println(message);
        response.setStatus(status);
        String errorMessage = "{\"error\": \"" + message + "\"}";
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(errorMessage);
    }
}
