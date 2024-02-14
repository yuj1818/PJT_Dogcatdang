package com.e202.dogcatdang.streaming.service;



import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.AnimalLike;
import com.e202.dogcatdang.db.entity.Notification;
import com.e202.dogcatdang.db.entity.Streaming;
import com.e202.dogcatdang.db.entity.StreamingAnimal;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.AnimalLikeRepository;
import com.e202.dogcatdang.db.repository.AnimalRepository;
import com.e202.dogcatdang.db.repository.NotificationRepository;
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
	private final AnimalLikeRepository animalLikeRepository;
	private final NotificationRepository notificationRepository;
	private final AnimalRepository animalRepository;

	@Override
	@Transactional
	public Long startStreaming(Long loginUserId, RequestStreamingDto requestStreamingDto) {
		User loginUser = userRepository.findById(loginUserId).get();



		Streaming streaming = requestStreamingDto.toEntity(loginUser);
		Long streamingId = streamingRepository.save(streaming).getStreamingId();
		
		//동물 id 리스트에서 해당 동물을 즐겨찾기한 유저에 대해 알림 전송
		for(Long id : requestStreamingDto.getAnimalInfo()){
			List<AnimalLike> animalLikeList = animalLikeRepository.findByAnimalAnimalId(id);
			for (AnimalLike animalLike : animalLikeList) {
				User receiver = animalLike.getUser();
				User sender = animalLike.getAnimal().getUser();
				String title = animalLike.getAnimal().getCode()+"에 대한 방송이 시작되었습니다.";
				String content = "<a href=\"http://localhost:5173/\">방송 바로가기(임시로 메인으로 가게 헀습니다.)</a>";
				Notification notification = Notification.builder()
					.receiver(receiver)
					.sender(sender)
					.title(title)
					.content(content)
					.build();
				notificationRepository.save(notification);
			}

			Animal animal = animalRepository.findById(id).get();
			StreamingAnimal streamingAnimal = StreamingAnimal.builder()
				.streaming(streaming)
				.animal(animal)
				.build();
			streamingAnimalRepository.save(streamingAnimal);
			streaming.getAnimalList().add(streamingAnimal);
		}
		return streamingId;
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
	@Transactional
	public ResponseDto delete(Long loginUserId, String sessionId) {



		Streaming streaming = streamingRepository.findBySessionId(sessionId);

		if(streaming.getUser().getId()!=loginUserId){
			return new ResponseDto(403L, "유효하지 않은 요청입니다.");
		}

		streamingRepository.delete(streaming);

		return new ResponseDto(200L,"성공");
	}
}
