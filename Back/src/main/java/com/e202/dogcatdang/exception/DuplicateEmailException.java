package com.e202.dogcatdang.exception;

public class DuplicateEmailException extends RuntimeException {

    //회원가입 중복 오류 (username , email, nickname)
    public DuplicateEmailException(String message) {
        super(message);
    }
}