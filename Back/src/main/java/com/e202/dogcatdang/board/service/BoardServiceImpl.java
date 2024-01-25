package com.e202.dogcatdang.board.service;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.e202.dogcatdang.board.dto.ImageRequestDto;
import com.e202.dogcatdang.board.dto.WriteBoardDto;
import com.e202.dogcatdang.db.entity.Board;
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
	public void save(WriteBoardDto writeBoardDto) throws IOException {
		Board board = writeBoardDto.toEntity();

		if(writeBoardDto.getBoardImages().isEmpty()){
			boardRepository.save(board);
		}else{
			for(MultipartFile boardImage : writeBoardDto.getBoardImages()){
				String originImgName = boardImage.getOriginalFilename();
				String imgName = System.currentTimeMillis() + "+_+"+originImgName;

				//S3 사용하면 주소 다른걸로 매핑해줘야됨. 파일도 저장하면 안됩니다.
				String imgUrl = System.getProperty("user.dir")+"\\src\\main\\java\\com\\e202\\dogcatdang\\img\\"+imgName;
				System.out.println("imgUrl = " + imgUrl);

				//파일 저장부분 -> S3 사용하면 s3에 저장해야 함.
				boardImage.transferTo(new File(imgUrl));
				ImageRequestDto imageDto = ImageRequestDto.builder()
					.isThumbnail(false)
					.imgName(imgName)
					.originImgName(originImgName)
					.build();

				Long savedId = boardRepository.save(board).getBoardId();
				board = boardRepository.findById(savedId).get();
				BoardImage boardImageEntity = imageDto.toEntity(board);
				boardImageRepository.save(boardImageEntity);
			}
		}


	}
}
