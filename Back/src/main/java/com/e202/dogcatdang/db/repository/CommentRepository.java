package com.e202.dogcatdang.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.db.entity.Animal;
import com.e202.dogcatdang.db.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {

	@Query("SELECT c FROM Comment c WHERE c.board.boardId = :boardId")
	List<Comment> findByBoardId(@Param("boardId") Long boardId);
}
