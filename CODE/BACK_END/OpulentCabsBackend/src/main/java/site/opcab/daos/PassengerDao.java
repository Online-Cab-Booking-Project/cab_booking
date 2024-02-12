package site.opcab.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.opcab.entities.Passenger;

public interface PassengerDao extends JpaRepository<Passenger, Integer> {
	Optional<Passenger> findByEmail(String email);
}
