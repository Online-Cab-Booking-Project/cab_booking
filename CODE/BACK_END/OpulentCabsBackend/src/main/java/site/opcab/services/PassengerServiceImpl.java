package site.opcab.services;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.hibernate.ObjectNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import site.opcab.daos.PassengerDao;
import site.opcab.dto.ComplaintDTO;
import site.opcab.dto.PassengerDTO;
import site.opcab.dto.RideDTO;
import site.opcab.dto.WalletDTO;
import site.opcab.entities.Passenger;
//import org.springframework.boot.context.config.*;
//import org.springframework.core.io.Resource;

@Service
@Transactional
public class PassengerServiceImpl implements PassengerService {

	@Autowired
	private PassengerDao pdao;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private PasswordEncoder enc;

	@Override
	public PassengerDTO register(PassengerDTO passenger) {
		Passenger p = mapper.map(passenger, Passenger.class);
		p.setPassword(enc.encode(p.getPassword()));

		return mapper.map(pdao.save(p), PassengerDTO.class);
	}

	@Override
	public PassengerDTO login(String email, String password) {

		Passenger p = pdao.findByEmail(email).orElseThrow(() -> new EntityNotFoundException());
		if (p.getPassword().equals(enc.encode(password))) {
			return mapper.map(p, PassengerDTO.class);
		}
		return null;
	}

	@Override
	public List<PassengerDTO> getAllPassenger() {
		List<Passenger> p = pdao.findAll();

		return p.stream().map(e -> mapper.map(e, PassengerDTO.class)).collect(Collectors.toList());
	}

	@Override
	public PassengerDTO getAccountDetails(Integer id) {

		return mapper.map(pdao.findById(id).orElseThrow(() -> new EntityNotFoundException()), PassengerDTO.class);
	}

	@Override
	public void updateAccountDetails(Integer id, PassengerDTO passenger) {
		Passenger p = pdao.findById(id).orElseThrow(() -> new EntityNotFoundException());
		p.setEmail(passenger.getEmail());
		p.setFirstName(passenger.getFirstName());
		p.setLastName(passenger.getLastName());
		p.setMobileNo(passenger.getPhoneNumber());

		return;

	}

	@Override
	public List<RideDTO> getPreviousRideDetails(Integer id) {

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
