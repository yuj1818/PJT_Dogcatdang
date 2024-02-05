package com.e202.dogcatdang.oauth2.service;

import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.oauth2.dto.CustomOAuth2User;
import com.e202.dogcatdang.oauth2.dto.GoogleResponse;
import com.e202.dogcatdang.oauth2.dto.NaverResponse;
import com.e202.dogcatdang.oauth2.dto.OAuth2Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {


        //유저 정보가져오기 userRequest는 구글 ,naver가 준거
        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println(oAuth2User.getAttributes());

        //네이버인지 구글인지 알아오는 변수
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        OAuth2Response oAuth2Response = null;

        CustomOAuth2User customOAuth2User = null;

        //받는 데이터 규격이 달라서 놔눠야댐.

        if(registrationId.equals("naver")){
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        }
        else if(registrationId.equals("google")){
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        }

        else{
            //? 뭐지
            return null;
        }


        String username = oAuth2Response.getProvider()+"_" +oAuth2Response.getProviderId();
        String email = oAuth2Response.getEmail();
        //String username = customOAuth2User.getUserName();
        System.out.println("여긴 들어오니?");
        System.out.println(username);
        //이미 있는 아이디 인지 확인
        User existData = userRepository.findByEmail(email);

//        Optional<User> existData= userRepository.findById(1L);
        System.out.println("여긴 나가니?");

        String role = null;

        if(existData == null){
            //회원가입 하러가
            System.out.println("회원가입 하러가");

////            System.out.println("null 일때");
////            User user = new User();
////            user.setUsername(username);
////            user.setEmail(oAuth2Response.getEmail());
////            user.setRole("ROLE_USER");
////            user.setPassword(username);
////            user.setAddress(username);
////            user.setNickname(username);
////            user.setPhone(username);
//
//           userRepository.save(user);
        }
        else{
            //이미 있는 이메일이면 메인으로 가야지?
            System.out.println("이미 존재하는 ID");
//            role = existData.getRole();
//            existData.setEmail(oAuth2Response.getEmail());
//            userRepository.save(existData);

        }



        //나머지 구현
        return new CustomOAuth2User(oAuth2Response, role);




    }
}
