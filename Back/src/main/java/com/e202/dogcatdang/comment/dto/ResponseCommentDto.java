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
	private String content;
	private LocalDateTime createTime;
	private String nickname;
	private Long parentId;
//a
	@Builder
	public ResponseCommentDto(Comment comment) {
		this.content = comment.getContent();
		this.createTime = comment.getCreateTime();
		this.nickname = comment.getUser().getNickname();
		if(comment.getParent()!=null){
			this.parentId = comment.getParent().getCommentId();

		}
	}

}
