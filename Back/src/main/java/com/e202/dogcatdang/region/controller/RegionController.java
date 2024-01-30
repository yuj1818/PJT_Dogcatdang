package com.e202.dogcatdang.region.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.e202.dogcatdang.db.entity.Region;
import com.e202.dogcatdang.region.service.RegionService;

@RestController
@RequestMapping("/api/regions")
public class RegionController {

	private RegionService regionService;

	// public ResponseEntity<List<Region>> searchRegions(@RequestParam String city) {
	// 	List<Region> regions = regionService.getRegionsByCity(city);
	// 	return ResponseEntity.ok(regions);
	// }
}
