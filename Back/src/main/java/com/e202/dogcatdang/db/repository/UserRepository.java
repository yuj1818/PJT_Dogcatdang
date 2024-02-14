package com.e202.dogcatdang.db.repository;

import com.e202.dogcatdang.db.entity.User;
import com.e202.dogcatdang.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    //이미 등록된 회원인지 체크

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean existsByNickname(String nickname);

    @Query("SELECT u.email FROM User u WHERE u.id = :id")
    String findEmailById(@Param("id") Long id);

    User findByUsername(String username);

//    User findByEmail(String email);

    Optional<User> findByEmail(String email);


    @Query("SELECT u.nickname FROM User u WHERE u.id = :id")
    String findNicknameById(@Param("id") Long id);
}
