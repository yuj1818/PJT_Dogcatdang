package com.e202.dogcatdang.db.entity;

import java.time.LocalDate;

import org.hibernate.annotations.ColumnDefault;

import com.e202.dogcatdang.enums.AnimalType;
import com.e202.dogcatdang.enums.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	private AnimalType animalType;

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

	// 단방향 1:N 관계
	// user : animal
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	// 외부에서 rescueLocation 값을 받아와 저장하기 위해 setter 설정
	// Lombok으로 자동 생성 시, JPA Dirty Checking이 잘 동작 안 할 수 있기에
	// @Setter 대신 set method 만들어서 사용
	public void setRescueLocation(String rescueLocation) {
		this.rescueLocation = rescueLocation;
	}

	// enum 정의는 클래스의 맨 아래에 위치
	public enum State {
		보호중, 입양완료, 안락사, 자연사
	}


	// Builder 클래스 추가
	// DTO -> Entity 만드는데 사용
	@Builder
	public Animal(Long animalId, AnimalType animalType, String breed, Integer age, Integer weight,
		LocalDate rescueDate, String rescueLocation, Boolean isNeuter, Gender gender, String feature,
		State state, String imgName, String imgUrl, User user) {
		this.animalId = animalId;
		this.animalType = animalType;
		this.breed = breed;
		this.age = age;
		this.weight = weight;
		this.rescueDate = rescueDate;
		this.rescueLocation = rescueLocation;
		this.isNeuter = isNeuter;
		this.gender = gender;
		this.feature = feature;
		this.state = state;
		this.imgName = imgName;
		this.imgUrl = imgUrl;
		this.user = user;
	}

	public void update(AnimalType animalType, String breed, Integer age, Integer weight,
		LocalDate rescueDate, String rescueLocation, Boolean isNeuter, Gender gender, String feature,
		State state, String imgName, String imgUrl) {
		if (animalType != null) {
			this.animalType = animalType;
		}

		if (breed != null) {
			this.breed = breed;
		}

		if (age != null) {
			this.age = age;
		}

		if (weight != null) {
			this.weight = weight;
		}

		if (rescueDate != null) {
			this.rescueDate = rescueDate;
		}

		if (rescueLocation != null) {
			this.rescueLocation = rescueLocation;
		}

		if (isNeuter != null) {
			this.isNeuter = isNeuter;
		}

		if (gender != null) {
			this.gender = gender;
		}

		if (feature != null) {
			this.feature = feature;
		}

		if (state != null) {
			this.state = state;
		}

		if (imgName != null) {
			this.imgName = imgName;
		}

		if (imgUrl != null) {
			this.imgUrl = imgUrl;
		}

	}

}
