package backend.tour.service;

import backend.tour.entity.BookingEntity;
import backend.tour.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    TourScheduleService tourScheduleService;

    private BookingEntity DTOToEntity(BookingEntity bookingDTO) {
        BookingEntity bookingEntity = new BookingEntity();
        bookingEntity.setId(bookingDTO.getId());
        bookingEntity.setUserId(bookingDTO.getUserId());
        bookingEntity.setScheduleId(bookingDTO.getScheduleId());
        bookingEntity.setNumPeople(bookingDTO.getNumPeople());
        bookingEntity.setTotalPrice(bookingDTO.getTotalPrice());
        bookingEntity.setBookingDate(bookingDTO.getBookingDate());
        bookingEntity.setStatus(bookingDTO.getStatus());
        return bookingEntity;
    }

    public void createBooking(BookingEntity bookingDTO) {
        BookingEntity bookingEntity = DTOToEntity(bookingDTO);
        tourScheduleService.decreaseAvailableSlots(bookingEntity.getScheduleId(), bookingEntity.getNumPeople());
        bookingRepository.save(bookingEntity);
    }

    public void updateBooking(BookingEntity bookingDTO) {
        BookingEntity bookingEntity = DTOToEntity(bookingDTO);
        bookingRepository.save(bookingEntity);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    public List<BookingEntity> getBookingsByUserId(Long userId) {
        return bookingRepository.findAllByUserId(userId);
    }

    public BookingEntity getBookingById(Long id) {
        return bookingRepository.findFirstById(id);
    }

    public void updateBookingStatus(Long id, String status) {
        BookingEntity bookingEntity = bookingRepository.findFirstById(id);
        if (bookingEntity != null) {
            bookingEntity.setStatus(status);
            bookingRepository.save(bookingEntity);
        }
    }
}
