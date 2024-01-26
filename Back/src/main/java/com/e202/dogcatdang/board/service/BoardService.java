package com.e202.dogcatdang.board.service;

import java.io.IOException;
import java.util.List;

import com.e202.dogcatdang.board.dto.RequestBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardDto;
import com.e202.dogcatdang.board.dto.ResponseSavedIdDto;

public interface BoardService {
	ResponseSavedIdDto save(RequestBoardDto requestBoardDto) throws IOException;

	List<ResponseBoardDto> findAll();

	ResponseBoardDto findById(Long boardId);
}
