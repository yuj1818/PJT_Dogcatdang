package com.e202.dogcatdang.lostanimal.dto;

import java.time.LocalDateTime;

import com.e202.dogcatdang.db.entity.LostAnimal;
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
	private String breed;
	private String name;
	private int age;
	private Gender gender;
	private int weight;
	private String lostLocation;
	private LocalDateTime lostDate;
	private String feature;
	private String imgName;
	private Long userId;

	// Entity -> DTO
	public ResponseLostAnimalDto(LostAnimal lostAnimal) {
		this.breed = lostAnimal.getBreed();
		this.name = lostAnimal.getName();
		this.age = lostAnimal.getAge();
		this.gender = lostAnimal.getGender();
		this.weight = lostAnimal.getWeight();
		this.lostLocation = lostAnimal.getLostLocation();
		this.lostDate = lostAnimal.getLostDate().atStartOfDay();
		this.feature = lostAnimal.getFeature();
		this.imgName = lostAnimal.getImgName();
		this.userId = lostAnimal.getUser().getId();
	}
}
