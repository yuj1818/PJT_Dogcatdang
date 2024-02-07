package com.e202.dogcatdang.reservation.dto;

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

}
