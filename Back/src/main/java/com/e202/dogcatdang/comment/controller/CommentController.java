package com.e202.dogcatdang.comment.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e202.dogcatdang.comment.dto.RequestCommentDto;
import com.e202.dogcatdang.comment.dto.ResponseCommentDto;
import com.e202.dogcatdang.comment.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.comment.service.CommentService;
import com.e202.dogcatdang.comment.service.CommentServiceImpl;
import com.e202.dogcatdang.user.jwt.JWTUtil;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
//임시 CORS 설정 --> 바꿔줘야댐
@CrossOrigin(originPatterns = "*", allowedHeaders = "*")
public class CommentController {

	CommentService commentService;
	JWTUtil jwtUtil;

	@GetMapping("/{boardId}/comments")
	public ResponseEntity<List<ResponseCommentDto>> findByBoardId(@PathVariable Long boardId){
		List<ResponseCommentDto> commentList = commentService.findByBoardId(boardId);
		return ResponseEntity.ok(commentList);
	}

	@PostMapping("/{boardId}/comments")
	public ResponseEntity<ResponseSavedIdDto> save(@RequestHeader("Authorization") String token, @PathVariable Long boardId, @RequestBody RequestCommentDto requestCommentDto) {
		// 토큰에서 사용자 아이디(pk) 추출

		Long loginUserId = jwtUtil.getUserId(token.substring(7));


		ResponseSavedIdDto responseSavedIdDto = commentService.save(loginUserId, requestCommentDto);

		return ResponseEntity.ok(responseSavedIdDto);
	}

	/*
	* 댓글 수정
	* 토큰에서 유저 정보 추출해서 사용
	* */
	@PutMapping("/{boardId}/comments/{commentId}")
	public ResponseEntity<ResponseSavedIdDto> update(@RequestHeader("Authorization") String token, @PathVariable Long boardId, @PathVariable Long commentId,
		@RequestBody RequestCommentDto requestCommentDto) {
		Long loginUserId = jwtUtil.getUserId(token.substring(7));

		ResponseSavedIdDto responseSavedIdDto = commentService.update(loginUserId, requestCommentDto);

		return ResponseEntity.ok(responseSavedIdDto);
	}

}
