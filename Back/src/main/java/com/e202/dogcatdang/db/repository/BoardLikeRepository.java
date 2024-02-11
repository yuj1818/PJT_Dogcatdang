package com.e202.dogcatdang.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.db.entity.BoardLike;

@Repository
public interface BoardLikeRepository extends JpaRepository<BoardLike, Long> {

	boolean existsByBoardBoardIdAndUserId(Long boardId, Long userId);

	BoardLike findByBoardBoardIdAndUserId(Long boardId, Long loginUserId);
}
