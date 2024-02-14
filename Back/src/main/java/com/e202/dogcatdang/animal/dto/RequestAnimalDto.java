package com.e202.dogcatdang.animal.dto;

import java.time.LocalDate;
import java.util.Arrays;

import com.e202.dogcatdang.db.entity.Animal;
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
public class RequestAnimalDto {

	private String animalType;
	private String breed;
	private Integer age;
	private Integer weight;
	private LocalDate rescueDate;
	private String rescueLocation;
	private String isNeuter;
	private String gender;
	private String feature;
	private Animal.State state;
	private String imgUrl;
	private String code;
	private Long userId;


	// rescuelocation을 위해 입력받는 위치 정보들
	private String selectedCity;
	private String selectedDistrict;
	private String detailInfo;

	// DTO -> Entity (DB 저장용)
	public Animal toEntity(User user) {
		// 발견 날짜가 현재 날짜와 같거나 과거인지 확인
		if (rescueDate != null && !rescueDate.isBefore(LocalDate.now().plusDays(1))) {
			throw new IllegalArgumentException("발견 날짜는 현재 날짜와 같거나 과거여야 합니다.");
		}

		return Animal.builder()
			.animalType(animalType)
			.breed(breed)
			.age(age)
			.weight(weight)
			.rescueDate(rescueDate)
			.rescueLocation(selectedCity + " " + selectedDistrict + " " + (detailInfo != null ? detailInfo : ""))
			.isNeuter(isNeuter)
			.gender(gender)
			.feature(feature)
			.state(state)
			.imgUrl(imgUrl)
			.code(code)
			.user(user)       // user의 식별자(id)가 animal entity user_id에 들어간다.
			.build();
	}
}
