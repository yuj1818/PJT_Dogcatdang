package com.e202.dogcatdang.s3.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.e202.dogcatdang.s3.dto.ResponseS3Dto;
import com.e202.dogcatdang.s3.service.S3Service;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/images")
public class S3Controller {

	private final S3Service s3Service;

	// presigned url 요청 api
	@GetMapping("/presigned/upload")
	public ResponseS3Dto getPresignedUrlToUpload(@RequestParam(value = "filename") String fileName) throws IOException {
		return s3Service.getPresignedUrlToUpload(fileName);
	}

	// @GetMapping("/presigned/download")
	// public ResponseS3Dto getPresignedUrlToDownload(@RequestParam(value = "filename") String fileName) throws IOException {
	// 	return s3Service.getPresignedUrlToDownload(fileName);
	// }

	// 단일 이미지 파일 업로드
	// @PostMapping("/upload")
	// public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
	// 	try {
	// 		String imageUrl = s3Service.uploadFile(file);
	// 		return ResponseEntity.ok("Image uploaded successfully. Image URL: " + imageUrl);
	// 	} catch (Exception e) {
	// 		return ResponseEntity.status(500).body("Image upload failed: " + e.getMessage());
	// 	}
	// }
}
