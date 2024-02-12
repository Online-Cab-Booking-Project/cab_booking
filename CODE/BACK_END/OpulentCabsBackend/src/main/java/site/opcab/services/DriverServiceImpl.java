package site.opcab.services;

import java.util.List;

import org.springframework.stereotype.Service;

import site.opcab.dto.DriverDTO;

@Service
public class DriverServiceImpl implements DriverService {

	@Override
	public DriverDTO createDriver(DriverDTO driverDTO) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DriverDTO updateDriver(Long id, DriverDTO driverDTO) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteDriver(Long id) {
		// TODO Auto-generated method stub

	}

	@Override
	public DriverDTO getDriverById(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<DriverDTO> getAllDrivers() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateBalanceDetails(Integer id, double balance) {
		// TODO Auto-generated method stub

	}

	@Override
	public Object getAlldriver() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object getAccountDetails(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object getWalletDetails(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object getPreviousRideDetails(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateAccountDetails(Integer id, DriverDTO driver) {
		// TODO Auto-generated method stub

	}

	@Override
	public Object register(DriverDTO driver) {
		// TODO Auto-generated method stub
		return null;
	}

}
