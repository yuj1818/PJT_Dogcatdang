package com.e202.dogcatdang.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class ImageResponseDto {
	private boolean isThumbnail;
	private int sequence;
	private String imgName;
	private String imgUrl;
}
