package com.e202.dogcatdang.lostanimal.dto;

import java.time.LocalDate;
import java.util.Arrays;

import com.e202.dogcatdang.db.entity.LostAnimal;
import com.e202.dogcatdang.db.entity.User;

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
public class RequestLostAnimalDto {

	private String animalType;
	private String name;
	private String breed;
	private Integer age;
	private Integer weight;
	private LocalDate lostDate;
	private String lostLocation;
	private String gender;
	private String feature;
	private LostAnimal.State state;
	private String imgUrl;
	private Long userId;

	// lostlocation을 위해 입력받는 위치 정보들
	private String selectedCity;
	private String selectedDistrict;
	private String detailInfo;


	// DTO -> Entity
	public LostAnimal toEntity(User user) {
		return LostAnimal.builder()
			.animalType(animalType)
			.name(name)
			.breed(breed)
			.age(age)
			.weight(weight)
			.lostDate(lostDate)
			.lostLocation(selectedCity + " " + selectedDistrict + " " + (detailInfo != null ? detailInfo : ""))
			.gender(gender)
			.feature(feature)
			.state(state)
			.imgUrl(imgUrl)
			.user(user)       // user의 식별자(id)가 lost-animal entity user_id에 들어간다.
			.build();
	}
}
