package com.e202.dogcatdang.comment.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e202.dogcatdang.comment.dto.ResponseCommentDto;
import com.e202.dogcatdang.comment.service.CommentService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
//임시 CORS 설정 --> 바꿔줘야댐
@CrossOrigin(originPatterns = "*", allowedHeaders = "*")
public class CommentController {

	CommentService commentService;

	@GetMapping("/{boardId}/comments")
	public ResponseEntity<List<ResponseCommentDto>> findByBoardId(@PathVariable Long boardId){
		List<ResponseCommentDto> commentList = commentService.findByBoardId(boardId);



		return commentList;
	}

}
