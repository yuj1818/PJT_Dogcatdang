package com.e202.dogcatdang.db.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Table(name = "board_image")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class BoardImage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long boardImageId;

	private boolean isThumbnail;
	private int sequence;
	private String imgName;
	private String originImgName;
	private String imgUrl;

	@ManyToOne
	@JoinColumn(name = "board_id")
	private Board board;

}
