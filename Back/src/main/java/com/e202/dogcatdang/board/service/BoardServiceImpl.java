package com.e202.dogcatdang.board.service;

import org.springframework.stereotype.Service;

import com.e202.dogcatdang.board.dto.WriteBoardDto;
import com.e202.dogcatdang.db.entity.BoardImage;
import com.e202.dogcatdang.db.repository.BoardImageRepository;
import com.e202.dogcatdang.db.repository.BoardRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardRepository boardRepository;
	private final BoardImageRepository boardImageRepository;

	@Override
	public void save(WriteBoardDto writeBoardDto) {
		System.out.println("writeBoardDto = " + writeBoardDto.toEntity());
		boardRepository.save(writeBoardDto.toEntity());

	}
}
