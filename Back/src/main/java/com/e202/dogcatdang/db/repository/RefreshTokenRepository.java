package com.e202.dogcatdang.db.repository;

import com.e202.dogcatdang.db.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    void deleteByToken(String token);

    Optional<RefreshToken> findByUserId(Long id);
}
