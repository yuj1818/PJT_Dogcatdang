package com.e202.dogcatdang.db.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.db.entity.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	// 일반 회원이 본인의 userid와 일치하는 모든 예약 정보 가져오기
	@Query("SELECT r FROM Reservation r WHERE r.user.id = :userId")
	List<Reservation> findAllByUserId(Long userId);

	// 기관이 본인에게 들어온 예약 정보 1개 가져오기
	Optional<Reservation> findByAnimal_User_IdAndReservationId(Long shelterId, Long reservationId);

	// animalId와 state 상태가 조건에 맞는 모든 예약 정보 가져오기
	List<Reservation> findByAnimal_AnimalIdAndState(Long animalId, Reservation.State state);

	List<Reservation> findReservationsByUserIdAndReservationTimeBetween(Long userId, LocalDateTime startDateTime, LocalDateTime endDateTime);

	// List<Reservation> findShelterReservationsByDate(Long shelterId, LocalDateTime startDateTime, LocalDateTime endDateTime, Reservation.State state);
}
