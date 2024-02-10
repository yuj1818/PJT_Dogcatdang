//package com.e202.dogcatdang.mypage.controller;
//
//
//import com.e202.dogcatdang.animal.dto.ResponseAnimalDto;
//import com.e202.dogcatdang.mypage.service.MyPageService;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//
//
//public class MyPageController {
//
//    private final MyPageService myPageService;
//
//    public MyPageController(MyPageService myPageService) {
//        this.myPageService = myPageService;
//    }
//
//
//    @GetMapping("api/profiles/{userId}")
//    public List<ResponseAnimalDto> getUserProfile(@PathVariable Long userId){
//        System.out.println("유저 프로필 조회 마이페이지.");
//        return myPageService.findAll(userId);
//
//    }
//
//    @PutMapping("api/profiles/{userId}")
//    public void modifyUserProfile(){
//
//        System.out.println("유저 정보 수정");
//    }
//}
