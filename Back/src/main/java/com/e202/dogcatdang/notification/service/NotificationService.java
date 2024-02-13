package com.e202.dogcatdang.notification.service;

import com.e202.dogcatdang.db.entity.Notification;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.NotificationRepository;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.notification.dto.NotificationListResponseDto;
import com.e202.dogcatdang.notification.dto.NotificationRequestDto;
import com.e202.dogcatdang.notification.dto.NotificationResponseDto;
import com.e202.dogcatdang.user.jwt.JWTUtil;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    private final JWTUtil jwtUtil;
    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository, JWTUtil jwtUtil) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public NotificationResponseDto sendNotification(Long senderId, NotificationRequestDto requestDto) {
        System.out.println("send 서비스 시작");
        // 발신자 ID로부터 User 엔티티를 조회합니다.
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        // 이메일로 수신자 조회
        User receiver = userRepository.findByEmail(requestDto.getReceiverEmail())
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        // Notification 엔티티를 생성하고 저장합니다.
        // Notification 객체 생성 및 저장
        System.out.println("sendId : " + senderId);
        System.out.println("receiver : " + receiver);
        System.out.println("title : " + requestDto.getTitle());
        System.out.println("content : " + requestDto.getContent());
        Notification notification = Notification.builder()
                .sender(sender)
                .receiver(receiver)
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .sentDate(LocalDateTime.now()) // 현재 시간으로 발송 날짜 설정
                .isRead(false) // 초기 상태는 읽지 않음(false)
                .build();

        notification = notificationRepository.save(notification); // DB에 저장

        // 저장된 Notification 객체로부터 ResponseDTO 생성
        return NotificationResponseDto.builder()
                .id(notification.getId())
                .senderId(sender.getId())
                .receiverEmail(receiver.getEmail())
                .title(notification.getTitle())
                .content(notification.getContent())
                .sentDate(notification.getSentDate())
                .isRead(notification.isRead())
                .build();

    }

    // 받은 메시지 목록 조회
    @Transactional
    public List<NotificationListResponseDto> getReceivedNotifications(String token) {
        Long userId = jwtUtil.getUserId(token.substring(7)); // JWT에서 userId 추출
        User receiver = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Notification> notifications = notificationRepository.findByReceiverId(receiver.getId());
        return notifications.stream()
                .map(notification -> {
                    String senderEmail = userRepository.findEmailById(notification.getSender().getId()); // 발신자의 이메일 조회
                    return NotificationListResponseDto.builder()
                            .id(notification.getId())
                            .senderEmail(senderEmail) // 조회된 발신자 이메일 설정
                            .receiverEmail(notification.getReceiver().getEmail())
                            .title(notification.getTitle())
                            .content(notification.getContent())
                            .sentDate(notification.getSentDate())
                            .isRead(notification.isRead())
                            .build();
                })
                .collect(Collectors.toList());
    }

    // 안 읽은 메시지 개수 조회
    @Transactional(readOnly = true)
    public long countUnreadNotifications(String token) {
        Long userId = jwtUtil.getUserId(token.substring(7)); // JWT에서 userId 추출
        return notificationRepository.countByReceiverIdAndIsRead(userId, false);
    }

    //상세조회
    @Transactional
    public NotificationListResponseDto getNotificationDetails(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        //읽음 처리.
        if (!notification.isRead()) {
            notification.setRead(true);
            notificationRepository.save(notification); //
        }

        String senderEmail = userRepository.findEmailById(notification.getSender().getId());
        return NotificationListResponseDto.builder()
                .id(notification.getId())
                .senderEmail(senderEmail)
                .receiverEmail(notification.getReceiver().getEmail())
                .title(notification.getTitle())
                .content(notification.getContent())
                .sentDate(notification.getSentDate())
                .isRead(notification.isRead())
                .build();
    }

    //알림 삭제 (한개)
    @Transactional
    public void deleteNotification(Long notificationId, Long userId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        // 사용자 ID 검증: 요청한 사용자가 쪽지의 수신자인지 확인
        if (!notification.getReceiver().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized attempt to delete notification");
        }

        notificationRepository.deleteById(notificationId);
    }


    //쪽지 여러개 삭제
    @Transactional
    public void deleteNotifications(List<Long> notificationIds, Long userId) {
        List<Notification> notificationsToDelete = notificationRepository.findAllById(notificationIds);
        for (Notification notification : notificationsToDelete) {
            if (!notification.getReceiver().getId().equals(userId)) {
                throw new RuntimeException("Unauthorized attempt to delete notification");
            }
        }
        notificationRepository.deleteAll(notificationsToDelete);
    }
}
