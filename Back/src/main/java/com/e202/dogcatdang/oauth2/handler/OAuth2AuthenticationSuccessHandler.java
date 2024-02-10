package com.e202.dogcatdang.oauth2.handler;

import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.oauth2.dto.CustomOAuth2User;
import com.e202.dogcatdang.user.dto.CustomUserDetails;
import com.e202.dogcatdang.user.jwt.JWTUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
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
        System.out.println("성공 handler");
        Object principal = authentication.getPrincipal();
        System.out.println(principal.toString());
        System.out.println("아직 handler 안");
        String email = "";

        if(principal instanceof CustomOAuth2User) {
            System.out.println("principal instanceof OAuth2User ㅎ_ㅎ");
//            System.out.println(((OAuth2User) principal).getAuthorities().toString());
            email = ((CustomOAuth2User) principal).getEmail();
        }else{
            System.out.println("말도안되는 소리 하지마");
        }

        System.out.println("email : " + email);
        Optional<User> userOptional = userRepository.findByEmail(email);
        User user = userOptional.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " ));



         //사용자 정보를 바탕으로 JWT 생성
        String token= jwtUtil.createJwt(user.getId(),user.getUsername(),user.getRole(),user.getNickname(),10_000_000L);

        response.addHeader("Authorization", "Bearer " + token); // 생성된 JWT를 응답 헤더에 추가
        super.onAuthenticationSuccess(request, response, authentication);

    }
}
