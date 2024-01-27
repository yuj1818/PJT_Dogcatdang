package com.e202.dogcatdang.db.entity;

import java.time.LocalDate;

import com.e202.dogcatdang.enums.AnimalType;
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
	@Column(length = 200, nullable = false)
	private String breed;

	@Column(nullable = false)
	private Integer age;

	@Column(nullable = true)
	private Integer weight;

	@Column(length = 200, nullable = false)
	private String color;

	@Column(name = "rescue_date", nullable = false)
	private LocalDate rescueDate;

	@Column(name = "rescue_location", length = 200, nullable = false)
	private String rescueLocation;

	@Column(name = "is_neuter")
	private Boolean isNeuter;

	// gender 필드는 int로 선언되어 있지만, Enum을 사용하는 것이 더 좋을 수 있습니다.
	// GenderType이라는 Enum을 만들어서 관리할 수 있습니다.
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Gender gender;

	@Column
	private String feature;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private State state;

	@Column(name = "img_name", length = 200, nullable = false)
	private String imgName;

	@Column(name = "img_url", nullable = false)
	private String imgUrl;

	// user_id 필드는 User 엔티티와 연결되는 외래키가 됩니다. ManyToOne 관계를 설정할 수 있습니다.
	// @ManyToOne(fetch = FetchType.LAZY)
	// @JoinColumn(name = "user_id", referencedColumnName = "user_id")
	// private User user;

	@Column(name = "user_id", nullable = false)
	private Integer userId;

	// enum 정의는 클래스의 맨 아래에 위치
	public enum State {
		보호중, 입양완료, 안락사, 자연사
	}

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
