package com.e202.dogcatdang.board.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.e202.dogcatdang.db.entity.Board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequestBoardDto {
	private String title;
	private String content;
	private boolean isSaved;

	private List<MultipartFile> boardImages;
	private List<String> originImgNames;
	private List<String> imgNames;

	@Builder
	public RequestBoardDto(Board board){


		this.title = board.getTitle();
		this.content = board.getContent();
		this.isSaved = board.isSaved();

		boardImages = new ArrayList<>();
		originImgNames = new ArrayList<>();
		imgNames = new ArrayList<>();
	}

	public void setImageList(List<MultipartFile> images){
		this.boardImages = images;
	}

	public Board toEntity(){

		return Board.builder()
			.userId(1L)
			.title(title)
			.content(content)
			.isSaved(isSaved)
			.build();
	}
}
