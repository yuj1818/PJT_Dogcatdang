package com.e202.dogcatdang.db.repository;

import java.util.List;

import com.e202.dogcatdang.db.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.e202.dogcatdang.board.dto.ResponseBoardBestDto;
import com.e202.dogcatdang.board.dto.ResponseBoardSummaryDto;
import com.e202.dogcatdang.db.entity.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long>, JpaSpecificationExecutor<Board> {

	// 좋아요 순으로 내림차순 정렬해 엔티티 조회
	@Query("SELECT new com.e202.dogcatdang.board.dto.ResponseBoardBestDto(b) " +
		"FROM Board b " +
		"ORDER BY size(b.boardLikeList) DESC")
	List<ResponseBoardBestDto> findTop5ByOrderByLikeCntDesc(Pageable pageable);

    List<Board> findByUser(User loginUser);
}
