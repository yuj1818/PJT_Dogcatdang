package com.e202.dogcatdang.board.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e202.dogcatdang.board.dto.RequestBoardDto;
import com.e202.dogcatdang.board.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.board.service.BoardService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/board")
public class BoardController {

	private final BoardService boardService;

	@PostMapping("")
	public ResponseEntity<ResponseSavedIdDto> write(@RequestPart RequestBoardDto requestBoardDto,
		@RequestPart("file") List<MultipartFile> files) throws IOException {

		requestBoardDto.setImageList(files);

		System.out.println("writeBoardDto = " + requestBoardDto);
		ResponseSavedIdDto responseSavedIdDto = boardService.save(requestBoardDto);
		return ResponseEntity.ok(responseSavedIdDto);
	}

}
