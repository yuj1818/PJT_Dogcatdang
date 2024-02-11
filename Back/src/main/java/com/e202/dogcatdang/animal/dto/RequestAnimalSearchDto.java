package com.e202.dogcatdang.animal.dto;

import lombok.Getter;

@Getter
public class RequestAnimalSearchDto {
	private String  animalType;
	private String breed;
	private String rescueLocation;
	private String gender;
	private String userNickname;
}
