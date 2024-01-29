package com.e202.dogcatdang.board.dto;

import java.util.ArrayList;
import java.util.List;

import com.e202.dogcatdang.db.entity.Board;
import com.e202.dogcatdang.db.entity.BoardImage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/* 게시글 불러올 때 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ResponseBoardDto {
	private Long boardId;
	private String title;
	private String content;
	private List<ResponseImageDto> imageList = new ArrayList<>();
	private Long userId;
	private String userName;

	@Builder
	public ResponseBoardDto(Board board) {
		this.boardId = board.getBoardId();
		this.title = board.getTitle();
		this.content = board.getContent();

		for (BoardImage image : board.getImageList()) {
			ResponseImageDto responseImageDto = ResponseImageDto.builder()
				.boardImage(image)
				.build();
			imageList.add(responseImageDto);
		}

		//실제 유저 연결해야함
		this.userId = board.getUserId();
		this.userName = "닉네임";
	}

	public Board toEntity() {

		return Board.builder()
			.boardId(boardId)
			.title(title)
			.content(content)
			.build();
	}
}
