package com.e202.dogcatdang.animal.dto;

import lombok.Getter;

@Getter
public class RequestAnimalSearchDto {
	private String  animalType;
	private String breed;
	// rescuelocation을 위해 입력받는 위치 정보들
	private String selectedCity;
	private String selectedDistrict;
	private String gender;
	private String userNickname;
}
