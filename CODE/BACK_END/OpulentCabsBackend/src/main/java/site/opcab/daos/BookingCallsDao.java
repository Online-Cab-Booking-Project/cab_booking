package site.opcab.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import site.opcab.entities.BookingCalls;

public interface BookingCallsDao extends JpaRepository<BookingCalls, Integer> {

}
