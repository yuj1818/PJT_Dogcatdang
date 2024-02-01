package com.e202.dogcatdang.lostanimal.service;

import java.io.IOException;

import com.e202.dogcatdang.lostanimal.dto.RequestLostAnimalDto;
import com.e202.dogcatdang.lostanimal.dto.ResponseSavedIdDto;

public interface LostAnimalService {
	ResponseSavedIdDto save(RequestLostAnimalDto requestLostAnimalDto, String token) throws IOException;
}
