package com.e202.dogcatdang.db.entity;

import java.time.LocalDate;

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

	@Column(name = "animal_type", nullable = false)
	private String  animalType;

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

	@Column(name = "gender", nullable = false)
	private String gender;

	@Column(name = "feature")
	private String feature;

	@Enumerated(EnumType.STRING)
	@Column(name = "state", nullable = false)
	private State state;

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

	public void update(String animalType, String name, String breed, Integer age, Integer weight,
		LocalDate lostDate, String lostLocation, String gender, String feature, State state,
		String imgUrl) {
		if (animalType != null) {
			this.animalType = animalType;
		}

		if (name != null) {
			this.name = name;
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

		if (lostDate != null) {
			this.lostDate = lostDate;
		}

		if (lostLocation != null) {
			this.lostLocation = lostLocation;
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

		if (imgUrl != null) {
			this.imgUrl = imgUrl;
		}


	}

	// enum 정의는 클래스의 맨 아래에 위치
	public enum State {
		실종, 완료
	}

	// Builder 클래스 추가
	// DTO -> Entity 만드는데 사용
	@Builder
	public LostAnimal(Long lostAnimalId, String name, String animalType, String breed, Integer age, Integer weight,
		LocalDate lostDate, String lostLocation, String gender, String feature,
		LostAnimal.State state, String imgUrl, User user) {
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
		this.imgUrl = imgUrl;
		this.user = user;
	}

}
