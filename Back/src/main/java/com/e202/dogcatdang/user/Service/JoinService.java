package com.e202.dogcatdang.user.Service;

import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.repository.UserRepository;
import com.e202.dogcatdang.exception.DuplicateEmailException;
import com.e202.dogcatdang.user.dto.JoinDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JoinService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public JoinService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Transactional
    public void joinUser(JoinDTO joinDTO) {
        String username = joinDTO.getUsername();
        String password = joinDTO.getPassword();
        String role = joinDTO.getRole();
        String phone = joinDTO.getPhone();
        String email = joinDTO.getEmail();
        String address = joinDTO.getAddress();
        String nickname = joinDTO.getNickname();


        Boolean isExistUsername = userRepository.existsByUsername(username);
        Boolean isExistEmail = userRepository.existsByEmail(email);
//        Boolean isExistPhone = userRepository.existsByPhone(phone);
        Boolean isExistNickname = userRepository.existsByNickname(nickname);


        //중복 검사
        if(isExistUsername || isExistEmail || isExistNickname){
            throw new DuplicateEmailException("already exists: " );
        }

        User data = new User();
        data.setUsername(username);
        //data.setUsername(joinDTO.getProviderId());
        if(password != null){
            data.setPassword(bCryptPasswordEncoder.encode(password));
        }else{
            data.setPassword("1234");
        }

        data.setRole(role);
        if(role != null){
            data.setRole(role);
        }else{
            data.setRole("ROLE_USER");
        }
        if(email != null){
            data.setEmail(email);
        }else{
            data.setEmail("imseee@naver.com");
        }

        data.setAddress(address);
        data.setNickname(nickname);
        data.setPhone(phone);

        userRepository.save(data);

    }

    @Transactional
    public boolean isUsernameDuplicate(String username) {
        return userRepository.existsByUsername(username);
    }

    @Transactional
    public boolean isEmailDuplicate(String email) {
        return userRepository.existsByEmail(email);
    }

    @Transactional
    public boolean isNicknameDuplicate(String nickname) {
        return userRepository.existsByNickname(nickname);
    }
}
