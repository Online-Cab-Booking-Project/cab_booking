package site.opcab.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.opcab.entities.Driver;

public interface DriverDao extends JpaRepository<Driver, Integer> {
	Optional<Driver> findByEmail(String email);
}
