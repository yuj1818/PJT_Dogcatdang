package com.e202.dogcatdang.refresh.controller;

import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.RefreshTokenRepository;
import com.e202.dogcatdang.db.repository.UserRepository;
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

    private final UserRepository userRepository;

    private final RefreshTokenRepository refreshTokenRepository;
    private final CustomUserDetailsService customUserDetailsService;
    private final JWTUtil jwtUtil;


    public RefreshTokenController(RefreshTokenService refreshTokenService, UserRepository userRepository, RefreshTokenRepository refreshTokenRepository, CustomUserDetailsService customUserDetailsService, JWTUtil jwtUtil) {
        this.refreshTokenService = refreshTokenService;
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.customUserDetailsService = customUserDetailsService;
        this.jwtUtil = jwtUtil;
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshAccessToken(HttpServletRequest request) {
        System.out.println("refresh token api");
        String refreshToken = request.getHeader("RefreshToken");
        System.out.println("refresh token api2");
        System.out.println("refreshToken : " + refreshToken);

        // Authorization 헤더에서 액세스 토큰 추출
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String accessToken = authorizationHeader.substring(7); // "Bearer " 제거

            try {
                // 액세스 토큰에서 사용자 정보 추출
                Long userId = jwtUtil.getUserId(accessToken);
                String username = jwtUtil.getUsername(accessToken);
                String role = jwtUtil.getRole(accessToken);
                String nickname = jwtUtil.getNickname(accessToken);


                return refreshTokenService.validateRefreshToken(refreshToken)
                        .map(validRefreshToken -> {

                            System.out.println("리턴문 안도냐?");
//                    User user = validRefreshToken.getUser();
//                    System.out.println("user : " + user);
//                    Long userId = validRefreshToken.getUser().getId();
//                    System.out.println("userId : " + userId);
//                    String email = user.getEmail();
//                    System.out.println("email : " + email);
//                    String role = user.getRole();
//                    System.out.println("role : " + role);
//                    String nickname= user.getNickname();
//                    System.out.println("nickname : " + nickname);

                            String newAccessToken = jwtUtil.createJwt(userId, username, role, nickname, 900_000L); // 새 액세스 토큰 생성

                            // 새 액세스 토큰을 Authorization 헤더에 추가
                            HttpHeaders headers = new HttpHeaders();
                            headers.add("Authorization", "Bearer " + newAccessToken);
                            headers.add("RefreshToken" , refreshToken);
                            System.out.println("발급 완료");
                            return new ResponseEntity<>(null, headers, HttpStatus.OK);
                        })
                        .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token"));
            } catch (Exception e) {
                // 토큰 파싱 실패 또는 유효하지 않은 토큰 처리
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid access token");
            }
        } else {
            // 액세스 토큰이 없는 경우의 처리
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing access token");
        }
    }
}
