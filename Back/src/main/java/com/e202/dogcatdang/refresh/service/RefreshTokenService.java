package com.e202.dogcatdang.refresh.service;

import com.e202.dogcatdang.db.entity.RefreshToken;
import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.RefreshTokenRepository;
import com.e202.dogcatdang.db.repository.UserRepository;
import jakarta.persistence.EntityManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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


    @Transactional
    public RefreshToken createRefreshToken(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + userId));

        Optional<RefreshToken> existingToken = refreshTokenRepository.findByUserId(user.getId());

        final RefreshToken refreshToken;
        if (existingToken.isPresent()) {
            // 기존 토큰이 있으면 업데이트
            refreshToken = existingToken.get();
        } else {
            // 기존 토큰이 없으면 새로 생성
            refreshToken = new RefreshToken();
            refreshToken.setUser(user); // User 엔티티 설정
        }
        refreshToken.setToken(UUID.randomUUID().toString()); // 랜덤 UUID를 토큰 값으로 사용
        Instant expiryDate = Instant.now().plusSeconds(12 * 60 * 60); // 12시간을 초로 환산하여 만료 시간 설정
        // Instant expiryDate = Instant.now().plusSeconds(30); // 12시간을 초로 환산하여 만료 시간 설정
        refreshToken.setExpiryDate(expiryDate);

        System.out.println("user.getId : " + user.getId());
        System.out.println("save 시작");
        refreshTokenRepository.save(refreshToken);

        return refreshToken;

    }

//    @Transactional
//    public Optional<RefreshToken> validateRefreshToken(String token) {
//        return refreshTokenRepository.findByToken(token)
//                .filter(refreshToken -> refreshToken.getExpiryDate().isAfter(Instant.now()));
//
//    }
@Transactional
public Optional<RefreshToken> validateRefreshToken(String token) {
    Logger logger = LoggerFactory.getLogger(this.getClass());
    logger.info("Validating refresh token: {}", token);

    Optional<RefreshToken> refreshTokenOptional = refreshTokenRepository.findByToken(token);
    if (!refreshTokenOptional.isPresent()) {
        logger.warn("Refresh token not found in database: {}", token);
        return Optional.empty();
    }

    RefreshToken refreshToken = refreshTokenOptional.get();
    if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
        logger.warn("Refresh token is expired: {}", token);
        return Optional.empty();
    }

    logger.info("Refresh token is valid: {}", token);
    return Optional.of(refreshToken);
}

    @Transactional
    public void deleteRefreshToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }
}
