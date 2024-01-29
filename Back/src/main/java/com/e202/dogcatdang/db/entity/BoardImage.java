package com.e202.dogcatdang.db.entity;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
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
public class BoardImage {

	@Override
	public String toString() {
		return "BoardImage{" +
			"boardImageId=" + boardImageId +
			", isThumbnail=" + isThumbnail +
			", imgName='" + imgName + '\'' +
			", originImgName='" + originImgName + '\'' +
			", imgUrl='" + imgUrl + '\'' +
			'}';
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long boardImageId;

	@Column(columnDefinition = "TINYINT(1)")
	private boolean isThumbnail;
	private String imgName;
	private String originImgName;
	private String imgUrl;

	@ManyToOne
	@JoinColumn(name = "board_id")
	private Board board;

}
