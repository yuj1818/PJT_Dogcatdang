package com.e202.dogcatdang.db.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "board")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Board {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long boardId;
	private int code;
	private String title;
	private String content;
	private LocalDateTime createTime;
	private boolean isSaved;

	@OneToMany(mappedBy = "board")
	private List<BoardImage> imageEntityList;

	//일단 id 저장하고 나중에 userEntity로 바꿔줘야 함.
	private Long userId;

}
