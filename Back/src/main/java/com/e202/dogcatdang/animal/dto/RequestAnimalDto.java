package com.e202.dogcatdang.animal.dto;

import java.time.LocalDate;
import java.util.Arrays;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.enums.AnimalType;
import com.e202.dogcatdang.enums.CatBreed;
import com.e202.dogcatdang.enums.DogBreed;
import com.e202.dogcatdang.enums.Gender;

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
public class RequestAnimalDto {

	private AnimalType animalType;
	private String breed;
	private Integer age;
	private Integer weight;
	private String color;
	private LocalDate rescueDate;
	private String rescueLocation;
	private Boolean isNeuter;
	private Gender gender;
	private String feature;
	private Animal.State state;
	private String imgName;
	private String imgUrl;
	private Integer userId;

	// 입력한 animalType에 맞는 breed인지 확인하는 기능
	public boolean isValid() {
		if (animalType == AnimalType.강아지) {
			return Arrays.stream(DogBreed.values())
				.anyMatch(b -> b.name().equals(breed));
		} else if (animalType == AnimalType.고양이) {
			return Arrays.stream(CatBreed.values())
				.anyMatch(b -> b.name().equals(breed));
		} else {
			return false;
		}
	}

	// DTO -> Entity
	public Animal toEntity() {
		return Animal.builder()
			.animalType(animalType)
			.breed(breed)
			.age(age)
			.weight(weight)
			.color(color)
			.rescueDate(rescueDate)
			.rescueLocation(rescueLocation)
			.isNeuter(isNeuter)
			.gender(gender)
			.feature(feature)
			.state(state)
			.imgName(imgName)
			.imgUrl(imgUrl)
			.userId(userId)
			.build();
	}
}
