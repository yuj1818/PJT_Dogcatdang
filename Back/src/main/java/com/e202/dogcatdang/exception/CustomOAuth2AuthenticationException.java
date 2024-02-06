package com.e202.dogcatdang.exception;

import org.springframework.security.core.AuthenticationException;

import java.sql.SQLOutput;

public class CustomOAuth2AuthenticationException extends AuthenticationException {


    public CustomOAuth2AuthenticationException(String msg) {
        super(msg);
    }
}


