package com.e202.dogcatdang.board.dto;

import com.e202.dogcatdang.db.entity.Board;
import com.e202.dogcatdang.db.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequestBoardDto {
	private Long boardId;
	private String title;
	private String content;
	private boolean isSaved;
	private String thumbnailImgUrl;
	@Builder
	public RequestBoardDto(Board board) {
		this.boardId = board.getBoardId();
		this.title = board.getTitle();
		this.content = board.getContent();
		this.isSaved = board.isSaved();
		this.thumbnailImgUrl = board.getThumbnailImgUrl();
	}

	public Board toEntity(User user) {

		return Board.builder()
			.user(user)
			.title(title)
			.content(content)
			.isSaved(isSaved)
			.thumbnailImgUrl(thumbnailImgUrl)
			.build();
	}
}
