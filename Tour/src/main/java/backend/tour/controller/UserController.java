package backend.tour.controller;

import backend.tour.config.JwtUtil;
import backend.tour.dto.UserDTO;
import backend.tour.entity.UserEntity;
import backend.tour.service.CustomUserDetailService;
import backend.tour.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody UserEntity userDTO) {
        userService.createUser(userDTO);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUser(UserEntity userDTO) {
        userService.updateUser(userDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/page/{page}")
    public ResponseEntity<?> getUser(@PathVariable Integer page){
        return ResponseEntity.ok(userService.getUser(page));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO dto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );

        final UserDetails userDetails = customUserDetailService.loadUserByUsername(dto.getEmail());
        final String token = jwtUtil.generateToken(userDetails.getUsername());

        return ResponseEntity.ok(new JwtResponse(token));
    }

    @GetMapping("/current-user/{username}")
    public ResponseEntity<?> getCurrentUser(@PathVariable String username) {
        return ResponseEntity.ok(userService.getCurrentUser(username));
    }

    @Data
    @AllArgsConstructor
    class JwtResponse {
        private String token;
    }
}
