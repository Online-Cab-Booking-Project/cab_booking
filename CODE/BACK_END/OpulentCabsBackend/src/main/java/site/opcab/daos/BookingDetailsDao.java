package site.opcab.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import site.opcab.entities.BookingDetails;

public interface BookingDetailsDao extends JpaRepository<BookingDetails, Integer> {

}
