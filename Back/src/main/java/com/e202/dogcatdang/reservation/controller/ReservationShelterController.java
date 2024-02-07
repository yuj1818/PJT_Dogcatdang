package com.e202.dogcatdang.reservation.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e202.dogcatdang.db.entity.Reservation;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.ReservationRepository;
import com.e202.dogcatdang.reservation.dto.RequestReservationDto;
import com.e202.dogcatdang.reservation.dto.ResponseReservationDto;
import com.e202.dogcatdang.reservation.dto.ResponseShelterDto;
import com.e202.dogcatdang.reservation.dto.ResponseUpdatedStateDto;
import com.e202.dogcatdang.reservation.service.ReservationService;
import com.e202.dogcatdang.user.Service.UserProfileService;
import com.e202.dogcatdang.user.jwt.JWTUtil;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/shelter/reservations")
public class ReservationShelterController {

	private JWTUtil jwtUtil;
	private final ReservationService reservationService;
	private final ReservationRepository reservationRepository;
	private final UserProfileService userService;



	// 기관 회원 기준
	// 기관 회원의 예약 정보 전체 조회

	// 기관 회원의 특정한 예약 정보 상세 조회
	@Transactional
	@GetMapping("/{reservationId}")
	public ResponseEntity<ResponseShelterDto> findReservation(@PathVariable long reservationId, @RequestHeader("Authorization") String token) {
		// 토큰에서 사용자 아이디(pk) 추출 -> 기관 회원의 아이디가 됨
		Long shelterId = jwtUtil.getUserId(token.substring(7));

		// 예약 정보 조회
		Reservation reservation = reservationRepository.findByAnimal_User_IdAndReservationId(shelterId, reservationId).orElse(null);

		// 예약 정보 속 동물을 등록한 유저와 현재 유저가 일치한다면
		if (reservation != null && reservation.getAnimal().getUser().getId().equals(shelterId)) {

			ResponseShelterDto reservationDto = reservationService.findShelterReservation(reservationId);
			return ResponseEntity.ok(reservationDto);
		} else {
			return ResponseEntity.notFound().build();
		}
	}


	// 기관 회원의 자신에게 들어온 방문 예약 상태 변경(수정 - update)
	// 변경된 state만 반환하도록 만듦
	@Transactional
	@PutMapping("/{shelterId}/{reservationId}")
	public ResponseEntity<ResponseUpdatedStateDto> updateState(@PathVariable Long shelterId, @PathVariable Long reservationId, @RequestHeader("Authorization") String token,  @RequestBody RequestReservationDto reservationDto) {
		// 토큰에서 사용자 아이디(pk) 추출
		Long loginUserId = jwtUtil.getUserId(token.substring(7));
		// 사용자 역할(role) 확인
		User user = userService.findById(loginUserId);

		// 예약 권한 검증 조건문 -> 지금은 test를 위해 관리자 계정도 가능하게 함, 추후 기관 회원만이 가능하도록 바꿔야 함
		if (user.getRole().equals("ROLE_SHELTER") || user.getRole().equals("ROLE_ADMIN")) {
			ResponseUpdatedStateDto updatedState = reservationService.updateState(shelterId, reservationId, reservationDto);
			return ResponseEntity.ok(updatedState);

		} else  {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
	}
}
