package com.e202.dogcatdang.region.service;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.e202.dogcatdang.db.entity.Region;
import com.e202.dogcatdang.db.repository.RegionRepository;
import com.e202.dogcatdang.region.TsvReader;

@Service
public class RegionServiceImpl implements RegionService{

	// private final TsvReader tsvReader;
	// private final RegionRepository regionRepository;
	//
	// @Autowired
	// public RegionServiceImpl(TsvReader tsvReader, RegionRepository regionRepository) {
	// 	this.tsvReader = tsvReader;
	// 	this.regionRepository = regionRepository;
	// }
	//
	// public void saveRegionsFromTsv() {
	// 	try {
	// 		// TSV 파일에서 데이터 읽기
	// 		Set<Region> regionSet = tsvReader.readRegionFromTsv();
	//
	// 		// 읽은 데이터를 MySQL region 테이블에 저장
	// 		regionRepository.saveAll(regionSet);
	// 	} catch (IOException e) {
	// 		e.printStackTrace();
	// 		// 예외 처리 필요
	// 	}
	// }
	//
	// public List<Region> getRegionsByCity(String city) {
	// 	return regionRepository.findByCity(city);
	// }

}
