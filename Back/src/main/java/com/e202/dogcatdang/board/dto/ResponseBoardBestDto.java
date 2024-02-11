package com.e202.dogcatdang.board.dto;

import com.e202.dogcatdang.db.entity.Board;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResponseBoardBestDto {
	private Long boardId;
	private String title;
	private String thumbnailImgUrl;
	private Integer likeCnt;

	@Builder
	public ResponseBoardBestDto(Board board) {
		this.boardId = board.getBoardId();
		this.title = board.getTitle();
		this.thumbnailImgUrl = board.getThumbnailImgUrl();

		this.likeCnt = board.getBoardLikeList().size();
	}

}
