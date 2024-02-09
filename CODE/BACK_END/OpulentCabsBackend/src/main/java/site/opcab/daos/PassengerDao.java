package site.opcab.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import site.opcab.entities.Passenger;

public interface PassengerDao extends JpaRepository<Passenger, Integer> {

}
