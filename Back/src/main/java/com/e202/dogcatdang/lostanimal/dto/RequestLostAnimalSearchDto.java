package com.e202.dogcatdang.lostanimal.dto;

import com.e202.dogcatdang.enums.AnimalType;

import lombok.Getter;

@Getter
public class RequestLostAnimalSearchDto {
	private AnimalType animalType;
	private String breed;
	private String lostLocation;
	private String gender;
}
