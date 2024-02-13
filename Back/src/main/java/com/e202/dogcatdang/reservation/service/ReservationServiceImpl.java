package com.e202.dogcatdang.reservation.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e202.dogcatdang.animal.service.AnimalService;
import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.Notification;
import com.e202.dogcatdang.db.entity.Reservation;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.NotificationRepository;
import com.e202.dogcatdang.db.repository.ReservationRepository;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.reservation.dto.RequestReservationDto;
import com.e202.dogcatdang.reservation.dto.ResponseReservationDto;
import com.e202.dogcatdang.reservation.dto.ResponseShelterApprovedDto;
import com.e202.dogcatdang.reservation.dto.ResponseShelterDto;
import com.e202.dogcatdang.reservation.dto.ResponseShelterListDto;
import com.e202.dogcatdang.reservation.dto.ResponseUpdatedStateDto;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

	private final ReservationRepository reservationRepository;
	private final UserRepository userRepository;
	private final NotificationRepository notificationRepository;
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

	// 일별 예약 조회
	@Override
	public List<ResponseReservationDto> findReservationsByDate(Long userId, LocalDateTime startDateTime,
		LocalDateTime endDateTime) {
		// 현재 로그인한 사용자의 특정 날짜에 대한 예약 정보 조회
		List<Reservation> reservations = reservationRepository.findReservationsByUserIdAndReservationTimeBetween(userId, startDateTime, endDateTime);

		// 예약 정보를 ResponseReservationDto로 변환한 후 리스트로 반환
		return reservations.stream()
			.map(ResponseReservationDto::new)
			.collect(Collectors.toList());
	}

	// 일반 회원의 예약이 있는 날의 날짜 리스트 반환
	@Override
	public List<LocalDate> findReservationDates(Long loginUserId) {

		// 현재 로그인한 사용자의 모든 예약 정보 조회
		List<Reservation> reservations = reservationRepository.findAllByUserId(loginUserId);

		// 중복되지 않은 날짜들을 추출하여 리스트에 저장
		List<LocalDate> uniqueDates = reservations.stream()
			.map(reservation -> reservation.getReservationTime().toLocalDate())
			.distinct()
			.collect(Collectors.toList());

		return uniqueDates;
	}


	// 여기부터 기관 회원 기준 method
	// 기관 회원의 방문 예약 승인/거절 (상태 변경)
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

			System.out.println("reservationDto = " + reservationDto.getState());
			// 예약이 승인되면 알림 보내기
			if (reservationDto.getState().equals(Reservation.State.승인)) {
				User sender = reservation.getAnimal().getUser();
				User receiver = reservation.getUser();

				// 알림(메세지)
				Notification notification = Notification.builder()
					.sender(sender)
					.receiver(receiver)
					.title("방문 예약이 승인되었습니다.")
					.content(receiver.getNickname() + "님의 " + sender.getNickname() + "에 대한 방문 예약이 승인되었습니다.")
					.sentDate(LocalDateTime.now()) // 현재 시간으로 발송 날짜 설정
					.isRead(false) // 초기 상태는 읽지 않음(false)
					.build();

				notificationRepository.save(notification); // DB에 저장
				System.out.println("notification = " + notification);
			}

			return new ResponseUpdatedStateDto(reservation.getState());

		} else { // 예약을 찾지 못하거나 권한이 없음
			return null;
		}

	}

	// 기관 회원의 들어온 예약 상세 조회
	@Override
	public ResponseShelterDto findShelterReservation(long reservationId) {
		Reservation reservation = reservationRepository.findById(reservationId).orElse(null);
		if (reservation != null) {
			return new ResponseShelterDto(reservation);
		} else {
			return null;
		}
	}

	// 기관이 승인한 예약 목록을 일별로 조회
	@Override
	public List<ResponseShelterApprovedDto> findShelterReservationsByDate(Long shelterId, LocalDateTime startDateTime,
		LocalDateTime endDateTime) {
		// 현재 로그인한 사용자의 특정 날짜에 대한 예약 정보 조회
		List<Reservation> reservations = reservationRepository.findShelterReservationsByDate(shelterId, startDateTime, endDateTime, Reservation.State.승인);

		// 예약 정보를 ResponseReservationDto로 변환한 후 리스트로 반환
		return reservations.stream()
			.map(ResponseShelterApprovedDto::new)
			.collect(Collectors.toList());
	}

	// 기관이 개월 수로 필터링 된 전체 예약 목록을 조회
	@Override
	public List<ResponseShelterListDto> findShelterReservationsByMonths(Long shelterId, int months) {
		// months 값이 0보다 작은 경우 현재 달을 포함하여 전체 데이터를 가져오도록 설정
		LocalDateTime fromDateTime;
		if (months <= 0) {
			fromDateTime = LocalDateTime.MIN; // 가장 이전의 날짜로 설정
		} else {
			// 현재 달을 포함하여 n 개월 이전의 데이터를 가져오기 위한 계산
			fromDateTime = LocalDateTime.now().minusMonths(months);
		}

		// 현재 기관에게 들어온 모든 예약 정보 조회
		List<Reservation> reservations = reservationRepository.findByAnimal_User_Id(shelterId);

		// fromDateTime 이후의 예약 정보 필터링
		List<Reservation> filteredReservations = reservations.stream()
			.filter(reservation -> reservation.getReservationTime().isAfter(fromDateTime))
			.collect(Collectors.toList());

		List<ResponseShelterListDto> shelterDtoList = filteredReservations.stream()
			.map(reservation -> ResponseShelterListDto.builder() // ResponseShelterListDto의 빌더 호출
				.reservationId(reservation.getReservationId())
				.name(reservation.getName())
				.reservationTime(reservation.getReservationTime())
				.phone(reservation.getPhone())
				.visitor(reservation.getVisitor())
				.code(reservation.getAnimal().getCode())
				.imgUrl(reservation.getAnimal().getImgUrl())
				.breed(reservation.getAnimal().getBreed())
				.state(reservation.getState())
				.build())
			.collect(Collectors.toList());

		return shelterDtoList;
	}

	// 기관 회원의 승인된 예약이 있는 날의 날짜 리스트 반환
	@Transactional
	@Override
	public List<LocalDate> findShelterReservationDates(Long shelterId) {
		// 현재 기관의 승인된 모든 예약 정보 조회
		List<Reservation> reservations = reservationRepository.findShelterReservations(shelterId, Reservation.State.승인);

		// 중복되지 않은 날짜들을 추출하여 리스트에 저장
		List<LocalDate> uniqueDates = reservations.stream()
			.map(reservation -> reservation.getReservationTime().toLocalDate())
			.distinct()
			.collect(Collectors.toList());

		return uniqueDates;
	}

}
