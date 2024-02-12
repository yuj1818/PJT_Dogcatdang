package com.e202.dogcatdang.db.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "streaming")
public class Streaming {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "streaming_id")
	private Long streamingId;

	// 방송 영상 세션 아이디
	@Column(name = "session_id", nullable = false)
	private String sessionId;

	@Column(name = "title")
	private String title;

	@Column(name = "description")
	private String description;

	@Column(name = "start_time")
	private LocalDateTime startTime;

	// 1명의 user는 여러 개의 방송을 등록할 수 있다.
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@OneToMany(mappedBy = "streaming")
	@Builder.Default
	List<StreamingAnimal> animalList = new ArrayList<>();

}
