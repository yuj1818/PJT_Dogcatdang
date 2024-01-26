package com.e202.dogcatdang.board.dto;

import com.e202.dogcatdang.db.entity.BoardImage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseImageDto {
	private boolean isThumbnail;
	private int sequence;
	private String imgName;
	private String originImaName;
	private String imgUrl;

	@Builder
	public ResponseImageDto(BoardImage boardImage) {
		this.isThumbnail = boardImage.isThumbnail();
		this.sequence = boardImage.getSequence();
		this.imgName = boardImage.getImgName();
		this.originImaName = boardImage.getOriginImgName();
		this.imgUrl = boardImage.getImgUrl();
	}
}
