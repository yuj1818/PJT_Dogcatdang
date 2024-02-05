package com.e202.dogcatdang.db.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Table(name = "reservation")
public class Reservation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "reservation_id", nullable = false)
	private Long reservationId;

	@Column(name = "reservation_time", nullable = false)
	private LocalDateTime reservationTime;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "phone", nullable = false)
	private String phone;

	@Column(name = "visitor", nullable = false)
	private int visitor;

	@Enumerated(EnumType.STRING)
	@Column(name = "state")
	private State state = State.대기중;

	// 관계 매핑
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "animal_id")
	private Animal animal;

	// enum 정의는 클래스의 맨 아래에 위치
	public enum State {
		대기중, 승인, 거절
	}
}
