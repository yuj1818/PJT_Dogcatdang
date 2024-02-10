package com.e202.dogcatdang.board.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.e202.dogcatdang.board.dto.RequestBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardSummaryDto;
import com.e202.dogcatdang.board.dto.ResponseIdDto;
import com.e202.dogcatdang.db.entity.Board;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.BoardLikeRepository;
import com.e202.dogcatdang.db.repository.BoardRepository;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.exception.InvalidUserException;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardRepository boardRepository;
	private final UserRepository userRepository;
	private final BoardLikeRepository boardLikeRepository;

	@Override
	public ResponseIdDto save(Long loginUserId, RequestBoardDto requestBoardDto) throws IOException {

		// 로그인한 유저
		User loginUser = userRepository.findById(loginUserId).get();


		Board board = requestBoardDto.toEntity(loginUser);
		Long savedId = boardRepository.save(board).getBoardId();

		return new ResponseIdDto(savedId);
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
	public ResponseIdDto update(Long loginUserId, Long boardId, RequestBoardDto requestBoardDto) throws IOException {

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

			return new ResponseIdDto(savedId);
		}else{
			throw new InvalidUserException("게시글 작성자가 아닙니다!");
			//에러 처리 해줘야 됨.
			//로그인 한 유저와 수정하려는 댓글의 작성자가 다른 경우
		}


	}

	@Override
	public ResponseIdDto delete(Long loginUserId, Long boardId) {

		User loginUser = userRepository.findById(loginUserId).get();
		Board board = boardRepository.findById(boardId).get();

		if(board.getUser().getId().equals(loginUserId)){

			boardRepository.deleteById(boardId);

			return new ResponseIdDto(boardId);
		}else{
			throw new InvalidUserException("게시글 작성자가 아닙니다!");
			//에러 처리 해줘야 됨.
			//로그인 한 유저와 수정하려는 댓글의 작성자가 다른 경우
		}
	}
}
