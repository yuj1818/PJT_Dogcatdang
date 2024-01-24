package com.e202.dogcatdang.board.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.e202.dogcatdang.board.dto.ImageResponseDto;
import com.e202.dogcatdang.board.dto.WriteBoardDto;
import com.e202.dogcatdang.board.service.BoardService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/board")
public class BoardController {

	private final BoardService boardService;

	@PostMapping("")
	public ResponseEntity write(@RequestBody WriteBoardDto writeBoardDto) {
		boardService.save(writeBoardDto);
		return new ResponseEntity(HttpStatus.OK);
	}

}
