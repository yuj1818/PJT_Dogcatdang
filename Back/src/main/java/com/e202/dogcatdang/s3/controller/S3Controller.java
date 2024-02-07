package com.e202.dogcatdang.s3.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e202.dogcatdang.s3.service.S3Service;

@RestController
@RequestMapping("/api/images")
public class S3Controller {

	@Autowired
	private S3Service s3Service;

	@PostMapping("/upload")
	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
		try {
			String imageUrl = s3Service.uploadFile(file);
			return ResponseEntity.ok("Image uploaded successfully. Image URL: " + imageUrl);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Image upload failed: " + e.getMessage());
		}
	}
}
