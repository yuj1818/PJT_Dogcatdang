package com.e202.dogcatdang.board.dto;

import java.util.ArrayList;
import java.util.List;

import com.e202.dogcatdang.db.entity.Board;
import com.e202.dogcatdang.db.entity.BoardImage;
import com.e202.dogcatdang.db.entity.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class ResponseBoardSummaryDto {
	private Long boardId;
	private String title;
	private String content;
	private String thumbNailImgUrl;
	private String nickname;

	@Builder
	public ResponseBoardSummaryDto(Board board) {
		this.boardId = board.getBoardId();
		this.title = board.getTitle();
		this.content = board.getContent();

		for (BoardImage image : board.getImageList()) {
			ResponseImageDto responseImageDto = ResponseImageDto.builder()
				.boardImage(image)
				.build();
			if (image.isThumbnail()) {
				this.thumbNailImgUrl = image.getImgUrl();
			}
		}

		//실제 유저 연결해야함
		this.nickname = board.getUser().getNickname();
	}

	public Board toEntity(User user) {

		return Board.builder()
			.boardId(boardId)
			.title(title)
			.content(content)
			.user(user)
			.build();
	}
}
