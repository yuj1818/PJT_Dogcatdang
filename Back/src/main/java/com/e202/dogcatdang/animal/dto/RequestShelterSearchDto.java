package com.e202.dogcatdang.animal.dto;

import com.e202.dogcatdang.db.entity.Animal;

import lombok.Getter;

@Getter
public class RequestShelterSearchDto {
	private String code;
	private String breed;
	private Animal.State state;
}
