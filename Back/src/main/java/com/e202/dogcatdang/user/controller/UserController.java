package com.e202.dogcatdang.user.controller;

import com.e202.dogcatdang.user.Service.JoinService;
import com.e202.dogcatdang.user.dto.JoinDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Iterator;
import java.util.Map;


@RestController
@RequestMapping("/api/user")
public class UserController {


    private final JoinService joinService;

    // 생성자 주입 방식으로 JoinService 주입
    public UserController(JoinService joinService) {
        this.joinService = joinService;
    }


    @PostMapping("/join") //회원가입
    public ResponseEntity<String> joinUser(@RequestBody JoinDTO joinDTO) {
        joinService.joinUser(joinDTO);
        return ResponseEntity.ok("User joined successfully");
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

    @GetMapping("/admin")
    public String adminP() {

        return "Admin  in user Controller";
    }

//    //중복 확인
//    @PostMapping("/username-check")
//    public ResponseEntity<?> checkIdDuplicate(@RequestParam("username") String username) {
//        boolean isUsernameDuplicate = joinService.isUsernameDuplicate(username);
//        System.out.println("Username 중복검사:" + isUsernameDuplicate);
//        return ResponseEntity.ok(!isUsernameDuplicate);
//    }

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
}
