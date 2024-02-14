package com.e202.dogcatdang.refresh.service;

import com.e202.dogcatdang.db.entity.RefreshToken;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.RefreshTokenRepository;
import com.e202.dogcatdang.db.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }

    public RefreshToken createRefreshToken(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(user); // User 엔티티 설정
        refreshToken.setToken(UUID.randomUUID().toString()); // 랜덤 UUID를 토큰 값으로 사용

        // Instant를 사용하여 12시간 후를 만료 시간으로 설정
        Instant expiryDate = Instant.now().plusSeconds(12 * 60 * 60); // 12시간을 초로 환산
        refreshToken.setExpiryDate(expiryDate);

        refreshTokenRepository.save(refreshToken);

        return refreshToken;
    }

    public Optional<RefreshToken> validateRefreshToken(String token) {
        return refreshTokenRepository.findByToken(token)
                .filter(refreshToken -> refreshToken.getExpiryDate().isAfter(Instant.now()));

    }

    public void deleteRefreshToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }
}
