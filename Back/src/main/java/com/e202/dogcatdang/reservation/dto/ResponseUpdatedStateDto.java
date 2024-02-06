package com.e202.dogcatdang.reservation.dto;

import com.e202.dogcatdang.db.entity.Reservation;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseUpdatedStateDto {

	private Reservation.State state;
}
