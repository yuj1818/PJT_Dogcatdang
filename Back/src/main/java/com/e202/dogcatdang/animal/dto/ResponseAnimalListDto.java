package com.e202.dogcatdang.animal.dto;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.enums.AnimalType;
import com.e202.dogcatdang.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseAnimalListDto {

	private Long animalId;
	private AnimalType animalType;
	private String breed;
	private int age;
	private Gender gender;
	private Boolean isNeuter;
	private Animal.State state;
	private String rescueLocation;

	private String imgName;
	private Long userId;

	// Entity -> DTO
	@Builder
    public ResponseAnimalListDto(Animal animal) {
		this.animalId = animal.getAnimalId();
		this.animalType = animal.getAnimalType();
		this.breed = animal.getBreed();
		this.age = animal.getAge();
		this.gender = animal.getGender();
		this.isNeuter = animal.getIsNeuter();
		this.state = animal.getState();
		this.rescueLocation = animal.getRescueLocation();
		// Animal entity와 User entity의 관계에서 userId 가져오기
		this.userId = animal.getUser().getId();

		this.imgName = animal.getImgName();
	}

}
