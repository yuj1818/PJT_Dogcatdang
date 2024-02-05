package com.e202.dogcatdang.reservation.service;

import org.springframework.stereotype.Service;

import com.e202.dogcatdang.reservation.dto.RequestReservationDto;

@Service
public interface ReservationService {

	void registerReservation(Long animalId, Long userId, RequestReservationDto reservationDto);
}
