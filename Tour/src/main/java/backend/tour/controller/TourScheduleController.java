package backend.tour.controller;

import backend.tour.entity.TourScheduleEntity;
import backend.tour.service.TourScheduleService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tour-schedules")
public class TourScheduleController {
    @Autowired
    TourScheduleService tourScheduleService;

    @GetMapping("/tour/{tourId}")
    public ResponseEntity<?> getSchedulesByTourId(@PathVariable Long tourId) {
        return ResponseEntity.ok(tourScheduleService.getSchedulesByTourId(tourId));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createSchedule(@RequestBody TourScheduleEntity tourScheduleDTO) {
        tourScheduleService.createSchedule(tourScheduleDTO);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateSchedule(@RequestBody TourScheduleEntity tourScheduleDTO) {
        tourScheduleService.updateSchedule(tourScheduleDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSchedule(@PathVariable Long id) {
        tourScheduleService.deleteSchedule(id);
        return ResponseEntity.ok().build();
    }

}
