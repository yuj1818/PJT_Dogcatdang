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

}
