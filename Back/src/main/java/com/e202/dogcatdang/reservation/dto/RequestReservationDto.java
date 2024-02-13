package com.e202.dogcatdang.reservation.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.Reservation;
import com.e202.dogcatdang.db.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestReservationDto {
	private LocalDateTime reservationTime;
	private String name;
	private String phone;
	private int visitor;
	private Reservation.State state;

	// DTO -> Entity (DB 저장용)
	public Reservation toEntity(User user, Animal animal) {
		// 폰 번호 양식을 확인
		if (phone != null && !validatePhoneNumber(phone)) {
			throw new IllegalArgumentException("유효하지 않은 휴대폰 번호 형식입니다.");
		}

		// 예약일이 현재 날짜보다 미래인지 확인
		if (reservationTime != null && !reservationTime.isAfter(LocalDateTime.now())) {
			throw new IllegalArgumentException("예약일은 현재 날짜보다 미래여야 합니다.");
		}

		return Reservation.builder()
			.reservationTime(reservationTime)
			.name(name)
			.phone(phone)
			.visitor(visitor)
			.state(state)
			.user(user)
			.animal(animal)
			.build();
	}

	// 휴대폰 번호 양식 검증
	public boolean validatePhoneNumber(String phoneNumber) {
		// 010-0000-0000의 형식과 맞는지 확인
		return phoneNumber.matches("^01(?:0|1|[6-9])-(\\d{4})-\\d{4}$");
	}

}
