package com.e202.dogcatdang.db.entity;

import java.time.LocalDate;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "animal_like")
public class AnimalLike {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "animal_like_id")
	private Long animalLikeId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "animal_id")
	private Animal animal;

	@Builder
	public AnimalLike(User user, Animal animal) {
		this.user = user;
		this.animal = animal;
	}

	// 좋아요를 누른 시간 field, 좋아요를 누른 순서대로 정렬하기 위해 생성.
	// @CreatedDate
	// private LocalDate created;

}
