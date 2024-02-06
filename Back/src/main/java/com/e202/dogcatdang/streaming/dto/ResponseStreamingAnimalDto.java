package com.e202.dogcatdang.streaming.dto;

import com.e202.dogcatdang.db.entity.Animal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseStreamingAnimalDto {
	private Long animalId;
	private String code;
	private String breed;
	private Integer age;
	private String imgUrl;

	// Entity -> DTO
	@Builder
	public ResponseStreamingAnimalDto(Animal animal) {
		this.animalId = animal.getAnimalId();
		this.code = animal.getCode();
		this.breed = animal.getBreed();
		this.age = animal.getAge();
		this.imgUrl = animal.getImgUrl();

	}
}
