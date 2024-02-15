package com.e202.dogcatdang.streaming.dto;

import com.e202.dogcatdang.db.entity.Streaming;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ResponseStreamingDto {
	private Long streamingId;
	private String title;
	private String description;
	private Long orgId;
	private String orgNickname;
	private String sessionId;
	private String thumbnailImgUrl;

	@Builder
	public ResponseStreamingDto(Streaming streaming) {
		this.streamingId = streaming.getStreamingId();
		this.title = streaming.getTitle();
		this.description = streaming.getDescription();
		this.orgId = streaming.getUser().getId();
		this.orgNickname = streaming.getUser().getNickname();
		this.sessionId = streaming.getSessionId();;
		this.thumbnailImgUrl = streaming.getThumbnailImgUrl();
	}
}
