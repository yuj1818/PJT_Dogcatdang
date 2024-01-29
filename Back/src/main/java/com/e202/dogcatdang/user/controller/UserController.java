package com.e202.dogcatdang.user.controller;

import com.e202.dogcatdang.user.Service.JoinService;
import com.e202.dogcatdang.user.dto.JoinDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Iterator;


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

}
