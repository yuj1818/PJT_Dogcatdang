package com.e202.dogcatdang.db.repository;


import com.e202.dogcatdang.db.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    // 받는 사람의 ID로 모든 메시지를 조회
    List<Notification> findByReceiverId(Long receiverId);


    // 읽지 않은 메시지만 조회
    Integer countByReceiverIdAndIsRead(Long receiverId, boolean isRead);

}