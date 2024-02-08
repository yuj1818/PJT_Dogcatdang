package com.e202.dogcatdang.reservation.dto;

import java.time.LocalDateTime;

import com.e202.dogcatdang.db.entity.Reservation;
import com.e202.dogcatdang.enums.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 예약 정보 전체 조회 목록
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseShelterListDto {
	private Long reservationId;
	private String name;
	private LocalDateTime reservationTime;
	private String phone;
	private int visitor;

	// 동물 정보
	private String code;
	private String imgUrl;
	private String breed;

	private Reservation.State state;

	// Entity -> DTO
	public ResponseShelterListDto(Reservation reservation) {
		this.reservationId = reservation.getReservationId();
		this.name = reservation.getName();
		this.reservationTime = reservation.getReservationTime();
		this.phone = reservation.getPhone();
		this.visitor = reservation.getVisitor();
		this.code = reservation.getAnimal().getCode();
		this.imgUrl = reservation.getAnimal().getImgUrl();
		this.breed = reservation.getAnimal().getBreed();
		this.state = reservation.getState();
	}
}
