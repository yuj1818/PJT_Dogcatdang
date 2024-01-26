package com.e202.dogcatdang.board.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.e202.dogcatdang.board.dto.RequestImageDto;
import com.e202.dogcatdang.board.dto.RequestBoardDto;
import com.e202.dogcatdang.board.dto.ResponseBoardDto;
import com.e202.dogcatdang.board.dto.ResponseImageDto;
import com.e202.dogcatdang.board.dto.ResponseSavedIdDto;
import com.e202.dogcatdang.db.entity.Board;
import com.e202.dogcatdang.db.entity.BoardImage;
import com.e202.dogcatdang.db.repository.BoardImageRepository;
import com.e202.dogcatdang.db.repository.BoardRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardRepository boardRepository;
	private final BoardImageRepository boardImageRepository;

	@Override
	public ResponseSavedIdDto save(RequestBoardDto requestBoardDto) throws IOException {
		Board board = requestBoardDto.toEntity();
		Long savedId = boardRepository.save(board).getBoardId();

		if (!requestBoardDto.getBoardImages().isEmpty()) {
			Board curBoard = boardRepository.findById(savedId).get();
			for (MultipartFile boardImage : requestBoardDto.getBoardImages()) {
				String originImgName = boardImage.getOriginalFilename();
				String imgName = System.currentTimeMillis() + "_" + originImgName;

				//S3 사용하면 주소 다른걸로 매핑해줘야됨. 파일도 저장하면 안됩니다.
				String imgUrl =
					System.getProperty("user.dir") + "\\src\\main\\resources\\img\\" + imgName;
				System.out.println("imgUrl = " + imgUrl);

				//파일 저장부분 -> S3 사용하면 s3에 저장해야 함.
				boardImage.transferTo(new File(imgUrl));
				RequestImageDto imageDto = RequestImageDto.builder()
					.isThumbnail(false)
					.imgName(imgName)
					.originImgName(originImgName)
					.build();
				BoardImage boardImageEntity = imageDto.toEntity(curBoard);
				boardImageRepository.save(boardImageEntity);
			}
		}
		return new ResponseSavedIdDto(savedId);
	}

	@Override
	@Transactional
	public List<ResponseBoardDto> findAll() {

		List<Board> boardList = boardRepository.findAll();
		List<ResponseBoardDto> boardDtoList = new ArrayList<>();

		for (Board board : boardList) {
			System.out.println("board = " + board);
			ResponseBoardDto boardDto = ResponseBoardDto.builder()
				.board(board)
				.build();

			boardDtoList.add(boardDto);
		}


		return boardDtoList;
	}

	@Override
	@Transactional
	public ResponseBoardDto findById(Long boardId) {

		Board board = boardRepository.findById(boardId).get();

		return ResponseBoardDto.builder()
			.board(board)
			.build();
	}
}
