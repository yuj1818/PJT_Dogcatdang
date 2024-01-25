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
	private Gender gender;  // Gender는 열거형(enum) 클래스입니다.
	private boolean isNeuter;
	private int weight;
	private String rescueLocation;
	private LocalDateTime rescueDate;  // LocalDateTime은 날짜와 시간을 표현하는 클래스입니다.
	private String feature;
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
		this.userId = animal.getUserId();
	}
}
