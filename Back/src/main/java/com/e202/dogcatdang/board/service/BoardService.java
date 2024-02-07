package com.e202.dogcatdang.board.service;

import java.io.IOException;
import java.util.List;

import com.e202.dogcatdang.board.dto.RequestBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardSummaryDto;
import com.e202.dogcatdang.board.dto.ResponseIdDto;

public interface BoardService {
	ResponseIdDto save(Long loginUserId, RequestBoardDto requestBoardDto) throws IOException;

	List<ResponseBoardSummaryDto> findAll();

	ResponseBoardDto findById(Long boardId);

	ResponseIdDto update(Long loginUserId, Long boardId,RequestBoardDto requestBoardDto) throws IOException;

	ResponseIdDto delete(Long loginUserId, Long boardId);
}
