package com.e202.dogcatdang.db.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StreamingAnimal {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "streaming_animal_id")
	private Long streamingAnimalId;

	@ManyToOne
	@JoinColumn(name = "streaming_id")
	private Streaming streaming;

	@ManyToOne
	@JoinColumn(name = "animal_id")
	private Animal animal;
}
