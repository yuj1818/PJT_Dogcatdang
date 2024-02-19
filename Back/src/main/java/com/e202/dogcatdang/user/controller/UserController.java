package com.e202.dogcatdang.user.controller;

import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.user.Service.JoinService;
import com.e202.dogcatdang.user.Service.UserProfileService;
import com.e202.dogcatdang.user.dto.CustomUserDetails;
import com.e202.dogcatdang.user.dto.JoinDTO;
import com.e202.dogcatdang.user.dto.LoginRequestDTO;
import com.e202.dogcatdang.user.dto.UserProfileDTO;
import com.e202.dogcatdang.user.jwt.JWTUtil;
import jakarta.persistence.Id;
import org.hibernate.mapping.Join;
import org.hibernate.tool.schema.internal.exec.ScriptTargetOutputToUrl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Iterator;
import java.util.Map;
import java.util.NoSuchElementException;


@RestController
@RequestMapping("/api/users")
public class UserController {


    private final JoinService joinService;
    private final UserProfileService userProfileService;
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;




    // 생성자 주입 방식으로 JoinService 주입
    public UserController(JoinService joinService, UserProfileService userProfileService, AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        this.joinService = joinService;
        this.userProfileService = userProfileService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }


    @PostMapping("/join") //회원가입
    public ResponseEntity<String> joinUser(@RequestBody JoinDTO joinDTO) {
        System.out.println("회원가입 완료");
        joinService.joinUser(joinDTO);
        return ResponseEntity.ok("User joined successfully");
    }

    @PostMapping("/logout") // 로그아웃
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext(); // 현재 사용자의 보안 컨텍스트를 지움
        return ResponseEntity.ok("Logged out successfully");
    }

    @DeleteMapping("")
    public ResponseEntity<String> deleteUser(@RequestHeader("Authorization") String token) {
        // JWT 토큰을 검증하여 유효한 사용자인지 확인
        Long id = jwtUtil.getUserId(token);
        if (id == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid JWT token");
        }

        // 유효한 사용자라면 해당 사용자를 삭제
        try {
            userProfileService.deleteUser(id); // 회원 삭제 메소드 호출
            return ResponseEntity.ok("User deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user");
        }
    }

    @GetMapping("") //테스트 메인페이지
    public String mainP() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iter = authorities.iterator();
        GrantedAuthority auth = iter.next();
        String role = auth.getAuthority();

        return "Main page" + username +" "+ role;

    }


    @PostMapping("/username-check")
    public ResponseEntity<?> checkIdDuplicate(@RequestBody Map<String, Object> reqeustBody) {
        String username = (String) reqeustBody.get("username");
        boolean isUsernameDuplicate = joinService.isUsernameDuplicate(username);
        System.out.println("Username 중복검사:" + isUsernameDuplicate);
        if (isUsernameDuplicate) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username is already in use");
        } else {
            return ResponseEntity.ok("username is available");
        }
    }
    @PostMapping("/email-check")
    public ResponseEntity<?> checkEmailDuplicate(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        boolean isEmailDuplicate = joinService.isEmailDuplicate(email);
        System.out.println("Email 중복검사:" + isEmailDuplicate);
        if (isEmailDuplicate) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already in use");
        } else {
            return ResponseEntity.ok("Email is available");
        }
    }

    @PostMapping("/nickname-check")
    public ResponseEntity<?> checkNicknameDuplicate(@RequestBody Map<String, String> requestBody) {
        String nickname = requestBody.get("nickname");
        boolean isNicknameDuplicate = joinService.isNicknameDuplicate(nickname);
        System.out.println("Nickname 중복검사: " + isNicknameDuplicate);
        if (isNicknameDuplicate) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Nickname is already in use");
        } else {
            return ResponseEntity.ok("Nickname is available");
        }
    }


    //유저 조회
    @GetMapping("/profiles/{userId}")
    public ResponseEntity<UserProfileDTO> getUserProfile(@PathVariable("userId") Long userId) {
        System.out.println("/api/users/profiles/userId getMapping");
        try {
            UserProfileDTO userProfileDTO;
            userProfileDTO = userProfileService.getUserProfile(userId);
            return ResponseEntity.ok(userProfileDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }


    // 유저 정보 수정
    @PutMapping("/profiles/{userId}")
    public ResponseEntity<?> updateUserProfile(@PathVariable("userId") Long userId, @RequestBody UserProfileDTO userProfileDTO) {
        System.out.println("put profiles/userId");
        try {
            // 업데이트된 유저 정보를 받아서 반환
            User updatedUser = userProfileService.updateUserProfile(userId, userProfileDTO);


            return ResponseEntity.ok("nice  "); // 업데이트된 유저 정보 반환
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update user profile");
        }
    }


    @GetMapping("/admin")
    public String adminP() {

        return "Admin  in user Controller";
    }


}
