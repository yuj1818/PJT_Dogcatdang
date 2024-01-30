package com.e202.dogcatdang.db.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //기본키

    @Column(name = "username" , nullable = false, unique = true)
    private String username;

    @Column(name = "password" , nullable = false)
    private String password;

    @Column(name = "role" , nullable = false)
    private String role;

    @Column(name = "email" , nullable = false, unique = true)
    private String email;

    @Column(name = "nickname" , nullable = false, unique = true)
    private String nickname;

    @Column(name = "address" , nullable = false)
    private String address;

    @Column(name = "phone" , nullable = false, unique = true)
    private String phone;

    @Column(name = "bio" )
    private String bio;

    @Getter
    @Setter
    @Column(name = "img_name" )
    private String img_name;

    @Getter
    @Setter
    @Column(name = "img_url")
    private String img_url;


}
