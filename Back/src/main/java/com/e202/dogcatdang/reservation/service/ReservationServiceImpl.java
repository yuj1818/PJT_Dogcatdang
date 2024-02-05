package com.e202.dogcatdang.reservation.service;

import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.e202.dogcatdang.animal.service.AnimalService;
import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.Reservation;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.AnimalRepository;
import com.e202.dogcatdang.db.repository.ReservationRepository;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.reservation.dto.RequestReservationDto;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {

	private final ReservationRepository reservationRepository;
	private final UserRepository userRepository;
	private final AnimalService animalService;

	@Override
	public void registerReservation(Long animalId, Long userId, RequestReservationDto reservationDto) {
		User user = userRepository.findById(userId)
			.orElseThrow(() -> new NoSuchElementException("해당 id의 유저가 없습니다."));

		Animal animal = animalService.getAnimalById(animalId);

		Reservation reservation = reservationDto.toEntity(user, animal);
		reservationRepository.save(reservation);
	}
}
