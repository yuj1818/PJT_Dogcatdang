package com.e202.dogcatdang.streaming.service;



import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e202.dogcatdang.db.entity.Streaming;
import com.e202.dogcatdang.db.entity.StreamingAnimal;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.StreamingAnimalRepository;
import com.e202.dogcatdang.db.repository.StreamingRepository;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.streaming.dto.RequestStreamingDto;
import com.e202.dogcatdang.streaming.dto.ResponseAnimalDto;
import com.e202.dogcatdang.streaming.dto.ResponseDto;
import com.e202.dogcatdang.streaming.dto.ResponseStreamingDto;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StreamingServiceImpl implements StreamingService{

	private final StreamingRepository streamingRepository;
	private final UserRepository userRepository;
	private final StreamingAnimalRepository streamingAnimalRepository;

	@Override
	public ResponseDto startStreaming(Long loginUserId, RequestStreamingDto requestStreamingDto) {
		User loginUser = userRepository.findById(loginUserId).get();

		List<StreamingAnimal> animalList = new ArrayList<>();
		for(Long id : requestStreamingDto.getAnimalInfo()){
			animalList.add(streamingAnimalRepository.findByAnimalAnimalId(id));
		}


		Streaming streaming = requestStreamingDto.toEntity(loginUser, animalList);
		streamingRepository.save(streaming);
		return new ResponseDto(200L, "성공");
	}

	@Override
	@Transactional
	public List<ResponseStreamingDto> find() {

		List<ResponseStreamingDto> streamingDtoList = new ArrayList<>();
		List<Streaming> streamingList = streamingRepository.findAll();
		for (Streaming streaming : streamingList) {
			streamingDtoList.add(ResponseStreamingDto.builder()
				.streaming(streaming)
				.build());
		}

		return streamingDtoList;
	}

	@Override
	public ResponseStreamingDto findByStreamingId(Long streamingId) {

		Streaming streaming = streamingRepository.findById(streamingId).get();


		ResponseStreamingDto streamingDto = ResponseStreamingDto.builder()
			.streaming(streaming)
			.build();

		return streamingDto;
	}

	@Override
	@Transactional
	public List<ResponseAnimalDto> getAnimalList(Long streamingId) {

		Streaming streaming = streamingRepository.findById(streamingId).get();
		List<ResponseAnimalDto> animalDtoList = new ArrayList<>();

		for (StreamingAnimal streamingAnimal : streaming.getAnimalList()) {
			animalDtoList.add(ResponseAnimalDto.builder().streamingAnimal(streamingAnimal).build());
		}

		return animalDtoList;
	}

	@Override
	public ResponseDto delete(Long loginUserId, String sessionId) {



		Streaming streaming = streamingRepository.findBySessionId(sessionId);

		if(streaming.getUser().getId()!=loginUserId){
			return new ResponseDto(403L, "유효하지 않은 요청입니다.");
		}

		streamingRepository.delete(streaming);

		return new ResponseDto(200L,"성공");
	}
}
