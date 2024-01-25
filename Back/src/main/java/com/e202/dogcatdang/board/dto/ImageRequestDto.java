package com.e202.dogcatdang.board.dto;

import com.e202.dogcatdang.db.entity.Board;
import com.e202.dogcatdang.db.entity.BoardImage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ImageRequestDto {
	private boolean isThumbnail;
	private int sequence;
	private String imgName;
	private String originImgName;

	public BoardImage toEntity(Board board){

		return BoardImage.builder()
			.isThumbnail(this.isThumbnail)
			.sequence(sequence)
			.imgName(imgName)
			.board(board)
			.build();
	}

}
