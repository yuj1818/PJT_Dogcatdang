package com.e202.dogcatdang.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.db.entity.BoardImage;

@Repository
public interface BoardImageRepository extends JpaRepository<BoardImage, Long> {
}
