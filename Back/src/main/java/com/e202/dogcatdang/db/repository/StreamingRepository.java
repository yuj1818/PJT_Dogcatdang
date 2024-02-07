package com.e202.dogcatdang.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.db.entity.Streaming;

@Repository
public interface StreamingRepository extends JpaRepository<Streaming, Long> {
}
