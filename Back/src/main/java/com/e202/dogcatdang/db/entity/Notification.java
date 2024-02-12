package com.e202.dogcatdang.db.entity;

import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;

@Entity
@Getter

@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "send_user_id")
    private User sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receive_user_id")
    private User receiver;

    private String title;
    private String content;

    @Column(name = "sent_date")
    private LocalDateTime sentDate;

    @Column(name = "is_read")
    private boolean isRead;

}
