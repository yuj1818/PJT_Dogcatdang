package com.e202.dogcatdang.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.db.entity.Region;

@Repository
public interface RegionRepository extends JpaRepository<Region, String> {

	// region 테이블에서 모든 city 목록을 중복 없이 가져오기
	@Query("SELECT DISTINCT r.city FROM Region r")
	List<String> findAllCities();

	// region 테이블에서 특정 city에 해당하는 district를 중복 없이 가져오기
	@Query("SELECT DISTINCT r.district FROM Region r WHERE r.city = :city")
	List<String> findDistrictsByCity(String city);

}
