package com.e202.dogcatdang.lostanimal.dto;

import java.time.LocalDate;

import com.e202.dogcatdang.db.entity.LostAnimal;
import com.e202.dogcatdang.enums.AnimalType;
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
public class ResponseLostAnimalDto {

	private AnimalType animalType;
	private String breed;
	private String name;
	private int age;
	private Gender gender;
	private int weight;
	private String lostLocation;
	private LocalDate lostDate;
	private String feature;
	private LostAnimal.State state;
	private String imgUrl;
	private Long userId;
	private String userNickname;

	// Entity -> DTO
	public ResponseLostAnimalDto(LostAnimal lostAnimal) {
		this.animalType = lostAnimal.getAnimalType();
		this.breed = lostAnimal.getBreed();
		this.name = lostAnimal.getName();
		this.age = lostAnimal.getAge();
		this.gender = lostAnimal.getGender();
		this.weight = lostAnimal.getWeight();
		this.lostLocation = lostAnimal.getLostLocation();
		this.lostDate = lostAnimal.getLostDate();
		this.feature = lostAnimal.getFeature();
		this.state = lostAnimal.getState();
		this.imgUrl = lostAnimal.getImgUrl();
		this.userId = lostAnimal.getUser().getId();
		this.userNickname = lostAnimal.getUser().getNickname();
	}
}
