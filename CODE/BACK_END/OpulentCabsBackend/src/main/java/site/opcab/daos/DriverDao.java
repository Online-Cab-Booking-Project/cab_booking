package site.opcab.daos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.opcab.entities.Driver;
import site.opcab.entities.enums.EAvailability;

public interface DriverDao extends JpaRepository<Driver, Integer> {
	Optional<Driver> findByEmail(String email);

	List<Driver> findByAvailability(EAvailability e);
}
