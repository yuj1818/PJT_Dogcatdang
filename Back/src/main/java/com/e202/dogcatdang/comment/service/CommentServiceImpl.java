package com.e202.dogcatdang.comment.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.e202.dogcatdang.comment.dto.ResponseCommentDto;
import com.e202.dogcatdang.db.repository.CommentRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {

	CommentRepository commentRepository;
	@Override
	public List<ResponseCommentDto> findByBoardId(Long boardId) {
		List<ResponseCommentDto> commentList;

		return null;
	}
}
