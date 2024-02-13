package site.opcab.services.impl;

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

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import site.opcab.daos.PassengerDao;
import site.opcab.dto.ComplaintDTO;
import site.opcab.dto.InputCoordinateDto;
import site.opcab.dto.PassengerDTO;
import site.opcab.dto.PathDTO;
import site.opcab.dto.PathInputFromGraph;
import site.opcab.dto.Point;
import site.opcab.dto.RideDTO;
import site.opcab.dto.WalletDTO;
import site.opcab.entities.Passenger;
import site.opcab.entities.enums.EDriverAnswer;
//import org.springframework.boot.context.config.*;
//import org.springframework.core.io.Resource;
import site.opcab.services.ComplaintService;
import site.opcab.services.PassengerService;
import site.opcab.utility.RandomEnumGenerator;

@Service
@Transactional
public class PassengerServiceImpl implements PassengerService {

	@Autowired
	private PassengerDao pdao;

	@Autowired
	private ComplaintService cservice;

	@Autowired
	private ModelMapper mapper;

	@Autowired
	private PasswordEncoder enc;

	@Autowired
	private RestTemplate restTemplate;

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
	public void addComplaint(Integer booking_id, Integer id, ComplaintDTO complaint) {

	}

	@Override
	public void resolveComplaint(Integer id) {
		// TODO Auto-generated method stub

	}

	@Override
	public PathInputFromGraph computePath(InputCoordinateDto path) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<InputCoordinateDto> request = new HttpEntity<>(path, headers);
		PathInputFromGraph response = restTemplate
				.postForEntity("http://localhost:7070/graph/getpath", request, PathInputFromGraph.class).getBody();

		return response;
	}

	@Override
	public void confirmBooking() {
		double[] probabilities = { 0.4, 0.4, 0.2 };
		RandomEnumGenerator<EDriverAnswer> generator = new RandomEnumGenerator<>(EDriverAnswer.class, probabilities);

	}

}
