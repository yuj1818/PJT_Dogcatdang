package com.e202.dogcatdang.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.e202.dogcatdang.db.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
	@Query("SELECT r FROM Reservation r WHERE r.user.id = :userId")
	List<Reservation> findAllByUserId(Long userId);

	// userId와 reservationId를 사용하여 Reservation 찾기
	Optional<Reservation> findByAnimal_User_IdAndReservationId(Long userId, Long reservationId);
}
