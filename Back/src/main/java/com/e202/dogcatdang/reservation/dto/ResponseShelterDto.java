package com.e202.dogcatdang.reservation.dto;

import java.time.LocalDateTime;

import com.e202.dogcatdang.db.entity.Reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 예약 정보 상세 조회 목록
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseShelterDto {
	private String name;
	private LocalDateTime reservationTime;
	private String phone;
	private int visitor;

	// Entity -> DTO
	public ResponseShelterDto(Reservation reservation) {
		this.name = reservation.getName();
		this.reservationTime = reservation.getReservationTime();
		this.phone = reservation.getPhone();
		this.visitor = reservation.getVisitor();
	}
}
