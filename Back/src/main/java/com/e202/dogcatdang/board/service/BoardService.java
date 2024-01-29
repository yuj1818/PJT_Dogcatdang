package com.e202.dogcatdang.board.service;

import java.io.IOException;
import java.util.List;

import com.e202.dogcatdang.board.dto.RequestBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardSummaryDto;
import com.e202.dogcatdang.board.dto.ResponseSavedIdDto;

public interface BoardService {
	ResponseSavedIdDto save(RequestBoardDto requestBoardDto) throws IOException;

	List<ResponseBoardSummaryDto> findAll();

	ResponseBoardDto findById(Long boardId);

	ResponseSavedIdDto update(Long boardId, RequestBoardDto requestBoardDto) throws IOException;

	void delete(Long boardId);
}
