package backend.tour.repository;

import backend.tour.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository <UserEntity, Long> {

    @Query(value = "SELECT * FROM users ORDER BY id DESC LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<UserEntity> getUser(Integer offset, Integer limit);

    UserEntity findFirstByEmail(String email);

}
