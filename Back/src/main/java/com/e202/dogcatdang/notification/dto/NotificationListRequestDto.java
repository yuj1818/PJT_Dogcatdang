package com.e202.dogcatdang.notification.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
public class NotificationListRequestDto {

    private  String senderEmail;
    private  String receiverEmail;
    private  String title;
    private  String content;

    public NotificationListRequestDto(String senderEmail, String receiverEmail, String title, String content) {
        this.senderEmail = senderEmail;
        this.receiverEmail = receiverEmail;
        this.title = title;
        this.content = content;
    }
}

