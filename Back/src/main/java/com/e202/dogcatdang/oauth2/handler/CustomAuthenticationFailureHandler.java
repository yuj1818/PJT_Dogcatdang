package com.e202.dogcatdang.oauth2.handler;

import com.e202.dogcatdang.exception.CustomOAuth2AuthenticationException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        if (exception instanceof CustomOAuth2AuthenticationException) {

            System.out.println("ExceptionHandler 잘 오니?");
            // metadata를 세션에 저장
            String metadata = ((CustomOAuth2AuthenticationException) exception).getMetadata();
            request.getSession().setAttribute("OAUTH2_METADATA", metadata);

            // 사용자 정의 예외에 따라 프론트엔드의 특정 URL로 리다이렉트
            // getRedirectStrategy().sendRedirect(request, response, "/signUp?error=notfound");
            getRedirectStrategy().sendRedirect(request, response, "http://localhost:5173/signUp");
        } else {
            super.onAuthenticationFailure(request, response, exception);
        }
    }
}