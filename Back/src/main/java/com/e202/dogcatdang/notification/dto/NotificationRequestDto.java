package com.e202.dogcatdang.notification.dto;

import com.e202.dogcatdang.db.entity.Notification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
public class NotificationRequestDto {

    private  Long senderId;
    private  String receiverEmail;
    private  String title;
    private  String content;

    public NotificationRequestDto(Long senderId, String receiverEmail, String title, String content) {
        this.senderId = senderId;
        this.receiverEmail = receiverEmail;
        this.title = title;
        this.content = content;
    }
}

