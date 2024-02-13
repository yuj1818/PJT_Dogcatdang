package com.e202.dogcatdang.streaming.dto;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.StreamingAnimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseAnimalDto {
	private Long animalId;
	private String code;
	private String breed;
	private Integer age;
	private String imgUrl;

	// Entity -> DTO
	@Builder
	public ResponseAnimalDto(StreamingAnimal streamingAnimal) {
		this.animalId = streamingAnimal.getAnimal().getAnimalId();
		this.code = streamingAnimal.getAnimal().getCode();
		this.breed = streamingAnimal.getAnimal().getBreed();
		this.age = streamingAnimal.getAnimal().getAge();
		this.imgUrl = streamingAnimal.getAnimal().getImgUrl();
	}
}
