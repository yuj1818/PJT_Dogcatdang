package com.e202.dogcatdang.s3.service;

import java.io.IOException;

import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.e202.dogcatdang.s3.dto.ResponseS3Dto;

public interface S3Service {

		// String uploadFile(MultipartFile multipartFile) throws IOException;
		// ResponseEntity<UrlResource> downloadFile(String originalFilename);
		// void deleteFile(String originalFilename);

		ResponseS3Dto getPresignedUrlToUpload(String fileName);

		// ResponseS3Dto getPresignedUrlToDownload(String fileName);
}
