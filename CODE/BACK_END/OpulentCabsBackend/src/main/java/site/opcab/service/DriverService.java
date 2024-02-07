package site.opcab.service;

import java.util.List;

import site.opcab.dto.DriverDTO;

	public interface DriverService {
	    DriverDTO createDriver(DriverDTO driverDTO);
	    DriverDTO updateDriver(Long id, DriverDTO driverDTO);
	    void deleteDriver(Long id);
	    DriverDTO getDriverById(Long id);
	    List<DriverDTO> getAllDrivers();
	}


