package com.e202.dogcatdang.board.service;

import java.io.IOException;

import com.e202.dogcatdang.board.dto.RequestBoardDto;
import com.e202.dogcatdang.board.dto.ResponseSavedIdDto;

public interface BoardService {
	ResponseSavedIdDto save(RequestBoardDto requestBoardDto) throws IOException;
}
