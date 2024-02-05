package com.e202.dogcatdang.comment.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.e202.dogcatdang.comment.dto.ResponseCommentDto;

public interface CommentService {
	List<ResponseCommentDto> findByBoardId(Long boardId);
}
