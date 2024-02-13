package com.e202.dogcatdang.comment.dto;

import java.time.LocalDateTime;

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
	private Long userId;

	@Builder
	public ResponseCommentDto(Comment comment) {
		this.commentId = comment.getCommentId();
		this.content = comment.getContent();
		this.createTime = comment.getCreateTime();
		this.nickname = comment.getUser().getNickname();
		if (comment.getParent() != null) {
			this.parentId = comment.getParent().getCommentId();
		}
		this.userId = comment.getUser().getId();
	}

}
