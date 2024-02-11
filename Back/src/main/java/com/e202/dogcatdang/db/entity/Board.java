package com.e202.dogcatdang.db.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.Array;
import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Table(name = "board")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Board {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long boardId;
	private int code;
	private String title;

	@Lob
	@Column(columnDefinition = "text")
	private String content;
	private LocalDateTime createTime;

	@Column(columnDefinition = "TINYINT(1)")
	private boolean isSaved;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	private String thumbnailImgUrl;

	@OneToMany(mappedBy = "board")
	@Builder.Default
	private List<BoardLike> boardLikeList = new ArrayList<>();

	public void updateTitle(String newTitle) {
		this.title = newTitle;
	}

	public void updateContent(String newContent) {
		this.content = newContent;
	}


}
