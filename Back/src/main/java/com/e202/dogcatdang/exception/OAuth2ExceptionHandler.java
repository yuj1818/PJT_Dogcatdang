package com.e202.dogcatdang.exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class OAuth2ExceptionHandler {

    @ExceptionHandler(CustomOAuth2AuthenticationException.class)
    public ResponseEntity<Object> handleCustomOAuth2AuthenticationException(CustomOAuth2AuthenticationException e) {
        Map<String, Object> body = new HashMap<>();
        body.put("error", "Unauthorized");
        body.put("message", e.getMessage());
        body.put("redirectUrl", "/oauth2/join"); //
        return new ResponseEntity<>(body, HttpStatus.UNAUTHORIZED);
    }
}