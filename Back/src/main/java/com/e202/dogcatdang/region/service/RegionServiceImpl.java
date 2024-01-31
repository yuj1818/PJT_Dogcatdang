package com.e202.dogcatdang.region.service;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.e202.dogcatdang.db.repository.AnimalRepository;
import com.e202.dogcatdang.db.repository.RegionRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegionServiceImpl implements RegionService{

	private final RegionRepository regionRepository;
	// private final AnimalRepository animalRepository;


	@Override
	public List<String> findAllCities() {
		return regionRepository.findAllCities();
	}

	@Override
	public List<String> findDistrictsByCity(String city) {
		return regionRepository.findDistrictsByCity(city);
	}



}
