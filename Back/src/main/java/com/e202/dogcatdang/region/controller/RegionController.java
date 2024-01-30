package com.e202.dogcatdang.region.controller;

import java.util.List;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.e202.dogcatdang.region.service.RegionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/regions")
@RequiredArgsConstructor
public class RegionController {

	private final RegionService regionService;

	@GetMapping("/cities")
	public List<String> findAllCities() {
		return regionService.findAllCities();
	}

	@GetMapping("districts")
	public List<String> findDistrictsByCity(@RequestParam String city) {
		return regionService.findDistrictsByCity(city);
	}
}
