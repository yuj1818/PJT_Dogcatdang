package com.e202.dogcatdang.db.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "board_like")
@Getter
public class BoardLike {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long boardLikeId;

	@ManyToOne
	@JoinColumn(name = "board_id")
	private Board board;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;


}
