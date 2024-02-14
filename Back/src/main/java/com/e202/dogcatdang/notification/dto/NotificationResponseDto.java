package com.e202.dogcatdang.notification.dto;

import com.e202.dogcatdang.db.entity.Notification;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class NotificationResponseDto {
    private  Long id;
    private  Long senderId;
    // 수신자 이메일 추가
    private  Long receiverId;
    private String senderNickname;
    private String receiverNickname;
    private  String title;
    private  String content;
    private  LocalDateTime sentDate;

    // isRead 필드에 대한 명시적인 JsonProperty와 Getter 정의
    @JsonProperty("isRead")
    private boolean isRead;
    // isRead 필드에 대한 명시적인 Getter 메소드
    // @JsonProperty("isRead")와 함께 사용하여 JSON 필드명을 "isRead"로 지정
    public boolean isIsRead() {
        return isRead;
    }

    // 다른 필드들에 대한 Getter 메소드는 @Getter 어노테이션에 의해 자동 생성됨
    // 추가적인 명시적 Getter 메소드는 필요하지 않음


    // Notification 엔티티를 NotificationResponseDTO로 변환
    public static NotificationResponseDto fromEntity(Notification notification) {
        return NotificationResponseDto.builder()
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