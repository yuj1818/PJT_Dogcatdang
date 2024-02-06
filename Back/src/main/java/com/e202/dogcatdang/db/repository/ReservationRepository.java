package com.e202.dogcatdang.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.db.entity.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	@Query("SELECT r FROM Reservation r WHERE r.user.id = :userId")
	List<Reservation> findAllByUserId(Long userId);

	// userId와 reservationId가 조건에 맞는 예약 정보 가져오기
	// 기관이 본인에게 들어온 예약을 전체 조회할 때 사용
	Optional<Reservation> findByAnimal_User_IdAndReservationId(Long userId, Long reservationId);

	// animalId와 state 상태가 조건에 맞는 모든 예약 정보 가져오기
	List<Reservation> findByAnimal_AnimalIdAndState(Long animalId, Reservation.State state);
}
