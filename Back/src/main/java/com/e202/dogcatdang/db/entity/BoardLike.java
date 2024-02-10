package com.e202.dogcatdang.db.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "board_like")
public class BoardLike {

	@Id
	@GeneratedValue
	private Long boardLikeId;

	@ManyToOne
	@JoinColumn(name = "board_id")
	private Board board;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;


}
