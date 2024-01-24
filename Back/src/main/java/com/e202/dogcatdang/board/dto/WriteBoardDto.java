package com.e202.dogcatdang.board.dto;

import java.util.List;

import com.e202.dogcatdang.db.entity.Board;
import com.e202.dogcatdang.db.entity.BoardImage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class WriteBoardDto {
	private String title;
	private String content;
	private boolean isSaved;
	private List<ImageRequestDto> imageList;


	public Board toEntity(){
		List<BoardImage> imageList = this.getImageList().stream()
			.map(imageDto-> BoardImage.builder()
				.isThumbnail(imageDto.isThumbnail())
				.sequence(imageDto.getSequence())
				.imgName(imageDto.getImgName())
				.build()
			).toList();


		return Board.builder()
			.title(title)
			.content(content)
			.isSaved(isSaved)
			.imageEntityList(imageList)
			.build();
	}
}
