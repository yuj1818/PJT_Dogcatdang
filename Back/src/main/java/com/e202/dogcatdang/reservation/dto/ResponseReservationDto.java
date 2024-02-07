package com.e202.dogcatdang.reservation.dto;

import java.time.LocalDateTime;

import com.e202.dogcatdang.db.entity.Reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseReservationDto {
	private Long reservationId; // 방문 예약 번호
	private String shelterName; // 방문 센터 이름
	private LocalDateTime reservationTime;
	private Reservation.State state;

	// 동물 정보 : 이미지, 품종, 나이
	private String imgUrl;
	private String breed;
	private Integer age;

	// Entity -> DTO
	public ResponseReservationDto(Reservation reservation) {
		this.reservationId = reservation.getReservationId();
		this.shelterName = reservation.getAnimal().getUser().getNickname();
		this.reservationTime = reservation.getReservationTime();
		this.state = reservation.getState();
		this.imgUrl = reservation.getAnimal().getImgUrl();
		this.breed = reservation.getAnimal().getBreed();
		this.age = reservation.getAnimal().getAge();
	}
}
