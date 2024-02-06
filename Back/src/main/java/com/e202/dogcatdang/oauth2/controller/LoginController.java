package com.e202.dogcatdang.oauth2.controller;

import com.amazonaws.services.ec2.model.UserData;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.oauth2.dto.CustomOAuth2User;
import com.e202.dogcatdang.oauth2.dto.OauthUserDTO;
import com.e202.dogcatdang.oauth2.service.CustomOAuth2UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginController {

    private final UserRepository userRepository;

    private final CustomOAuth2UserService customOAuth2UserService;
    public LoginController(UserRepository userRepository, CustomOAuth2UserService customOAuth2UserService) {
        this.userRepository = userRepository;
        this.customOAuth2UserService = customOAuth2UserService;
    }

    @GetMapping("/oauth2/oLogin")
    public String loginPage(){
        System.out.println("되는겨?");
        return "oLogin";
    }

    @PostMapping("/oauth2/register")
    public ResponseEntity<String> registerUser(@RequestBody UserData userData) {
        //customOAuth2UserService.loadUser(userData); // 서비스 클래스에서 사용자 생성 작업을 처리
        return ResponseEntity.ok("User registered successfully!");
    }
//
//    @PostMapping("/oauth2/join")
//    public ResponseEntity<String> registerUser(@RequestBody OauthUserDTO oauthUserDTO) {
//        // 사용자 정보를 받아서 새로운 사용자 등록
//        User user = new User();
//        user.setUsername(userData.getUsername());
//        user.setEmail(userData.getEmail());
//        // 추가 필드 설정
//        userRepository.save(user);
//        return ResponseEntity.ok("User registered successfully!");
//    }
//    @GetMapping("/login/oauth2/code/google")
//    public Map<String, Object> showAdditionalInfoForm(OAuth2AuthenticationToken authentication) {
//        System.out.println("getmapping 인데 안도냐?");
//        Map<String, Object> userInfo = new HashMap<>();
//        OAuth2User principal = authentication.getPrincipal();
//
//        if (principal instanceof CustomOAuth2User) {
//            CustomOAuth2User customOAuth2User = (CustomOAuth2User) principal;
//            String key = customOAuth2User.getUserName();
//            userInfo.put("key", key);
//        } else {
//            userInfo.put("key", principal.getAttribute("key"));
//        }
//
////        userInfo.put("email", principal.getAttribute("email"));
//        // 다른 필요한 사용자 정보도 추가할 수 있습니다.
//        System.out.println(userInfo.toString());
//        System.out.println("@GetMapping 잘 도냐");
//        return userInfo;
//    }

//    @GetMapping("/login/oauth2/code/google")
//    @ResponseBody
//    public String useAccessToken(HttpServletRequest request) {
//        // HttpServletRequest를 통해 세션을 얻습니다.
//        HttpSession session = request.getSession();
//
//        // 세션에서 액세스 토큰을 가져옵니다.
//        String accessToken = (String) session.getAttribute("accessToken");
//
//        // 액세스 토큰을 사용하여 작업을 수행합니다.
//        if (accessToken != null) {
//            // 액세스 토큰을 사용하는 작업을 수행합니다.
//            return "액세스 토큰 사용 완료";
//        } else {
//            return "액세스 토큰이 세션에 없습니다.";
//        }
//    }

//    @GetMapping("/login/oauth2/code/google")
//    public String handleGoogleOAuthCallback(@RequestParam("code") String code, Model model) {
//        // OAuth 인증 코드를 처리하는 로직을 구현합니다.
//        // 인증 코드를 이용하여 액세스 토큰을 요청하고 필요한 작업을 수행합니다.
//
//        // 예시: 모델에 인증 코드 추가하여 View로 전달
//        model.addAttribute("code", code);
//
//        // 다음 작업을 수행할 페이지로 리디렉션합니다.
//        return "redirect:/welcome";
//    }
}
