package backend.tour.dto;

import jakarta.persistence.Column;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import java.io.Serializable;
import java.time.Instant;

@Data
public class UserDTO implements Serializable {
    private Long id;
    private String username;
    private String email;
    private String password;
    private String role;
    private Instant createdAt;
}
