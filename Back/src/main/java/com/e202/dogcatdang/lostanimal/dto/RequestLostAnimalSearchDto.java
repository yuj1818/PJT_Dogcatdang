package com.e202.dogcatdang.lostanimal.dto;

import lombok.Getter;

@Getter
public class RequestLostAnimalSearchDto {
	private String animalType;
	private String breed;
	// lostlocation을 위해 입력받는 위치 정보들
	private String selectedCity;
	private String selectedDistrict;
	private String gender;
}
