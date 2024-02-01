package com.e202.dogcatdang.lostanimal.service;

import java.io.IOException;

import com.e202.dogcatdang.db.entity.LostAnimal;
import com.e202.dogcatdang.lostanimal.dto.RequestLostAnimalDto;
import com.e202.dogcatdang.lostanimal.dto.ResponseLostAnimalDto;
import com.e202.dogcatdang.lostanimal.dto.ResponseSavedIdDto;

public interface LostAnimalService {
	ResponseSavedIdDto save(RequestLostAnimalDto requestLostAnimalDto, String token) throws IOException;


	ResponseLostAnimalDto findById(Long lostAnimalId);

	LostAnimal update(Long lostAnimalId, RequestLostAnimalDto requestLostAnimalDto) throws IOException;
}
