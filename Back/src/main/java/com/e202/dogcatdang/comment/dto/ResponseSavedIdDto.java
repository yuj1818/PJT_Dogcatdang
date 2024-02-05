package com.e202.dogcatdang.comment.dto;

import com.e202.dogcatdang.db.entity.Board;
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
public class ResponseSavedIdDto {
	private Long CommentId;
}
