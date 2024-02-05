package com.e202.dogcatdang.comment.service;

import java.util.List;

import com.e202.dogcatdang.comment.dto.RequestCommentDto;
import com.e202.dogcatdang.comment.dto.ResponseCommentDto;
import com.e202.dogcatdang.comment.dto.ResponseSavedIdDto;

public interface CommentService {
	List<ResponseCommentDto> findByBoardId(Long boardId);

	ResponseSavedIdDto save(Long loginUserId, RequestCommentDto requestCommentDto);
}
