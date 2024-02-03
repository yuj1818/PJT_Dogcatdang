package com.e202.dogcatdang.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.e202.dogcatdang.db.repository.RegionRepository;
import com.e202.dogcatdang.region.TsvReader;

@Component
public class DataInitializer implements CommandLineRunner {

	private final TsvReader tsvReader;
	private final RegionRepository regionRepository;

	public DataInitializer(TsvReader tsvReader, RegionRepository regionRepository) {
		this.tsvReader = tsvReader;
		this.regionRepository = regionRepository;
	}

	@Override
	public void run(String... args) throws Exception {
		// 이미 db에 데이터가 존재하는지 확인
		if (regionRepository.count() == 0) {
			// 초기 데이터가 없을 경우만 추가 저장
			tsvReader.readAndSaveToDb();
		} else {
			System.out.println("지역 데이터가 이미 db에 저장되어 있습니다.");
		}
		
	}
}
