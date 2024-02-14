package com.e202.dogcatdang.mypage.dto;

import com.e202.dogcatdang.db.entity.Animal;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class MypageAnimalDto {
    private Long animalId;
    private String animalType;
    private String breed;
    private Integer age;
    private String gender;
    private String isNeuter;
    private String state;
    private LocalDate rescueDate;
    private String rescueLocation;
    private String imgUrl;




}
