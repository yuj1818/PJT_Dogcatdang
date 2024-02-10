package com.e202.dogcatdang.animal.dto;

import com.e202.dogcatdang.enums.AnimalType;

import lombok.Getter;

@Getter
public class RequestAnimalSearchDto {
	private AnimalType animalType;
	private String breed;
	private String rescueLocation;
	private String gender;
	private String userNickname;
}
