package com.e202.dogcatdang.reservation.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.hibernate.Hibernate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import com.e202.dogcatdang.db.entity.Reservation;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.ReservationRepository;
import com.e202.dogcatdang.reservation.dto.RequestReservationDto;
import com.e202.dogcatdang.reservation.dto.ResponseReservationDto;
import com.e202.dogcatdang.reservation.service.ReservationService;
import com.e202.dogcatdang.user.Service.UserProfileService;
import com.e202.dogcatdang.user.jwt.JWTUtil;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

	private JWTUtil jwtUtil;
	private final ReservationService reservationService;
	private final UserProfileService userService;
	private final ReservationRepository reservationRepository;

	// 일반 회원 기준
	// 일반 회원의 방문 예약 신청 - create
	@Transactional
	@PostMapping("/{animalId}")
	public ResponseEntity<String> createReservation(@PathVariable long animalId, @RequestHeader("Authorization") String token, @RequestBody
		RequestReservationDto reservationDto) {
		// 토큰에서 사용자 아이디(pk) 추출
		Long loginUserId = jwtUtil.getUserId(token.substring(7));
		// 사용자 역할(role) 확인
		User user = userService.findById(loginUserId);
		// 예약 권한 검증 조건문 -> 지금은 test를 위해 관리자 계정도 가능하게 함, 추후 일반 회원만이 가능하도록 바꿔야 함
		if (user.getRole().equals("ROLE_USER") || user.getRole().equals("ROLE_ADMIN")) {
			// 역할(role)이 "ROLE_USER"인 경우에만 예약 생성
			reservationService.register(animalId, loginUserId, reservationDto);
			return ResponseEntity.ok("예약이 등록되었습니다");
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
	}

	// 일반 회원의 방문 예약 삭제 - delete
	@Transactional
	@DeleteMapping("/{reservationId}")
	public ResponseEntity<String> deleteReservation(@PathVariable long reservationId, @RequestHeader("Authorization") String token) {

		// 토큰에서 사용자 아이디(pk) 추출
		Long loginUserId = jwtUtil.getUserId(token.substring(7));

		try {
			// 예약 번호의 유효성 검증
			if (!reservationRepository.existsById(reservationId)) {
				return ResponseEntity.badRequest().body("예약 번호가 유효하지 않습니다.");
			}

			// 예약 정보 조회

			Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
			// 예약 정보가 존재하지 않거나 현재 로그인한 유저와 예약 내역의 유저 아이디가 일치하지 않는다면 권한 없음
			if (reservation == null || !reservation.getUser().getId().equals(loginUserId)) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("권한이 없습니다.");
			}
			// 예약 번호가 유효하고, 현재 유저가 신청한 예약이 맞다면 삭제 실행
			reservationService.delete(reservationId);
			return ResponseEntity.ok("예약이 삭제되었습니다.");
		} catch (HttpClientErrorException.NotFound e) { // 예약이 없는 예외 발생
			return ResponseEntity.notFound().build();
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	// 일반 회원이 본인의 예약 정보 전체 조회
	@Transactional
	@GetMapping("")
	public ResponseEntity<List<ResponseReservationDto>> findAllReservations(@RequestHeader("Authorization") String token) {
		// 토큰에서 사용자 아이디(pk) 추출
		Long loginUserId = jwtUtil.getUserId(token.substring(7));
		List<ResponseReservationDto> reservations = reservationService.findAllReservationsById(loginUserId);
		return ResponseEntity.ok(reservations);
	}

	// 예약 정보를 일별로 전달
	@Transactional
	@GetMapping("/by-date")
	public ResponseEntity<List<ResponseReservationDto>> findReservationsByDate(
		@RequestHeader("Authorization") String token,
		@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
		// 토큰에서 사용자 아이디(pk) 추출
		Long loginUserId = jwtUtil.getUserId(token.substring(7));

		// 시작일자와 종료일자를 LocalDateTime으로 변환
		LocalDateTime startDateTime = date.atStartOfDay();
		LocalDateTime endDateTime = date.atStartOfDay().plusDays(1).minusNanos(1);

		List<ResponseReservationDto> reservations = reservationService.findReservationsByDate(loginUserId, startDateTime, endDateTime);
		return ResponseEntity.ok(reservations);
	}

	// 일반 회원이 본인의 특정한 예약 1개 정보 상세 조회
	@Transactional
	@GetMapping("/{reservationId}")
	public ResponseEntity<ResponseReservationDto> findReservation(@PathVariable long reservationId, @RequestHeader("Authorization") String token) {

		// 토큰에서 사용자 아이디(pk) 추출
		Long loginUserId = jwtUtil.getUserId(token.substring(7));

		// 예약 정보 조회
		Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
		// 예약 정보가 존재하고, 예약한 유저와 로그인한 유저가 일치한다면
		if (reservation != null && reservation.getUser().getId().equals(loginUserId)) {

			ResponseReservationDto reservationDto = reservationService.finbReservationById(reservationId);
			return ResponseEntity.ok(reservationDto);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	// 일반 회원의 예약 정보 전체 조회
	@GetMapping("")
	public ResponseEntity<List<ResponseReservationDto>> findAllReservations(@RequestHeader("Authorization") String token) {
		// 토큰에서 사용자 아이디(pk) 추출
		Long loginUserId = jwtUtil.getUserId(token.substring(7));
		List<ResponseReservationDto> reservations = reservationService.findAllReservationsById(loginUserId);
		return ResponseEntity.ok(reservations);
	}





}
