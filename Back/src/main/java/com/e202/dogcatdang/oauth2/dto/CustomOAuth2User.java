package com.e202.dogcatdang.oauth2.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class CustomOAuth2User implements OAuth2User {

    private final OAuth2Response oAuth2Response;
    private final String role;

    public CustomOAuth2User(OAuth2Response oAuth2Response, String role) {
        this.oAuth2Response = oAuth2Response;
        this.role = role;

    }

    //넘어오는 모든 데이터 ?
    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }


    //Role 값
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return role;
            }
        });

        return collection;
    }

    @Override
    public String getName() {

        return oAuth2Response.getName();
    }



    public String getUserName() {
        //username 이라는 속성은 따로 없음. (naver,google)
        return oAuth2Response.getProvider()+"_"+oAuth2Response.getProviderId();
    }

    public String getEmail() {

        return oAuth2Response.getEmail();
    }
}
