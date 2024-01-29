package com.e202.dogcatdang.db.entity;

import java.time.LocalDate;
import java.util.Arrays;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.ColumnTransformer;

import com.e202.dogcatdang.enums.AnimalType;
import com.e202.dogcatdang.enums.CatBreed;
import com.e202.dogcatdang.enums.DogBreed;
import com.e202.dogcatdang.enums.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
// import jakarta.validation.constraints.NotNull;
// 	ㄴ build.gradle에 의존성 추가 필요: implementation 'org.springframework.boot:spring-boot-starter-validation'
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "animal")
public class Animal {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "animal_id")
	private Long animalId;

	@Enumerated(EnumType.STRING)
	@Column(name = "animal_type", nullable = false)
	private AnimalType animalType; // AnimalType은 Enum 클래스로 정의되어야 합니다.

	// 품종 데이터 셋 둘 거면 추후 수정 필요
	@Column(name = "breed", length = 200, nullable = false)
	private String breed;

	@Column(name = "age", nullable = false)
	private Integer age;

	@Column(name = "weight")
	private Integer weight;
	

	@Column(name = "rescue_date", nullable = false)
	private LocalDate rescueDate;

	@Column(name = "rescue_location", length = 200, nullable = false)
	private String rescueLocation;

	@ColumnDefault("NULL")
	@Column(name = "is_neuter" , nullable = true, columnDefinition = "TINYINT(1)")
	private Boolean isNeuter;

	@Enumerated(EnumType.STRING)
	@Column(name = "gender", nullable = false)
	private Gender gender;

	@Column(name = "feature")
	private String feature;

	@Enumerated(EnumType.STRING)
	@Column(name = "state", nullable = false)
	private State state;

	@Column(name = "img_name", length = 200, nullable = false)
	private String imgName;

	@Column(name = "img_url", nullable = false)
	private String imgUrl;

	// @ManyToOne(fetch = FetchType.LAZY)
	// @JoinColumn(name = "user_id", referencedColumnName = "user_id")
	// private User user;

	@Column(name = "user_id", nullable = false)
	private Integer userId;

	// enum 정의는 클래스의 맨 아래에 위치
	public enum State {
		보호중, 입양완료, 안락사, 자연사
	}


	// public Animal(String animalType, String breed) {
	// 	if (animalType.equals("강아지")) {
	// 		if (!Arrays.asList(DogBreed.values()).contains(breed)) {
	// 			throw new IllegalArgumentException("올바른 강아지 품종을 입력해주세요.");
	// 		}
	// 	} else if (animalType.equals("고양이")) {
	// 		if (!Arrays.asList(CatBreed.values()).contains(breed)) {
	// 			throw new IllegalArgumentException("올바른 고양이 품종을 입력해주세요.");
	// 		}
	// 	}
	//
	// 	this.animalType = AnimalType.valueOf(animalType);
	// 	this.breed = breed;
	// }

	// Builder 클래스 추가
	@Builder
	public Animal(Long animalId, AnimalType animalType, String breed, Integer age, Integer weight, String color,
		LocalDate rescueDate, String rescueLocation, Boolean isNeuter, Gender gender, String feature,
		State state, String imgName, String imgUrl, Integer userId) {
		this.animalId = animalId;
		this.animalType = animalType;
		this.breed = breed;
		this.age = age;
		this.weight = weight;
		this.color = color;
		this.rescueDate = rescueDate;
		this.rescueLocation = rescueLocation;
		this.isNeuter = isNeuter;
		this.gender = gender;
		this.feature = feature;
		this.state = state;
		this.imgName = imgName;
		this.imgUrl = imgUrl;
		this.userId = userId;
	}

	public void update(AnimalType animalType, String breed, Integer age, Integer weight, String color,
		LocalDate rescueDate, String rescueLocation, Boolean isNeuter, Gender gender, String feature,
		State state, String imgName, String imgUrl) {
		this.animalType = animalType;
		this.breed = breed;
		this.age = age;
		this.weight = weight;
		this.color = color;
		this.rescueDate = rescueDate;
		this.rescueLocation = rescueLocation;
		this.isNeuter = isNeuter;
		this.gender = gender;
		this.feature = feature;
		this.state = state;
		this.imgName = imgName;
		this.imgUrl = imgUrl;
	}

}
