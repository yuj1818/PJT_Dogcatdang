package com.e202.dogcatdang.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfileDTO {
    private Long id;
    private String username;
    private String email;
    private String nickname;
    private String address;
    private String phone;
    private String bio;
    private String imgName;
    private String imgUrl;
    private String role;


}
