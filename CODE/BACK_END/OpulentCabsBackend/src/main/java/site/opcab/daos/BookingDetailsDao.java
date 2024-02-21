package site.opcab.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import site.opcab.entities.BookingDetails;

public interface BookingDetailsDao extends JpaRepository<BookingDetails, Integer> {

	List<BookingDetails> findByPassengerId(Integer id);

	List<BookingDetails> findByDriverId(Integer id);

	List<BookingDetails> findByDriverEmail(String email);
}
