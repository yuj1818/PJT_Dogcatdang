package com.e202.dogcatdang.streaming.service;

import com.e202.dogcatdang.streaming.dto.RequestStreamingDto;
import com.e202.dogcatdang.streaming.dto.ResponseDto;

public interface StreamingService {
	ResponseDto startStreaming(Long loginUserId, RequestStreamingDto requestStreamingDto);
}
