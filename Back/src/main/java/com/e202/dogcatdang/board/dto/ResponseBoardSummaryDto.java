package com.e202.dogcatdang.board.dto;

import com.e202.dogcatdang.db.entity.Board;
import com.e202.dogcatdang.db.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class ResponseBoardSummaryDto {
	private Long boardId;
	private String title;
	private String content;
	private String thumbnailImgUrl;
	private String nickname;
	private boolean isLike;
	private Integer likeCnt;

	@Builder
	public ResponseBoardSummaryDto(Board board, boolean isLike) {
		this.boardId = board.getBoardId();
		this.title = board.getTitle();
		this.content = board.getContent();
		this.isLike = isLike;
		this.likeCnt = board.getBoardLikeList().size();
		this.thumbnailImgUrl = board.getThumbnailImgUrl();

		//실제 유저 연결해야함
		this.nickname = board.getUser().getNickname();
	}

	public Board toEntity(User user) {

		return Board.builder()
			.boardId(boardId)
			.title(title)
			.content(content)
			.user(user)
			.build();
	}
}
