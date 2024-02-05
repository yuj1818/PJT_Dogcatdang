package com.e202.dogcatdang.comment.dto;

import java.time.LocalDateTime;

import com.e202.dogcatdang.db.entity.Board;
import com.e202.dogcatdang.db.entity.BoardImage;
import com.e202.dogcatdang.db.entity.Comment;
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
public class RequestCommentDto {
	private String content;
	private Long boardId;
	private long parentId;
	@Builder
	public RequestCommentDto(Comment comment) {
		this.content = comment.getContent();
		this.boardId = comment.getBoard().getBoardId();
		if (comment.getParent() != null) {
			this.parentId = comment.getParent().getCommentId();
		}
	}

	/*
	 * 작성된 댓글의 내용을 Entity로 변환
	 * user와 board entity를 가지고 와서 함께 저장
	 * 생성 시간은 LocalDatetime.now()로 현재 시간으로 저장
	 * */
	public Comment toEntity(User user, Board board, Comment Parent) {

		return Comment.builder()
			.content(content)
			.user(user)
			.board(board)
			.createTime(LocalDateTime.now())
			.parent(Parent)
			.build();
	}
}
