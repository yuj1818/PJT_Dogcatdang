package com.e202.dogcatdang.streaming.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.Streaming;
import com.e202.dogcatdang.db.entity.StreamingAnimal;
import com.e202.dogcatdang.db.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RequestStreamingDto {

	private String title;
	private String description;
	private List<Long> animalInfo;

	private String sessionId;

	private String thumbnailImgUrl;



	public Streaming toEntity(User user, List<StreamingAnimal> animalEntityList){
		return Streaming.builder()
			.sessionId(sessionId)
			.title(title)
			.description(description)
			.startTime(LocalDateTime.now())
			.animalList(animalEntityList)
			.thumbnailImgUrl(thumbnailImgUrl)
			.user(user)
			.build();
	}



}
