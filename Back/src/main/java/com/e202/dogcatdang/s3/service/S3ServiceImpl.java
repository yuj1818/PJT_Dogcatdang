package com.e202.dogcatdang.s3.service;

import java.io.IOException;
import java.util.Date;
import java.util.TimeZone;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.e202.dogcatdang.s3.dto.ResponseS3Dto;
import com.e202.dogcatdang.s3.service.S3Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

	private final AmazonS3 amazonS3;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	// 파일 업로드를 위한 presignedUrl 요청
	@Override
	public ResponseS3Dto getPresignedUrlToUpload(String fileName) {
		// 현재 시간을 기준으로 30분 후의 시간을 얻습니다.
		Date expiration = new Date(System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(30));

		// 한국 시간대로 변경합니다.
		TimeZone timeZone = TimeZone.getTimeZone("Asia/Seoul");
		expiration.setTime(expiration.getTime() + timeZone.getRawOffset());

		GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucket, fileName)
			.withMethod(HttpMethod.PUT)
			.withExpiration(expiration);

		return ResponseS3Dto.builder()
			.url(amazonS3.generatePresignedUrl(generatePresignedUrlRequest).toString())
			.build();
	}

	// 파일 다운로드를 위한 presignedUrl 요청
	// @Override
	// public ResponseS3Dto getPresignedUrlToDownload(String fileName) {
	// 	Date expiration = new Date();
	// 	long expTime = expiration.getTime();
	// 	expTime += TimeUnit.MINUTES.toMillis(15);
	// 	expiration.setTime(expTime); // 3 Minute
	//
	// 	GeneratePresignedUrlRequest generatePresignedUrlRequest = new GeneratePresignedUrlRequest(bucket, fileName)
	// 		.withMethod(HttpMethod.PUT)
	// 		.withExpiration(expiration);
	//
	// 	return ResponseS3Dto.builder()
	// 		.url(amazonS3.generatePresignedUrl(generatePresignedUrlRequest).toString())
	// 		.build();
	// }


	// 파일 업로드 - 백에서 파일을 받아 서버에 저장하고 다시 돌려주는 방식
	// public String uploadFile(MultipartFile multipartFile) throws IOException {
	// 	// UUID를 사용하여 유니크한 파일명 생성
	// 	String originalFilename = UUID.randomUUID().toString();
	//
	// 	ObjectMetadata metadata = new ObjectMetadata();
	// 	metadata.setContentLength(multipartFile.getSize());
	// 	metadata.setContentType(multipartFile.getContentType());
	//
	// 	amazonS3.putObject(bucket, originalFilename, multipartFile.getInputStream(), metadata);
	// 	return amazonS3.getUrl(bucket, originalFilename).toString();
	// }


	// 파일 다운로드
	// public ResponseEntity<UrlResource> downloadFile(String originalFilename) {
	// 	UrlResource urlResource = new UrlResource(amazonS3.getUrl(bucket, originalFilename));
	// 	String contentDisposition = "attachment; filename=\"" +  originalFilename + "\"";
	//
	// 	// header에 CONTENT_DISPOSITION 설정을 통해 클릭 시 다운로드 진행
	// 	return ResponseEntity.ok()
	// 		.header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
	// 		.body(urlResource);
	//
	// }

	// // 파일 삭제
	// public void deleteFile(String originalFilename)  {
	// 	amazonS3.deleteObject(bucket, originalFilename);
	// }



}
