package com.e202.dogcatdang.comment.dto;

import java.time.LocalDateTime;

import com.e202.dogcatdang.board.dto.ResponseImageDto;
import com.e202.dogcatdang.db.entity.Board;
import com.e202.dogcatdang.db.entity.BoardImage;
import com.e202.dogcatdang.db.entity.Comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ResponseCommentDto {

	private Long commentId;
	private String content;
	private LocalDateTime createTime;
	private String nickname;
	private Long parentId;

	@Builder
	public ResponseCommentDto(Comment comment) {
		this.commentId = comment.getCommentId();
		this.content = comment.getContent();
		this.createTime = comment.getCreateTime();
		this.nickname = comment.getUser().getNickname();
		this.parentId = comment.getParent().getCommentId();
	}

}
