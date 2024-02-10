package com.e202.dogcatdang.board.service;

import java.io.IOException;
import java.util.List;

import com.e202.dogcatdang.board.dto.RequestBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardSummaryDto;
import com.e202.dogcatdang.board.dto.ResponseDto;

public interface BoardService {
	ResponseDto save(Long loginUserId, RequestBoardDto requestBoardDto) throws IOException;

	List<ResponseBoardSummaryDto> findAll(Long loginUserId);

	ResponseBoardDto findById(Long loginUserId, Long boardId);

	ResponseDto update(Long loginUserId, Long boardId,RequestBoardDto requestBoardDto) throws IOException;

	ResponseDto delete(Long loginUserId, Long boardId);

	ResponseDto like(Long loginUserId, Long boardId);

	ResponseDto unLike(Long loginUserId, Long boardId);
}
