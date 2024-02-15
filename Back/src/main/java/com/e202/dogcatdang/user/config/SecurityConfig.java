//package com.e202.dogcatdang.user.config;
//
//import com.e202.dogcatdang.user.jwt.JWTFilter;
//import com.e202.dogcatdang.user.jwt.JWTUtil;
//import com.e202.dogcatdang.user.jwt.LoginFilter;
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//
//import java.util.Collections;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    private final AuthenticationConfiguration authenticationConfiguration;
//
//    private final JWTUtil jwtUtil;
//
//    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, JWTUtil jwtUtil) {
//        this.authenticationConfiguration = authenticationConfiguration;
//        this.jwtUtil = jwtUtil;
//    }
//
//
//    @Bean
//    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//        return configuration.getAuthenticationManager();
//    }
//
//    @Bean
//    public BCryptPasswordEncoder bCryptPasswordEncoder() {
//
//        return new BCryptPasswordEncoder();
//    }
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//
//        //cors 설정
//        http.cors(cors -> cors
//                .configurationSource(new CorsConfigurationSource() {
//                    @Override
//                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
//                        CorsConfiguration configuration = new CorsConfiguration();
//
//                        //프론트엔드 서버 허용
//                        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));
//
//
//                        configuration.setAllowedMethods(Collections.singletonList("*"));
//                        configuration.setAllowCredentials(true);
//                        configuration.setAllowedHeaders(Collections.singletonList("*"));
//                        configuration.setMaxAge(3600L);
//                        //jwt Header Key값
//                        configuration.setExposedHeaders(Collections.singletonList("Authorization"));
//
//                        return configuration;
//                    }
//                }));
//
//
//        //csrf disable
//        http
//                .csrf((auth) -> auth.disable());
//
//        //From 로그인 방식 disable
//        http
//                .formLogin((auth) -> auth.disable());
//
//        //http basic 인증 방식 disable
//        http
//                .httpBasic((auth) -> auth.disable());
////
//        //경로별 인가 작업
//        http
//                .authorizeHttpRequests((auth) -> auth
//
//                        .requestMatchers("/api/user", "/api/user/join","api/animals","api/animals/*").permitAll()
//                        .requestMatchers("/api/user/admin").hasRole("ADMIN")
////                        .anyRequest().authenticated());
//
//                        .anyRequest().permitAll());
//
//        http
//                .addFilterBefore(new JWTFilter(jwtUtil), LoginFilter.class);
//
//        http
//                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration),jwtUtil), UsernamePasswordAuthenticationFilter.class);
//
//
//        //세션 설정
//        http
//                .sessionManagement((session) -> session
//                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
//
//
//        return http.build();
//    }
//
//}
package com.e202.dogcatdang.user.config;

//import com.e202.dogcatdang.oauth2.handler.CustomOAuth2FailureHandler;
import com.e202.dogcatdang.oauth2.handler.OAuth2AuthenticationSuccessHandler;
import com.e202.dogcatdang.oauth2.service.CustomOAuth2UserService;
import com.e202.dogcatdang.refresh.service.RefreshTokenService;
import com.e202.dogcatdang.user.jwt.JWTFilter;
import com.e202.dogcatdang.user.jwt.JWTUtil;
import com.e202.dogcatdang.user.jwt.LoginFilter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
//@RequiredArgsConstructor
public class SecurityConfig {
    @Value("${spring.cors.allowed-origins}")
    private String allowedOrigins;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final JWTUtil jwtUtil;
    private final AuthenticationFailureHandler customAuthenticationFailureHandler;

    private final OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    private final RefreshTokenService refreshTokenService;

    public SecurityConfig(CustomOAuth2UserService customOAuth2UserService, AuthenticationConfiguration authenticationConfiguration, JWTUtil jwtUtil, AuthenticationFailureHandler customAuthenticationFailureHandler, OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler, RefreshTokenService refreshTokenService) {

        this.customOAuth2UserService = customOAuth2UserService;
        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
        this.customAuthenticationFailureHandler = customAuthenticationFailureHandler;
        this.oAuth2AuthenticationSuccessHandler = oAuth2AuthenticationSuccessHandler;
        this.refreshTokenService = refreshTokenService;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // CORS 설정
        http.cors(cors -> cors
                .configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration configuration = new CorsConfiguration();

                        //프론트엔드 서버 허용
                        configuration.setAllowedOrigins(Collections.singletonList(allowedOrigins));


                        configuration.setAllowedMethods(Collections.singletonList("*"));
                        configuration.setAllowCredentials(true);
                        configuration.setAllowedHeaders(Collections.singletonList("*"));
                        configuration.setMaxAge(3600L);
                        //jwt Header Key값
                        List<String> exposedHeaders = Arrays.asList("Authorization", "RefreshToken");
                        configuration.setExposedHeaders(exposedHeaders);

                        return configuration;
                    }
                }));


        // CSRF, Form 로그인, HTTP 기본 인증 비활성화
        http.csrf(csrf -> csrf.disable())
                .formLogin(formLogin -> formLogin.disable())
                .httpBasic(httpBasic -> httpBasic.disable());

        // OAuth2 로그인 설정
        http.oauth2Login(oauth2 -> oauth2
                //.loginPage("/oauth2/authorization/")
                .loginPage("/oauth2/oLogin")
                //.redirectionEndpoint(endpoint -> endpoint.baseUri("/oauth2/callback/*"))
                .userInfoEndpoint(userInfoEndpointConfig ->
                        userInfoEndpointConfig.userService(customOAuth2UserService)
                )
                .failureHandler(customAuthenticationFailureHandler)
                .successHandler(oAuth2AuthenticationSuccessHandler)
        );

        // JWT 필터 설정
        http.addFilterBefore(new JWTFilter(jwtUtil), LoginFilter.class)
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil,refreshTokenService), UsernamePasswordAuthenticationFilter.class);

        // 세션 정책 설정
        http.sessionManagement(sessionManagement ->
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );

        // 경로별 인가 설정
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/user", "/api/user/join", "api/animals", "api/animals/*").permitAll()
                .requestMatchers("/api/users/login").permitAll()
                .requestMatchers("/api/user/admin").hasRole("ADMIN")
                .anyRequest().permitAll()
        );

        return http.build();
    }
}