package com.e202.dogcatdang.board.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e202.dogcatdang.board.dto.RequestBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardSummaryDto;
import com.e202.dogcatdang.board.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.board.service.BoardService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/boards")
//임시 CORS 설정 --> 바꿔줘야댐
@CrossOrigin(originPatterns = "*", allowedHeaders = "*")
public class BoardController {

	private final BoardService boardService;

	@PostMapping("")
	public ResponseEntity<ResponseSavedIdDto> write(@RequestPart RequestBoardDto requestBoardDto,
		@RequestPart("file") List<MultipartFile> files) throws IOException {

		requestBoardDto.setImageList(files);

		ResponseSavedIdDto responseSavedIdDto = boardService.save(requestBoardDto);
		return ResponseEntity.ok(responseSavedIdDto);
	}

	/* 게시글 목록 조회
	 * 게시글을 리스트로 불러옴, 썸네일 이미지가 있다면 이미지도 함께 불러옴
	 */
	@GetMapping("")
	public ResponseEntity<List<ResponseBoardSummaryDto>> findAll() {

		List<ResponseBoardSummaryDto> boardSummaryList = boardService.findAll();

		return ResponseEntity.ok(boardSummaryList);
	}

	/* 게시글 상세 보기
	 *  게시글 하나를 불러옴.
	 */
	@GetMapping("/{boardId}")
	public ResponseEntity<ResponseBoardDto> find(@PathVariable Long boardId) {

		ResponseBoardDto responseBoardDto = boardService.findById(boardId);

		return ResponseEntity.ok(responseBoardDto);
	}


	/* 게시글 수정
	*
	* */
	@PutMapping("/{boardId}")
	public ResponseEntity<ResponseSavedIdDto> update(@PathVariable Long boardId, @RequestPart RequestBoardDto requestBoardDto,
		@RequestPart("file") List<MultipartFile> files) throws
		IOException {
		requestBoardDto.setImageList(files);

		ResponseSavedIdDto responseSavedIdDto = boardService.update(boardId, requestBoardDto);

		return ResponseEntity.ok(responseSavedIdDto);

	}

	/* 게시글 삭제
	*
	* */
	@DeleteMapping("/{boardId}")
	public ResponseEntity delete(@PathVariable Long boardId) {

		boardService.delete(boardId);

		return new ResponseEntity(HttpStatus.OK);
	}


}
