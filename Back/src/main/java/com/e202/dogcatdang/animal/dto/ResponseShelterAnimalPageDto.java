package com.e202.dogcatdang.animal.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResponseShelterAnimalPageDto {

	private List<ResponseShelterAnimalDto> animalDtoList;
	private int totalPages;
	private int currentPage;
	private long totalElements;
	private boolean hasNextPage;
	private boolean hasPreviousPage;
}
