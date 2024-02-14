package com.e202.dogcatdang.refresh.controller;

import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.refresh.service.RefreshTokenService;
import com.e202.dogcatdang.user.Service.CustomUserDetailsService;
import com.e202.dogcatdang.user.dto.CustomUserDetails;
import com.e202.dogcatdang.user.jwt.JWTUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;


@RestController
@RequestMapping("api/users/")

public class RefreshTokenController {

    private final RefreshTokenService refreshTokenService;

    private final CustomUserDetailsService customUserDetailsService;
    private final JWTUtil jwtUtil;


    public RefreshTokenController(RefreshTokenService refreshTokenService, CustomUserDetailsService customUserDetailsService, JWTUtil jwtUtil) {
        this.refreshTokenService = refreshTokenService;
        this.customUserDetailsService = customUserDetailsService;
        this.jwtUtil = jwtUtil;
    }



    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshAccessToken(HttpServletRequest request) {
        String refreshToken = request.getHeader("Refresh-Token");
        return refreshTokenService.validateRefreshToken(refreshToken)
                .map(validRefreshToken -> {

                    User user = validRefreshToken.getUser();
                    Long userId = validRefreshToken.getUser().getId();
                    String email = user.getEmail();
                    String role = user.getRole();
                    String nickname= user.getNickname();



                    String newAccessToken = jwtUtil.createJwt(userId, email, role ,nickname, 900_000L ); // 새 액세스 토큰 생성

                    // 새 액세스 토큰을 Authorization 헤더에 추가
                    HttpHeaders headers = new HttpHeaders();
                    headers.add("Authorization", "Bearer " + newAccessToken);

                    return new ResponseEntity<>(null, headers, HttpStatus.OK);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token"));
    }
}