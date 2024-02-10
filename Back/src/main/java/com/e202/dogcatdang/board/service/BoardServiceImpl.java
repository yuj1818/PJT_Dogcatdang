package com.e202.dogcatdang.board.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e202.dogcatdang.board.dto.RequestBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardSummaryDto;
import com.e202.dogcatdang.board.dto.ResponseDto;
import com.e202.dogcatdang.db.entity.Board;
import com.e202.dogcatdang.db.entity.BoardLike;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.BoardLikeRepository;
import com.e202.dogcatdang.db.repository.BoardRepository;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.exception.InvalidLikeException;
import com.e202.dogcatdang.exception.InvalidUserException;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardRepository boardRepository;
	private final UserRepository userRepository;
	private final BoardLikeRepository boardLikeRepository;

	@Override
	public ResponseDto save(Long loginUserId, RequestBoardDto requestBoardDto) throws IOException {

		// 로그인한 유저
		User loginUser = userRepository.findById(loginUserId).get();


		Board board = requestBoardDto.toEntity(loginUser);
		Long savedId = boardRepository.save(board).getBoardId();

		return new ResponseDto(savedId);
	}

	@Override
	@Transactional
	public List<ResponseBoardSummaryDto> findAll(Long loginUserId) {
		User loginUser = userRepository.findById(loginUserId).get();

		List<Board> boardList = boardRepository.findAll();
		List<ResponseBoardSummaryDto> boardDtoList = new ArrayList<>();
		for (Board board : boardList) {
			boolean isLike = boardLikeRepository.existsByBoardBoardIdAndUserId(board.getBoardId(), loginUserId);
			ResponseBoardSummaryDto boardSummary = ResponseBoardSummaryDto.builder()
				.board(board)
				.isLike(isLike)
				.build();

			boardDtoList.add(boardSummary);
		}

		return boardDtoList;
	}

	@Override
	@Transactional
	public ResponseBoardDto findById(Long loginUserId, Long boardId) {

		Board board = boardRepository.findById(boardId).get();
		User loginUser = userRepository.findById(loginUserId).get();
		boolean isLike = boardLikeRepository.existsByBoardBoardIdAndUserId(board.getBoardId(), loginUserId);

		return ResponseBoardDto.builder()
			.board(board)
			.isLike(isLike)
			.build();
	}

	@Override
	@Transactional
	public ResponseDto update(Long loginUserId, Long boardId, RequestBoardDto requestBoardDto) throws IOException {

		User loginUser = userRepository.findById(loginUserId).get();
		Board board = boardRepository.findById(boardId).get();
		if(board.getUser().getId().equals(loginUserId)){
			if(requestBoardDto.getTitle()!=null){
				board.updateTitle(requestBoardDto.getTitle());
			}
			if(requestBoardDto.getContent()!=null){
				board.updateContent(requestBoardDto.getContent());
			}
			if(requestBoardDto.getTitle()!=null){
				board.updateTitle(requestBoardDto.getTitle());
			}

			Long savedId = boardRepository.save(board).getBoardId();

			return new ResponseDto(savedId);
		}else{
			throw new InvalidUserException("게시글 작성자가 아닙니다!");
			//에러 처리 해줘야 됨.
			//로그인 한 유저와 수정하려는 댓글의 작성자가 다른 경우
		}


	}

	@Override
	public ResponseDto delete(Long loginUserId, Long boardId) {

		User loginUser = userRepository.findById(loginUserId).get();
		Board board = boardRepository.findById(boardId).get();

		if(board.getUser().getId().equals(loginUserId)){

			boardRepository.deleteById(boardId);

			return new ResponseDto(boardId);
		}else{
			throw new InvalidUserException("게시글 작성자가 아닙니다!");
			//에러 처리 해줘야 됨.
			//로그인 한 유저와 수정하려는 댓글의 작성자가 다른 경우
		}
	}


	/*
	* 게시글 좋아요
	* 좋아요를 요청하는 User와 좋아요 할 Board
	* 이미 좋아요가 있는데 요청한다면 에러 Throw
	* 아니라면 좋아요 저장 후 좋아요의 id 리턴*/
	@Override
	@Transactional
	public ResponseDto like(Long loginUserId, Long boardId) {
		User loginUser = userRepository.findById(loginUserId).get();
		Board board = boardRepository.findById(boardId).get();
		if(boardLikeRepository.existsByBoardBoardIdAndUserId(board.getBoardId(),loginUserId)){
			throw new InvalidLikeException("올바르지 않은 요청입니다!");
		}
		BoardLike boardLike = BoardLike.builder()
			.user(loginUser)
			.board(board)
			.build();
		board.getBoardLikeList().add(boardLike);

		Long savedId = boardLikeRepository.save(boardLike).getBoardLikeId();

		return new ResponseDto(savedId);
	}

	/*
	 * 게시글 좋아요 취소
	 * 좋아요를 요청하는 User와 좋아요 할 Board
	 * 좋아요가 되어있지 않은데 취소를 요청하면 에러
	 * 아니라면 취소 후 삭제된 좋아요의 id 리턴
	 *
	 */
	@Override
	@Transactional
	public ResponseDto unLike(Long loginUserId, Long boardId) {
		User loginUser = userRepository.findById(loginUserId).get();
		Board board = boardRepository.findById(boardId).get();
		if(!boardLikeRepository.existsByBoardBoardIdAndUserId(board.getBoardId(),loginUserId)){
			throw new InvalidLikeException("올바르지 않은 요청입니다!");
		}
		BoardLike boardLike = boardLikeRepository.findByBoardBoardIdAndUserId(board.getBoardId(),loginUserId);

		Long savedId = boardLike.getBoardLikeId();
		boardLikeRepository.delete(boardLike);

		return new ResponseDto(savedId);
	}
}
