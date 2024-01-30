package com.e202.dogcatdang.region;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedHashSet;
import java.util.Set;

import com.e202.dogcatdang.db.entity.Region;
import com.e202.dogcatdang.db.repository.RegionRepository;

@Component
public class TsvReader {

	private final RegionRepository regionRepository;

	@Autowired
	public TsvReader(RegionRepository regionRepository) {
		this.regionRepository = regionRepository;
	}

	@Transactional
	public void readAndSaveToDb() throws IOException {
		// Resource 객체를 사용하여 classpath 내 리소스 파일을 가져옴
		Resource resource = (Resource)new ClassPathResource("administrationCode.tsv");

		Set<String> uniqueRegions = new LinkedHashSet<>(); // 순서를 보장하면서 중복 체크용 Set

		try (BufferedReader reader = new BufferedReader(new InputStreamReader(resource.getInputStream()))) {
			String line;

			// 헤더 읽기 생략
			reader.readLine();

			while ((line = reader.readLine()) != null) {
				String[] fields = line.split("\t");

				String city = fields[1];
				String district = fields[2];

				String regionKey = city + district;

				// 중복 체크
				// 시군구명이 5글자 이상인지 체크 (경기도	수원시 장안구	와 같은 경우 시까지만 저장하기 위해서임)
				// 시도명이 출장소로 끝나는 것 제외
				// 시군구가 아닌 '읍', '면', '동' 제외
				if (city.endsWith("출장소") || uniqueRegions.contains(regionKey) || district.length() >= 5 || district.endsWith("읍") || district.endsWith("면") || district.endsWith("동")) {
					// System.out.println("안 넣습니다" + regionKey);
					// 중복된 경우 건너뜀
					continue;
				}

				Region region = new Region();
				region.setCity(city);
				region.setDistrict(district);

				regionRepository.save(region);

				// 중복 체크용 Set에 추가
				uniqueRegions.add(regionKey);
			}
		}
	}
}
