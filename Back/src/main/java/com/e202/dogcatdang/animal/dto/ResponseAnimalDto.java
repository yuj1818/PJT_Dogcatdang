package com.e202.dogcatdang.animal.dto;

import java.time.LocalDate;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.enums.AnimalType;
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

	private String animalType;
	private String breed;
	private Integer age;
	private String gender;
	private String isNeuter;
	private Integer weight;
	private String rescueLocation;
	private LocalDate rescueDate;
	private String feature;
	private Animal.State state;
	private String imgUrl;
	private Long userId;
	private String userNickname;
	private int adoptionApplicantCount;


	// Entity -> DTO
	public ResponseAnimalDto(Animal animal, int adoptionApplicantCount) {
		this.animalType = animal.getAnimalType();
		this.breed = animal.getBreed();
		this.age = animal.getAge()!=null?animal.getAge():0;
		this.gender = animal.getGender();
		this.isNeuter = animal.getIsNeuter();
		this.weight = animal.getWeight()!=null?animal.getWeight():0;

		this.rescueLocation = animal.getRescueLocation();
		this.rescueDate = animal.getRescueDate();
		this.feature = animal.getFeature();
		this.state = animal.getState();
		this.imgUrl = animal.getImgUrl();
		this.userId = animal.getUser().getId();
		this.userNickname = animal.getUser().getNickname();
		this.adoptionApplicantCount = adoptionApplicantCount;
	}
}
