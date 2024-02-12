package com.e202.dogcatdang.animal.dto;

import com.e202.dogcatdang.db.entity.Animal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ResponseShelterAnimalDto {
	private Long animalId;
	private String code;
	private String breed;
	private Integer age;
	private String gender;
	private String isNeuter;
	private Animal.State state;

	// Entity -> DTO
	public ResponseShelterAnimalDto(Animal animal) {
		this.animalId = animal.getAnimalId();
		this.code = animal.getCode();
		this.breed = animal.getBreed();
		this.age = animal.getAge();
		this.gender = animal.getGender();
		this.isNeuter = animal.getIsNeuter();
		this.state = animal.getState();
	}
}
