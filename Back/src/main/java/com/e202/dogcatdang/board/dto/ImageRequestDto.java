package com.e202.dogcatdang.board.dto;

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
	private Long boardId;
}
