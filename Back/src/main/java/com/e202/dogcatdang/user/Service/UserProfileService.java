package com.e202.dogcatdang.user.Service;

import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.user.dto.UserProfileDTO;
import io.jsonwebtoken.security.Password;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class UserProfileService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserProfileService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Transactional
    public UserProfileDTO getUserProfile(Long userId) {
        System.out.println("잘 호출하니 getUserProfile service");
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

    @Transactional
    public User updateUserProfile(Long userId, UserProfileDTO userProfileDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));

        // 유저 프로필 정보 업데이트
        //변경 안하는 값은 그대로
        if(userProfileDTO.getUsername() != null){
            user.setUsername(userProfileDTO.getUsername());
        }

        if(userProfileDTO.getPassword() != null){
            String password = userProfileDTO.getPassword();
            user.setPassword(bCryptPasswordEncoder.encode(password));
        }
        if(userProfileDTO.getEmail() != null){
            user.setEmail(userProfileDTO.getEmail());
        }

        if(userProfileDTO.getNickname() != null){
            user.setNickname(userProfileDTO.getNickname());
        }

        if(userProfileDTO.getAddress() != null){
            user.setAddress(userProfileDTO.getAddress());
        }

        if(userProfileDTO.getPhone() != null){
            user.setPhone(userProfileDTO.getPhone());
        }

        if(userProfileDTO.getBio() != null){
            user.setBio(userProfileDTO.getBio());
        }

        if(userProfileDTO.getImgName() != null){
            user.setImg_name(userProfileDTO.getImgName());
        }

        if(userProfileDTO.getImgUrl() != null){
            user.setImg_url(userProfileDTO.getImgUrl());
        }

        if(userProfileDTO.getRole() != null){
            user.setRole(userProfileDTO.getRole());
        }

        // 업데이트된 유저 정보 저장
        userRepository.save(user);
        return user;
    }

    @Transactional
    public User findById(Long userId) {
        return userRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 회원 아이디입니다."));
    }

    // 회원 탈퇴 메소드
    @Transactional
    public void deleteUser(Long userId) {
        // 사용자가 존재하는지 확인
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // 사용자를 삭제하거나 사용자 상태를 변경하는 등의 작업을 수행할 수 있습니다.
            userRepository.deleteById(user.getId());
        } else {
            throw new NoSuchElementException("User not found with ID: " + userId);
        }
    }
}

