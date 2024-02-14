package site.opcab.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import site.opcab.entities.Driver;

public interface DriverDao extends JpaRepository<Driver, Integer> {

}
