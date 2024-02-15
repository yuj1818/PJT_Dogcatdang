package com.e202.dogcatdang.animal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseShelterAnimalCountDto {
	// 기관이 등록한 전체 동물 수
	private Integer totalAnimals;
	// 입양 완료된 동물 수
	private Integer adoptedAnimals;
	// 현재 보호 중인 동물의 수
	private Integer protectedAnimals;
}
