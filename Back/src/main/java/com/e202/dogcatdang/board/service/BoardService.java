package com.e202.dogcatdang.board.service;

import java.io.IOException;

import com.e202.dogcatdang.board.dto.WriteBoardDto;

public interface BoardService {
	void save(WriteBoardDto writeBoardDto) throws IOException;
}
