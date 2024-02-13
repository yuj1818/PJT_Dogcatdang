package com.e202.dogcatdang.lostanimal.dto;

import java.util.List;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResponseLostAnimalPageDto {

	private List<ResponseLostAnimalListDto> lostAnimalDtoList;
	private int totalPages;
	private int currentPage;
	private long totalElements;
	private boolean hasNextPage;
	private boolean hasPreviousPage;

}
