package site.opcab.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.opcab.entities.BookingCalls;
import site.opcab.entities.BookingDetails;
import site.opcab.entities.Driver;

public interface BookingCallsDao extends JpaRepository<BookingCalls, Integer> {

	Optional<BookingCalls> findByBookingIdAndDriverId(BookingDetails referenceById, Driver referenceById2);

}
