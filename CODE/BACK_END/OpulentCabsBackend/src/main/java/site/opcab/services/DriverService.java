package site.opcab.services;

import java.util.List;

import site.opcab.dto.DriverDTO;

	public interface DriverService {
		
	    DriverDTO createDriver(DriverDTO driverDTO);
	    
	    DriverDTO updateDriver(Long id, DriverDTO driverDTO);
	    
	    void deleteDriver(Long id);
	    
	    DriverDTO getDriverById(Long id);
	    
	    List<DriverDTO> getAllDrivers();

		void updateBalanceDetails(Integer id, double balance);

		Object getAlldriver();

		Object getAccountDetails(Integer id);

		Object getWalletDetails(Integer id);

		Object getPreviousRideDetails(Integer id);

		void updateAccountDetails(Integer id, DriverDTO driver);

		Object register(DriverDTO driver);
	    
	}


