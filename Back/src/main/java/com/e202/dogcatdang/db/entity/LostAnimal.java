package com.e202.dogcatdang.db.entity;

import java.time.LocalDate;


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
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "lost_animal")
public class LostAnimal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "lost_animal_id")
	private Long lostAnimalId;

	@Enumerated(EnumType.STRING)
	@Column(name = "animal_type", nullable = false)
	private AnimalType animalType;

	@Column(name = "name")
	private String name;

	@Column(name = "breed", length = 200, nullable = false)
	private String breed;

	@Column(name = "age", nullable = false)
	private Integer age;

	@Column(name = "weight")
	private Integer weight;

	@Column(name = "lost_date", nullable = false)
	private LocalDate lostDate;

	@Column(name = "lost_location", length = 200, nullable = false)
	private String lostLocation;


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
	// user : animal -> user pk값인 id 들어감
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	public void setLostLocation(String lostLocation) {
		this.lostLocation = lostLocation;
	}

	public void update(AnimalType animalType, String name, String breed, Integer age, Integer weight,
		LocalDate lostDate, String lostLocation, Gender gender, String feature, State state, String imgName,
		String imgUrl) {
		this.animalType = animalType;
		this.name = name;
		this.breed = breed;
		this.age = age;
		this.weight = weight;
		this.lostDate = lostDate;
		this.lostLocation = lostLocation;
		this.gender = gender;
		this.feature = feature;
		this.state = state;
		this.imgName = imgName;
		this.imgUrl = imgUrl;
	}

	// enum 정의는 클래스의 맨 아래에 위치
	public enum State {
		실종, 완료
	}

	// Builder 클래스 추가
	// DTO -> Entity 만드는데 사용
	@Builder
	public LostAnimal(Long lostAnimalId, String name, AnimalType animalType, String breed, Integer age, Integer weight,
		LocalDate lostDate, String lostLocation, Gender gender, String feature,
		LostAnimal.State state, String imgName, String imgUrl, User user) {
		this.lostAnimalId = lostAnimalId;
		this.name = name;
		this.animalType = animalType;
		this.breed = breed;
		this.age = age;
		this.weight = weight;
		this.lostDate = lostDate;
		this.lostLocation = lostLocation;
		this.gender = gender;
		this.feature = feature;
		this.state = state;
		this.imgName = imgName;
		this.imgUrl = imgUrl;
		this.user = user;
	}

}
