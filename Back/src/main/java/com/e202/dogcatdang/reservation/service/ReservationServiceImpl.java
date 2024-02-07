package com.e202.dogcatdang.reservation.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
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
import com.e202.dogcatdang.reservation.dto.ResponseUpdatedStateDto;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

	private final ReservationRepository reservationRepository;
	private final UserRepository userRepository;
	private final AnimalService animalService;

	// 일반 회원의 예약 등록
	@Transactional
	@Override
	public void register(Long animalId, Long userId, RequestReservationDto reservationDto) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NoSuchElementException("해당 id의 유저가 없습니다."));

		Animal animal = animalService.getAnimalById(animalId);

		Reservation reservation = reservationDto.toEntity(user, animal);
		reservationRepository.save(reservation);
	}

	// 일반 회원의 예약 취소(삭제)
	@Transactional
	@Override
	public void delete(long reservationId) {
		reservationRepository.deleteById(reservationId);
	}

	// 일반 회원의 본인 예약 상세 조회
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

	// 일반 회원의 본인 예약 전체 조회
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

	// 기관 회원의 예약 상태 승인/거절 (상태 변경)
	@Transactional
	@Override
	public ResponseUpdatedStateDto updateState(Long shelterId, Long reservationId,
		RequestReservationDto reservationDto) {
		// 특정 예약 조회 - shelterId와 reservationId 이용
		Reservation reservation = reservationRepository.findById(reservationId).orElse(null);

		// 해당 번호의 예약이 존재하고, 예약된 동물을 등록한 회원 id가 현재 기관의 id와 같다면 수정
		if (reservation != null && reservation.getAnimal().getUser().getId().equals(shelterId)) {
			// state update method - Entity 내에 생성
			reservation.updateState(reservationDto.getState());

			// 업데이트된 예약을 저장
			reservationRepository.save(reservation);

			return new ResponseUpdatedStateDto(reservation.getState());

		} else { // 예약을 찾지 못하거나 권한이 없음
			return null;
		}

	}

}
