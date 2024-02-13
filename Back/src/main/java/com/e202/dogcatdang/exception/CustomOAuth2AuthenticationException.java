package com.e202.dogcatdang.exception;

import org.springframework.security.core.AuthenticationException;

import java.sql.SQLOutput;

public class CustomOAuth2AuthenticationException extends AuthenticationException {

    private String metadata;

    public CustomOAuth2AuthenticationException(String msg, String metadata) {
        super(msg);
        this.metadata = metadata;
    }

    public String getMetadata() {
        return metadata;
    }
}


