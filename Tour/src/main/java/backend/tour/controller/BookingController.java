package backend.tour.controller;

import backend.tour.entity.BookingEntity;
import backend.tour.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")
public class BookingController {
    @Autowired
    BookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<?> createBooking(@RequestBody  BookingEntity bookingDTO) {
        bookingService.createBooking(bookingDTO);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateBooking(BookingEntity bookingDTO) {
        bookingService.updateBooking(bookingDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getBookingsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getBookingsByUserId(userId));
    }

    @PutMapping("/update-status/{id}")
    public ResponseEntity<?> UpdateBookingStatus(@PathVariable Long id) {
        bookingService.updateBookingStatus(id, "PAID");
        return ResponseEntity.ok().build();
    }
}
