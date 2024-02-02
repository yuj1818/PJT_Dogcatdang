package com.e202.dogcatdang.lostanimal.dto;

import com.e202.dogcatdang.db.entity.LostAnimal;
import com.e202.dogcatdang.enums.AnimalType;
import com.e202.dogcatdang.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseLostAnimalListDto {

	private Long LostAnimalId;
	private AnimalType animalType;
	private String breed;
	private String name;
	private int age;
	private Gender gender;

	private LostAnimal.State state;
	private String lostLocation;

	private String imgName;
	private Long userId;

	// Entity -> DTO
	@Builder
	public ResponseLostAnimalListDto(LostAnimal animal) {
		this.LostAnimalId = animal.getLostAnimalId();
		this.animalType = animal.getAnimalType();
		this.breed = animal.getBreed();
		this.name = animal.getName();
		this.age = animal.getAge();
		this.gender = animal.getGender();
		this.state = animal.getState();
		this.lostLocation = animal.getLostLocation();
		// Animal entity와 User entity의 관계에서 userId 가져오기
		this.userId = animal.getUser().getId();

		this.imgName = animal.getImgName();
	}
}
