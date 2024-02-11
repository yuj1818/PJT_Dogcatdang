package com.e202.dogcatdang.lostanimal.dto;

import lombok.Getter;

@Getter
public class RequestLostAnimalSearchDto {
	private String animalType;
	private String breed;
	private String lostLocation;
	private String gender;
}
