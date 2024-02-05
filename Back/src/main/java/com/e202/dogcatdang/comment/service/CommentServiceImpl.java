package com.e202.dogcatdang.comment.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.e202.dogcatdang.comment.dto.RequestCommentDto;
import com.e202.dogcatdang.comment.dto.ResponseCommentDto;
import com.e202.dogcatdang.comment.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.db.entity.Board;
import com.e202.dogcatdang.db.entity.Comment;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.BoardRepository;
import com.e202.dogcatdang.db.repository.CommentRepository;
import com.e202.dogcatdang.db.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {

	CommentRepository commentRepository;
	BoardRepository boardRepository;
	UserRepository userRepository;
	@Override
	public List<ResponseCommentDto> findByBoardId(Long boardId) {
		List<Comment> commentList = commentRepository.findByBoardId(boardId);

		List<ResponseCommentDto> commentDtoList = new ArrayList<>();

		for (Comment comment : commentList) {
			ResponseCommentDto responseCommentDto = ResponseCommentDto.builder()
				.comment(comment)
				.build();

			commentDtoList.add(responseCommentDto);
		}

		return commentDtoList;
	}

	/* 댓글 등록
	* 유저 정보는 token에서 가져온 loginUserId 사용
	* requestCommentDto에 있는 board의 id정보를 이용해 함께 저장
	* */
	@Override
	public ResponseSavedIdDto save(Long loginUserId, RequestCommentDto requestCommentDto) {

		System.out.println("requestCommentDto = " + requestCommentDto);

		Board board = boardRepository.findById(requestCommentDto.getBoardId()).get();
		User user = userRepository.findById(loginUserId)
			.orElseThrow(() -> new EntityNotFoundException(loginUserId + "를 가진 사용자가 없습니다."));

		Comment parent =null;
		if(requestCommentDto.getParentId()!=0){
			parent = commentRepository.findById(requestCommentDto.getParentId()).get();
		}

		Long savedId = commentRepository.save(requestCommentDto.toEntity(user, board, parent)).getCommentId();



		return new ResponseSavedIdDto(savedId);
	}
}
