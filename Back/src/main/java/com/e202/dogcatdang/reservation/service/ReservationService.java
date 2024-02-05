package com.e202.dogcatdang.reservation.service;

import org.springframework.stereotype.Service;

import com.e202.dogcatdang.reservation.dto.RequestReservationDto;

@Service
public interface ReservationService {

	void register(Long animalId, Long userId, RequestReservationDto reservationDto);

	void delete(long reservationId);
}
