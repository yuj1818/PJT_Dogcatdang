package com.e202.dogcatdang.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.e202.dogcatdang.db.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
