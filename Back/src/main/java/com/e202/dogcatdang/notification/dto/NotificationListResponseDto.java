package com.e202.dogcatdang.notification.dto;

import com.e202.dogcatdang.db.entity.Notification;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class NotificationListResponseDto {
    private  Long id;
    private Long senderId;
    private Long receiverId;
    private  String senderNickname;
    // 수신자 이메일 추가
    private String receiverNickname;
    private  String title;
    private  String content;
    private  LocalDateTime sentDate;

    // isRead 필드에 대한 명시적인 JsonProperty와 Getter 정의
    @JsonProperty("isRead")
    private boolean isRead;


    public boolean isIsRead() {
        return isRead;
    }

    // 다른 필드들에 대한 Getter 메소드는 @Getter 어노테이션에 의해 자동 생성됨
    // 추가적인 명시적 Getter 메소드는 필요하지 않음

    // Notification 엔티티를 NotificationResponseDTO로 변환
    public static NotificationListResponseDto fromEntity(Notification notification) {
        return NotificationListResponseDto.builder()
                .id(notification.getId())
                .senderId(notification.getSender().getId())
                .receiverId(notification.getReceiver().getId())
                .senderNickname(notification.getSender().getNickname())
                .receiverNickname(notification.getReceiver().getNickname())
                .title(notification.getTitle())
                .content(notification.getContent())
                .sentDate(notification.getSentDate())
                .isRead(notification.isRead())
                .build();
    }
}