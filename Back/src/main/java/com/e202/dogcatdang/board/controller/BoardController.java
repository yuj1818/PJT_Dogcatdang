package com.e202.dogcatdang.board.controller;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.e202.dogcatdang.board.dto.RequestBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardSummaryDto;
import com.e202.dogcatdang.board.dto.ResponseIdDto;
import com.e202.dogcatdang.board.service.BoardService;
import com.e202.dogcatdang.user.jwt.JWTUtil;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/boards")
//임시 CORS 설정 --> 바꿔줘야댐
@CrossOrigin(originPatterns = "*", allowedHeaders = "*")
public class BoardController {

	private final BoardService boardService;
	private final JWTUtil jwtUtil;

	@PostMapping("")
	public ResponseEntity<ResponseIdDto> write(@RequestHeader("Authorization") String token,@RequestBody RequestBoardDto requestBoardDto) throws IOException {


		//근황 글 작성
		//이미지 첨부 S3 링크로 처리 되도록 해야 함.

		System.out.println("requestBoardDto = " + requestBoardDto);
		Long loginUserId = jwtUtil.getUserId(token.substring(7));

		ResponseIdDto responseIdDto = boardService.save(loginUserId, requestBoardDto);
		return ResponseEntity.ok(responseIdDto);
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
	public ResponseEntity<ResponseIdDto> update(@RequestHeader("Authorization") String token,@PathVariable Long boardId, @RequestBody RequestBoardDto requestBoardDto) throws
		IOException {

		Long loginUserId = jwtUtil.getUserId(token.substring(7));
		ResponseIdDto responseIdDto = boardService.update(loginUserId, boardId, requestBoardDto);

		return ResponseEntity.ok(responseIdDto);

	}

	/* 게시글 삭제
	*
	* */
	@DeleteMapping("/{boardId}")
	public ResponseEntity<ResponseIdDto> delete(@RequestHeader("Authorization") String token,@PathVariable Long boardId) {

		Long loginUserId = jwtUtil.getUserId(token.substring(7));
		;

		return ResponseEntity.ok(boardService.delete(loginUserId, boardId));
	}


}
