package site.opcab.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.opcab.entities.BookingCalls;
import site.opcab.entities.BookingDetails;
import site.opcab.entities.Driver;
import site.opcab.entities.Passenger;

public interface BookingCallsDao extends JpaRepository<BookingCalls, Integer> {

	Optional<BookingCalls> findByBookingIdAndDriverId(BookingDetails referenceById, Driver referenceById2);

	Optional<BookingCalls> findByBookingAndDriver(BookingDetails bookingDetails, Driver driver);

	List<BookingCalls> findByDriverEmailAndDriverAnswerIsNull(String email);

}
