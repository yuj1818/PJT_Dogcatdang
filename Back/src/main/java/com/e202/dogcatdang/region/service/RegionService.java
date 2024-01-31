package com.e202.dogcatdang.region.service;

import java.util.List;

import com.e202.dogcatdang.db.entity.Region;

public interface RegionService {
	List<String> findAllCities();

	List<String> findDistrictsByCity(String city);

}
