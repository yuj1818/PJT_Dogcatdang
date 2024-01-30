package com.e202.dogcatdang.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.db.entity.Region;

@Repository
public interface RegionRepository extends JpaRepository<Region, String> {



	// List<Region> findByCity(String city);
}
