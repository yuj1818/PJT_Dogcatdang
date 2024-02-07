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
public class ResponseShelterApprovedDto {
	private Long reservationId;
	private String name;
	private LocalDateTime reservationTime;
	private String phone;
	private int visitor;

	// 동물 정보
	private String code;
	private String imgUrl;

	// Entity -> DTO
	public ResponseShelterApprovedDto(Reservation reservation) {
		this.reservationId = reservation.getReservationId();
		this.name = reservation.getName();
		this.reservationTime = reservation.getReservationTime();
		this.phone = reservation.getPhone();
		this.visitor = reservation.getVisitor();
		this.code = reservation.getAnimal().getCode();
		this.imgUrl = reservation.getAnimal().getImgUrl();
	}

}
