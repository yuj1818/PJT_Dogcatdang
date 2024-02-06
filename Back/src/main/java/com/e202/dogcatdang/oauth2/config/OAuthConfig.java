//package com.e202.dogcatdang.oauth2.config;
//
//
//import com.e202.dogcatdang.oauth2.service.CustomOAuth2UserService;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class OAuthConfig {
//    private final CustomOAuth2UserService customOAuth2UserService;
//
//
//    public OAuthConfig(CustomOAuth2UserService customOAuth2UserService) {
//        this.customOAuth2UserService = customOAuth2UserService;
//    }
//
//    @Bean
//    public SecurityFilterChain OAuth2filterChain(HttpSecurity http) throws Exception{
//
//        http
//                .csrf((csrf) -> csrf.disable());
//
//        http
//                .formLogin((login) -> login.disable());
//
//        http
//                .httpBasic((basic) -> basic.disable());
//        http
//                .oauth2Login((oauth2) -> oauth2
//                        .loginPage("/oauth2/OLogin")
//                        .userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
//                                .userService(customOAuth2UserService)));
//
//
//
//        return http.build();
//
//    }
//}
