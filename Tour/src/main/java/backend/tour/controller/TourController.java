package backend.tour.controller;

import backend.tour.entity.TourEntity;
import backend.tour.service.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tours")
public class TourController {
    @Autowired
    TourService tourService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllTours() {
        return ResponseEntity.ok(tourService.findAll());
    }

    @GetMapping("/page/{page}")
    public ResponseEntity<?> getTour(@PathVariable Integer page) {
        return ResponseEntity.ok(tourService.getTour(page));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTourById(@PathVariable Long id) {
        return ResponseEntity.ok(tourService.findById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTour(@RequestBody TourEntity tourDTO) {
        tourService.createTour(tourDTO);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateTour(@RequestBody  TourEntity tourDTO) {
        tourService.updateTour(tourDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/latest")
    public ResponseEntity<?> getLastestTour(){
        return ResponseEntity.ok(tourService.getLastestTour());
    }
}
