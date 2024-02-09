package com.e202.dogcatdang.reservation.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.e202.dogcatdang.db.entity.Reservation;
import com.e202.dogcatdang.reservation.dto.RequestReservationDto;
import com.e202.dogcatdang.reservation.dto.ResponseReservationDto;
import com.e202.dogcatdang.reservation.dto.ResponseShelterApprovedDto;
import com.e202.dogcatdang.reservation.dto.ResponseShelterDto;
import com.e202.dogcatdang.reservation.dto.ResponseShelterListDto;
import com.e202.dogcatdang.reservation.dto.ResponseUpdatedStateDto;

@Service
public interface ReservationService {

	// 일반 회원 기준
	void register(Long animalId, Long userId, RequestReservationDto reservationDto);

	void delete(long reservationId);

	ResponseReservationDto finbReservationById(long reservationId);

	List<ResponseReservationDto> findAllReservationsById(Long loginUserId);

	List<ResponseReservationDto> findReservationsByDate(Long loginUserId, LocalDateTime startDateTime, LocalDateTime endDateTime);

	// 기관 회원 기준

	ResponseUpdatedStateDto updateState(Long shelterId, Long reservationId, RequestReservationDto reservationDto);

	ResponseShelterDto findShelterReservation(long reservationId);

	List<ResponseShelterApprovedDto> findShelterReservationsByDate(Long shelterId, LocalDateTime startDateTime, LocalDateTime endDateTime);

	List<ResponseShelterListDto> findShelterReservationsByMonths(Long shelterId, int months);
}
