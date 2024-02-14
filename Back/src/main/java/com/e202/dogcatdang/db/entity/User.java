package com.e202.dogcatdang.db.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //기본키

    @Column(name = "username" , nullable = false ,unique = true)
    private String username;



    @Column(name = "password", nullable = true )
    private String password;

    @Column(name = "role" )
    private String role;

    @Column(name = "email" , nullable = false ,  unique = true)
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

    // Animal과 연결
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Animal> animalList = new ArrayList<>();

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<AnimalLike> animalLikes = new ArrayList<>(); // User와 AnimalLike 사이의 1:N 관계


    public User(Long userId) {
    }
}
