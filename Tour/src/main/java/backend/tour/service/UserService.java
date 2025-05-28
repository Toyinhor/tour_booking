package backend.tour.service;

import backend.tour.entity.UserEntity;
import backend.tour.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    private UserEntity DTOToEntity(UserEntity userDTO) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(userDTO.getId());
        userEntity.setUsername(userDTO.getUsername());
        userEntity.setPassword(userDTO.getPassword());
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setRole(userDTO.getRole());
        userEntity.setCreatedAt(userDTO.getCreatedAt());
        return userEntity;
    }

    public void createUser(UserEntity userDTO) {
        UserEntity userEntity = DTOToEntity(userDTO);
        userEntity.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userRepository.save(userEntity);
    }

    public void updateUser(UserEntity userDTO) {
        UserEntity userEntity = DTOToEntity(userDTO);
        userRepository.save(userEntity);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public List<UserEntity> getUser(Integer page){
        Integer offset = page * 6;
        return  userRepository.getUser(offset, 6);
    }

    public UserEntity getCurrentUser(String username) {
        return userRepository.findFirstByEmail(username);
    }

}
