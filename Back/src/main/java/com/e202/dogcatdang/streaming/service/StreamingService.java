package com.e202.dogcatdang.streaming.service;

import java.util.List;

import com.e202.dogcatdang.streaming.dto.RequestStreamingDto;
import com.e202.dogcatdang.streaming.dto.ResponseAnimalDto;
import com.e202.dogcatdang.streaming.dto.ResponseDto;
import com.e202.dogcatdang.streaming.dto.ResponseStreamingDto;

public interface StreamingService {
	ResponseDto startStreaming(Long loginUserId, RequestStreamingDto requestStreamingDto);

	List<ResponseStreamingDto> find();

	ResponseStreamingDto findByStreamingId(Long streamingId);

	List<ResponseAnimalDto> getAnimalList(Long streamingId);

	ResponseDto delete(Long loginUserId, Long streamingId);
}
