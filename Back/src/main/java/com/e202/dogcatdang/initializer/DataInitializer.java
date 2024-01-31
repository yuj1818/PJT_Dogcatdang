package com.e202.dogcatdang.initializer;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.e202.dogcatdang.region.TsvReader;

@Component
public class DataInitializer implements CommandLineRunner {

	private final TsvReader tsvReader;

	public DataInitializer(TsvReader tsvReader) {
		this.tsvReader = tsvReader;
	}

	@Override
	public void run(String... args) throws Exception {
		tsvReader.readAndSaveToDb();
	}
}
