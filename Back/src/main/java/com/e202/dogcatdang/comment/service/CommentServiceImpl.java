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
import com.e202.dogcatdang.exception.InvalidUserException;

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


	/*
	* 댓글 수정
	* 실제 댓글의 작성자와 로그인한 유저의 id 값을 비교하여 검증
	* 다르다면 에러 처리
	* */
	@Override
	public ResponseSavedIdDto update(Long loginUserId, RequestCommentDto requestCommentDto) {

		Long commentId = requestCommentDto.getCommentId();
		Comment comment = commentRepository.findById(commentId).get();


		if(comment.getUser().getId().equals(loginUserId)){
			comment.updateContent(requestCommentDto.getContent());
			commentId = commentRepository.save(comment).getCommentId();
			return new ResponseSavedIdDto(commentId);
		}else{
			throw new InvalidUserException("댓글 작성자가 아닙니다!");
			//에러 처리 해줘야 됨.
			//로그인 한 유저와 수정하려는 댓글의 작성자가 다른 경우
		}
	}
}
