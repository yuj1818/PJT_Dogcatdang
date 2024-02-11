package com.e202.dogcatdang.board.dto;

import java.util.ArrayList;
import java.util.List;

import com.e202.dogcatdang.db.entity.Board;
import com.e202.dogcatdang.db.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/* 게시글 불러올 때 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ResponseBoardDto {
	private Long boardId;
	private String title;
	private String content;
	private Long userId;
	private String nickname;
	private boolean isLike;
	private Integer likeCnt;
	@Builder
	public ResponseBoardDto(Board board, boolean isLike) {
		this.boardId = board.getBoardId();
		this.title = board.getTitle();
		this.content = board.getContent();
		this.userId = board.getUser().getId();
		this.likeCnt = board.getBoardLikeList().size();
		this.isLike = isLike;
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
