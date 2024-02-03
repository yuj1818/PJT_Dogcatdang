package com.e202.dogcatdang.animal.dto;

import java.time.LocalDate;

import com.e202.dogcatdang.db.entity.Animal;
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
public class ResponseAnimalDto {
	private String breed;
	private int age;
	private Gender gender;
	private Boolean isNeuter;
	private int weight;
	private String rescueLocation;
	private LocalDate rescueDate;
	private String feature;
	private String imgName;
	private Long userId;
	private String userNickname;

	// Entity -> DTO
	public ResponseAnimalDto(Animal animal) {
		this.breed = animal.getBreed();
		this.age = animal.getAge();
		this.gender = animal.getGender();
		this.isNeuter = animal.getIsNeuter();
		this.weight = animal.getWeight();
		this.rescueLocation = animal.getRescueLocation();
		this.rescueDate = animal.getRescueDate();
		this.feature = animal.getFeature();
		this.imgName = animal.getImgName();
		this.userId = animal.getUser().getId();
		this.userNickname = animal.getUser().getNickname();
	}
}
