package com.e202.dogcatdang.notification.controller;


import com.e202.dogcatdang.notification.dto.NotificationListResponseDto;
import com.e202.dogcatdang.notification.dto.NotificationRequestDto;
import com.e202.dogcatdang.notification.dto.NotificationResponseDto;
import com.e202.dogcatdang.notification.service.NotificationService;
import com.e202.dogcatdang.user.jwt.JWTUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/notification")
public class NotificationController {


    private final NotificationService notificationService;
    private final JWTUtil jwtUtil;
    public NotificationController(NotificationService notificationService, JWTUtil jwtUtil) {
        this.notificationService = notificationService;
        this.jwtUtil = jwtUtil;
    }

    //메시지 보내기.
    @PostMapping("/send")
    public ResponseEntity<NotificationResponseDto> sendNotification(@RequestHeader("Authorization") String token,
                                                                    @RequestBody NotificationRequestDto requestDTO) {
        // "Bearer " 접두사를 제거한 후 토큰에서 senderId 추출
        String authToken = token.substring(7);
        Long senderId = jwtUtil.getUserId(authToken);

        // senderId를 서비스 메소드에 전달
        NotificationResponseDto responseDTO = notificationService.sendNotification(senderId, requestDTO);
        return ResponseEntity.ok(responseDTO);
    }
    // 받은 메시지 목록 조회
    @GetMapping("/received")
    public ResponseEntity<List<NotificationListResponseDto>> getReceivedNotifications(@RequestHeader("Authorization") String token) {
        List<NotificationListResponseDto> notifications = notificationService.getReceivedNotifications(token);
        return ResponseEntity.ok(notifications);
    }

    // 안 읽은 메시지 개수 조회
    @GetMapping("/unread/count")
    public ResponseEntity<Long> countUnreadNotifications(@RequestHeader("Authorization") String token) {
        long count = notificationService.countUnreadNotifications(token);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/details/{notificationId}")
    public ResponseEntity<NotificationListResponseDto> getNotificationDetails(@PathVariable("notificationId") Long notificationId) {
        NotificationListResponseDto notificationDetails = notificationService.getNotificationDetails(notificationId);
        return ResponseEntity.ok(notificationDetails);
    }

}
