package com.e202.dogcatdang.oauth2.handler;

import com.e202.dogcatdang.exception.CustomOAuth2AuthenticationException;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        if (exception instanceof CustomOAuth2AuthenticationException) {

            System.out.println("ExceptionHandler 잘 오니?");
            // metadata를 세션에 저장
            String metadata = ((CustomOAuth2AuthenticationException) exception).getMetadata();
            //request.getSession().setAttribute("OAUTH2_METADATA", metadata);

            System.out.println("metadata : " + metadata.toString());
            //URL에 포함될수 있도록 인코딩
            String encodedMetadata = URLEncoder.encode(metadata, StandardCharsets.UTF_8.toString());

            // 리다이렉션 URL에 메타데이터 쿼리 파라미터 추가
            String redirectUrl = "http://localhost:5173/signup/inv?oauth=true&metadata=" + encodedMetadata;
            getRedirectStrategy().sendRedirect(request, response, redirectUrl);
        } else {
            super.onAuthenticationFailure(request, response, exception);
        }
    }
}