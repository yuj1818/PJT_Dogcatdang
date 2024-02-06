package com.e202.dogcatdang.reservation.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.e202.dogcatdang.reservation.dto.RequestReservationDto;
import com.e202.dogcatdang.reservation.dto.ResponseReservationDto;

@Service
public interface ReservationService {

	void register(Long animalId, Long userId, RequestReservationDto reservationDto);

	void delete(long reservationId);

	ResponseReservationDto finbReservationById(long reservationId);

	List<ResponseReservationDto> findAllReservationsById(Long loginUserId);
}
