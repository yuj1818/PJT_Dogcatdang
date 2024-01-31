package com.e202.dogcatdang.user.Service;

import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.user.dto.UserProfileDTO;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class UserProfileService {
    private final UserRepository userRepository;


    public UserProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserProfileDTO getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        UserProfileDTO userProfileDTO = new UserProfileDTO();
        userProfileDTO.setId(user.getId());
        userProfileDTO.setUsername(user.getUsername());
        userProfileDTO.setEmail(user.getEmail());
        userProfileDTO.setNickname(user.getNickname());
        userProfileDTO.setAddress(user.getAddress());
        userProfileDTO.setPhone(user.getPhone());
        userProfileDTO.setBio(user.getBio());
        userProfileDTO.setImgName(user.getImg_name());
        userProfileDTO.setImgUrl(user.getImg_url());
        userProfileDTO.setRole((user.getRole()));

        return userProfileDTO;
    }

    public User updateUserProfile(Long userId, UserProfileDTO userProfileDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        // 유저 프로필 정보 업데이트
        user.setUsername(userProfileDTO.getUsername());
        user.setPassword(userProfileDTO.getPassword());
        user.setEmail(userProfileDTO.getEmail());
        user.setNickname(userProfileDTO.getNickname());
        user.setAddress(userProfileDTO.getAddress());
        user.setPhone(userProfileDTO.getPhone());
        user.setBio(userProfileDTO.getBio());
        user.setImg_name(userProfileDTO.getImgName());
        user.setImg_url(userProfileDTO.getImgUrl());
        user.setRole(userProfileDTO.getRole());

        // 업데이트된 유저 정보 저장
        userRepository.save(user);
        return user;
    }
}

