package com.e202.dogcatdang.region.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<List<String>> findAllCities() {
		List<String> cities = regionService.findAllCities();
		return new ResponseEntity<>(cities, HttpStatus.OK);
	}

	@GetMapping("districts")
	public ResponseEntity<List<String>> findDistrictsByCity(@RequestParam String city) {
		List<String> districts = regionService.findDistrictsByCity(city);
		return new ResponseEntity<>(districts, HttpStatus.OK);
	}
}
