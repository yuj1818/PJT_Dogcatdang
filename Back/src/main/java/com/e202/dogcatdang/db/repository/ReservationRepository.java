package com.e202.dogcatdang.db.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.db.entity.Reservation;
import com.e202.dogcatdang.reservation.dto.ResponseShelterListDto;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	// 일반 회원 전체 조회: 일반 회원이 본인의 userid와 일치하는 모든 예약 정보 가져오기
	@Query("SELECT r FROM Reservation r WHERE r.user.id = :userId")
	List<Reservation> findAllByUserId(Long userId);

	// 동물에게 들어온 방문 예약 counting에 사용
	List<Reservation> findByAnimal_AnimalIdAndState(Long animalId, Reservation.State state);

	// 일반 회원 일별 조회 : 현재 로그인한 일반 회원 id와 예약id와 입력받은 일자와 일치하는 모든 예약 정보 가져오기
	List<Reservation> findReservationsByUserIdAndReservationTimeBetween(Long userId, LocalDateTime startDateTime, LocalDateTime endDateTime);


	// 기관 상세 조회 : 기관이 본인에게 들어온 예약 정보 1개 가져오기
	Optional<Reservation> findByAnimal_User_IdAndReservationId(Long shelterId, Long reservationId);


	// 기관 일별 조회 : 기관에게 들어온 예약 정보를 승인 상태와 일자로 필터링한 후 조건에 맞는 모든 예약 정보 가져오기
	@Query("SELECT r FROM Reservation r " + "JOIN r.animal a " + "JOIN a.user u " + "WHERE u.id = :userId " + "AND r.reservationTime BETWEEN :startDateTime AND :endDateTime " + "AND r.state = :state")
	List<Reservation> findShelterReservationsByDate(@Param("userId") Long shelterId, @Param("startDateTime")LocalDateTime startDateTime, @Param("endDateTime")LocalDateTime endDateTime, @Param("state")Reservation.State state);

	// 기관에게 들어온 모든 예약 정보 조회
	List<Reservation> findByAnimal_User_Id(Long shelterId);

	// 기관에게 들어온 승인된 모든 예약 정보 가져오기
	@Query("SELECT r FROM Reservation r " + "JOIN r.animal a " + "JOIN a.user u " + "WHERE u.id = :userId " + "AND r.state = :state")
	List<Reservation> findShelterReservations(@Param("userId") Long shelterId, @Param("state") Reservation.State state);

	// 방문 상태와 동물 등록한 유저 id로 현재 방문 예약이 승인된 동물의 수 계산
	Integer countByStateAndAnimal_User_Id(Reservation.State state, Long shelterId);
}
