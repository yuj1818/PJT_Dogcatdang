package com.e202.dogcatdang.board.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e202.dogcatdang.board.dto.RequestBoardDto;
import com.e202.dogcatdang.board.dto.RequestBoardSearchDto;
import com.e202.dogcatdang.board.dto.ResponseBoardBestDto;
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

import jakarta.persistence.criteria.Predicate;
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

	// 조건에 맞는 게시글 검색
	@Override
	@Transactional
	public List<ResponseBoardSummaryDto> searchBoards(Long loginUserId, RequestBoardSearchDto searchDto) {
		// 1. 검색 조건에 따라 게시글(엔티티) 조회
		Specification<Board> specification = createSpecification(searchDto);

		List<Board> boardList = boardRepository.findAll(specification);

		// 2. Entity를 DTO로 변환
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

	// 게시글 검색 - 제목 + 내용 안에서 검색
	private Specification<Board> createSpecification(RequestBoardSearchDto searchDto) {
		return (root, query, criteriaBuilder) -> {
			List<Predicate> predicates = new ArrayList<>();

			// 검색 조건에 따라 Predicate 추가 (Or 조건으로 검색)
			if (searchDto.getKeyword() != null) {
				predicates.add(criteriaBuilder.like(root.get("title"), "%" +searchDto.getKeyword() + "%" ));
				predicates.add(criteriaBuilder.like(root.get("content"), "%" +searchDto.getKeyword() + "%" ));
			}

			// 중복 제거 및 내림차순 정렬
			query.orderBy(criteriaBuilder.desc(root.get("id")));
			query.distinct(true);

			return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
		};
	}

	// 인기글 가져오기
	@Override
	@Transactional
	public List<ResponseBoardBestDto> getBestBoards() {
		// 인기순으로 내림차순 정렬 후 top 5 조회
		Pageable pageable = PageRequest.of(0, 5); // 상위 5개의 페이지 요청
		List<ResponseBoardBestDto> boardList= boardRepository.findTop5ByOrderByLikeCntDesc(pageable);
		System.out.println("boardList = " + boardList);


		// boardList를 좋아요 개수가 많은 순으로 내림차순으로 정렬
		boardList.sort(Comparator.comparing(ResponseBoardBestDto::getLikeCnt).reversed());

		return boardList;
	}
}
