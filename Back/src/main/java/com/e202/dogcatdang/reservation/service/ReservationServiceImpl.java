package com.e202.dogcatdang.reservation.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e202.dogcatdang.animal.service.AnimalService;
import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.Reservation;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.ReservationRepository;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.reservation.dto.RequestReservationDto;
import com.e202.dogcatdang.reservation.dto.ResponseReservationDto;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

	private final ReservationRepository reservationRepository;
	private final UserRepository userRepository;
	private final AnimalService animalService;

	@Transactional
	@Override
	public void register(Long animalId, Long userId, RequestReservationDto reservationDto) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NoSuchElementException("해당 id의 유저가 없습니다."));

		Animal animal = animalService.getAnimalById(animalId);

		Reservation reservation = reservationDto.toEntity(user, animal);
		reservationRepository.save(reservation);
	}

	@Transactional
	@Override
	public void delete(long reservationId) {
		reservationRepository.deleteById(reservationId);
	}

	@Transactional
	@Override
	public ResponseReservationDto finbReservationById(long reservationId) {
		Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
		if (reservation != null) {
			return new ResponseReservationDto(reservation);
		} else {
			return null;
		}
	}

	@Transactional
	@Override
	public List<ResponseReservationDto> findAllReservationsById(Long userId) {
		// 현재 로그인한 사용자의 모든 예약 정보 조회
		List<Reservation> reservations = reservationRepository.findAllByUserId(userId);

		// 예약 정보를 ResponseReservationDto로 변환한 후 리스트로 반환
		return reservations.stream()
			.map(ResponseReservationDto::new)
			.collect(Collectors.toList());
	}
}
