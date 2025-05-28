package backend.tour.dto;


import jakarta.persistence.Column;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;

@Data
public class TourScheduleDTO implements Serializable {
    private Long id;
    private Long tourId;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer availableSlots;
}
