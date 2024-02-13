package com.e202.dogcatdang.animal.dto;

import java.time.LocalDate;

import com.e202.dogcatdang.db.entity.Animal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseAnimalListDto {

	private Long animalId;
	private String animalType;
	private String breed;
	private Integer age;
	private String gender;
	private String isNeuter;
	private Animal.State state;
	private LocalDate rescueDate;
	private String rescueLocation;

	private String imgUrl;
	private Long userId;
	private String userNickname;

	private int adoptionApplicantCount;
	private boolean isLike; // 좋아요 여부 확인

	// Entity -> DTO
	@Builder
    public ResponseAnimalListDto(Animal animal, int adoptionApplicantCount, boolean isLike) {
		this.animalId = animal.getAnimalId();
		this.animalType = animal.getAnimalType();
		this.breed = animal.getBreed();
		this.age = animal.getAge();
		this.gender = animal.getGender();
		this.isNeuter = animal.getIsNeuter();
		this.state = animal.getState();
		this.rescueDate = animal.getRescueDate();
		this.rescueLocation = animal.getRescueLocation();
		// Animal entity와 User entity의 관계에서 userId 가져오기
		this.userId = animal.getUser().getId();
		this.userNickname = animal.getUser().getNickname();

		this.imgUrl = animal.getImgUrl();
		this.adoptionApplicantCount = adoptionApplicantCount;
		this.isLike = isLike;
	}

}
