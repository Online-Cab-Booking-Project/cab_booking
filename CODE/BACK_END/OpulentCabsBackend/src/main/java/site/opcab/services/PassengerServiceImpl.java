package site.opcab.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import site.opcab.daos.PassengerDao;
import site.opcab.dto.ComplaintDTO;
import site.opcab.dto.PassengerDTO;
import site.opcab.dto.RideDTO;
import site.opcab.dto.WalletDTO;
import site.opcab.entities.Passenger;

@Service
@Transactional
public class PassengerServiceImpl implements PassengerService {

	@Autowired
	private PassengerDao pdao;

	@Autowired
	private ModelMapper mapper;

	@Override
	public PassengerDTO register(PassengerDTO passenger) {
		Passenger p = mapper.map(passenger, Passenger.class);

		return mapper.map(pdao.save(p), PassengerDTO.class);
	}

	@Override
	public PassengerDTO login(String email, String password) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PassengerDTO getAllPassenger() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public PassengerDTO getAccountDetails(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateAccountDetails(Integer id, PassengerDTO passenger) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<RideDTO> getPreviousRideDetails(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public WalletDTO getWalletDetails(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateBalanceDetails(Integer id, double balance) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<ComplaintDTO> getAllComplaints(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ComplaintDTO getComplaintById(Integer id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addComplaint(Integer id, ComplaintDTO complaint) {
		// TODO Auto-generated method stub

	}

	@Override
	public void resolveComplaint(Integer id) {
		// TODO Auto-generated method stub

	}

}
