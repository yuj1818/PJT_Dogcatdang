package com.e202.dogcatdang.oauth2.service;

import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.exception.CustomOAuth2AuthenticationException;
import com.e202.dogcatdang.oauth2.OAuth2Metadata;
import com.e202.dogcatdang.oauth2.dto.CustomOAuth2User;
import com.e202.dogcatdang.oauth2.dto.GoogleResponse;
import com.e202.dogcatdang.oauth2.dto.NaverResponse;
import com.e202.dogcatdang.oauth2.dto.OAuth2Response;
import com.e202.dogcatdang.user.Service.JoinService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;

import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

//    private final JoinService joinService;
    private final UserRepository userRepository;



    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2Metadata oAuth2Metadata = new OAuth2Metadata();
        System.out.println("load user 왜 안들와 ㅁㄴㅇ러ㅣㅏㅁㄴ;ㅇ러");
        //유저 정보가져오기 userRequest는 구글 ,naver가 준거
        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println(oAuth2User.getAttributes());

        //네이버인지 구글인지 알아오는 변수
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        OAuth2Response oAuth2Response = null;


        //받는 데이터 규격이 달라서 놔눠야댐.

        if(registrationId.equals("naver")){
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        }
        else if(registrationId.equals("google")){
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        }

        else{
            //? 구글 네이버 외 다른 provider 처리하는곳
            return null;
        }
        String metaProviderId = oAuth2Response.getProviderId();
        String metaEmail = oAuth2Response.getEmail();

        System.out.println("metaProvider : " + metaProviderId);
        System.out.println("metEmail :" + metaEmail);
        oAuth2Metadata.setProviderId(metaProviderId);
        oAuth2Metadata.setMetaEmail(metaEmail);
        String metadata = "";
        try {
            ObjectMapper metadataObject = new ObjectMapper();
            metadata = metadataObject.writeValueAsString(oAuth2Metadata);
        } catch (JsonProcessingException e) {
            System.out.println("왜 json 에러?");
            throw new RuntimeException(e);
        }

        String username = oAuth2Response.getProvider()+"_" +oAuth2Response.getProviderId();
        String email = oAuth2Response.getEmail();
        System.out.println("여긴 들어오니?");
        System.out.println(username);

        System.out.println("email : " + email);
        //이미 있는 아이디 인지 확인
        Optional<User> existData = userRepository.findByEmail(email);
        //User existData = userRepository.findByEmail(email);

        System.out.println("여긴 나가니?");

        String role = null;

//        String jwt = userRequest.getAccessToken().getTokenValue();
//        String sub = (String) oAuth2User.getAttribute("sub");
        if(existData.isEmpty()){
            //회원가입 하러가
            System.out.println("회원가입 하러가");

            //metadata 랑 exception 던져서 redirect 하기( metadata 도 넘기기)
            throw new CustomOAuth2AuthenticationException("User not found.",metadata);

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
