package com.e202.dogcatdang.reservation.controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.reservation.dto.RequestReservationDto;
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


	// 일반 회원의 방문 예약 신청 - create
	@PostMapping("/{animalId}")
	public ResponseEntity<Void> createReservation(@PathVariable long animalId, @RequestHeader("Authorization") String token, @RequestBody
		RequestReservationDto reservationDto) throws IOException {
		// 토큰에서 사용자 아이디(pk) 추출
		Long loginUserId = jwtUtil.getUserId(token.substring(7));
		// 사용자 역할(role) 확인
		User user = userService.findById(loginUserId);
		// 예약 권한 검증 조건문 -> 지금은 test를 위해 관리자 계정도 가능하게 함, 추후 일반 회원만이 가능하도록 바꿔야 함
		if (user.getRole().equals("ROLE_USER") || user.getRole().equals("ROLE_ADMIN")) {
			// 역할(role)이 "ROLE_USER"인 경우에만 예약 생성
			reservationService.registerReservation(animalId, loginUserId, reservationDto);
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
	}

}
