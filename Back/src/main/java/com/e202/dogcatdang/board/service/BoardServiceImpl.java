package com.e202.dogcatdang.board.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Service;

import com.e202.dogcatdang.board.dto.RequestImageDto;
import com.e202.dogcatdang.board.dto.RequestBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardSummaryDto;
import com.e202.dogcatdang.board.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.db.entity.Board;
import com.e202.dogcatdang.db.repository.BoardImageRepository;
import com.e202.dogcatdang.db.repository.BoardRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardRepository boardRepository;
	private final BoardImageRepository boardImageRepository;

	@Override
	public ResponseSavedIdDto save(RequestBoardDto requestBoardDto) throws IOException {
		Board board = requestBoardDto.toEntity();
		Long savedId = boardRepository.save(board).getBoardId();

		if (!requestBoardDto.getImageList().isEmpty()) {
			Board curBoard = boardRepository.findById(savedId).get();
			for (RequestImageDto boardImage : requestBoardDto.getImageList()) {
				byte[] imageBytes = Base64.decodeBase64(boardImage.getBase64Image());
				String key = UUID.randomUUID().toString();
				System.out.println(Arrays.toString(imageBytes));
			}
		}
		return new ResponseSavedIdDto(savedId);
	}

	@Override
	@Transactional
	public List<ResponseBoardSummaryDto> findAll() {

		List<Board> boardList = boardRepository.findAll();
		List<ResponseBoardSummaryDto> boardDtoList = new ArrayList<>();

		for (Board board : boardList) {
			ResponseBoardSummaryDto boardSummary = ResponseBoardSummaryDto.builder()
				.board(board)
				.build();

			boardDtoList.add(boardSummary);
		}

		return boardDtoList;
	}

	@Override
	@Transactional
	public ResponseBoardDto findById(Long boardId) {

		Board board = boardRepository.findById(boardId).get();

		return ResponseBoardDto.builder()
			.board(board)
			.build();
	}

	@Override
	@Transactional
	public ResponseSavedIdDto update(Long boardId, RequestBoardDto requestBoardDto) throws IOException {

		Board board = boardRepository.findById(boardId).get();
		if(requestBoardDto.getTitle()!=null){
			board.updateTitle(requestBoardDto.getTitle());
		}
		if(requestBoardDto.getContent()!=null){
			board.updateContent(requestBoardDto.getContent());
		}
		if(requestBoardDto.getTitle()!=null){
			board.updateTitle(requestBoardDto.getTitle());
		}
		if (!requestBoardDto.getImageList().isEmpty()) {
			for (RequestImageDto boardImage : requestBoardDto.getImageList()) {
				byte[] imageBytes = Base64.decodeBase64(boardImage.getBase64Image());
				String key = UUID.randomUUID().toString();
				System.out.println(Arrays.toString(imageBytes));
			}
		}
		Long savedId = boardRepository.save(board).getBoardId();

		return new ResponseSavedIdDto(savedId);
	}

	@Override
	public void delete(Long boardId) {
		boardRepository.deleteById(boardId);
	}
}
