package com.e202.dogcatdang.animal.dto;

import java.time.LocalDateTime;

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
	private LocalDateTime rescueDate;
	private String feature;
	private String imgName;
	private int userId;

	// Entity -> DTO
	public ResponseAnimalDto(Animal animal) {
		this.breed = animal.getBreed();
		this.age = animal.getAge();
		this.gender = animal.getGender();
		this.isNeuter = animal.getIsNeuter();
		this.weight = animal.getWeight();
		this.rescueLocation = animal.getRescueLocation();
		this.rescueDate = animal.getRescueDate().atStartOfDay();
		this.feature = animal.getFeature();
		this.imgName = animal.getImgName();
	}
}
