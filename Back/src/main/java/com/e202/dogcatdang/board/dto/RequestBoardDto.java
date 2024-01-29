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
	private Long boardId;
	private String title;
	private String content;
	private boolean isSaved;


	private List<RequestImageDto> imageList = new ArrayList<>();

	@Builder
	public RequestBoardDto(Board board) {
		this.boardId = board.getBoardId();
		this.title = board.getTitle();
		this.content = board.getContent();
		this.isSaved = board.isSaved();
	}

	public Board toEntity() {

		return Board.builder()
			.userId(1L)
			.title(title)
			.content(content)
			.isSaved(isSaved)
			.build();
	}
}
