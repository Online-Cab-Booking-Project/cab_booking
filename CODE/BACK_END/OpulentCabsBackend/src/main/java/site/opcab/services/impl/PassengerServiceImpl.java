package site.opcab.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import site.opcab.daos.BookingCallsDao;
import site.opcab.daos.BookingDetailsDao;
import site.opcab.daos.ComplaintDao;
import site.opcab.daos.DriverDao;
import site.opcab.daos.PassengerDao;
import site.opcab.daos.PassengerWalletDao;
import site.opcab.daos.WalletDao;
import site.opcab.dto.BookingCallsDTO;
import site.opcab.dto.BookingDetailDTO;
import site.opcab.dto.BookingInputDTO;
import site.opcab.dto.DriverGraphAPICallDTO;
import site.opcab.dto.DriverGraphInputDTO;
import site.opcab.dto.DriverGraphOutputDTO;
import site.opcab.dto.InputCoordinateDto;
import site.opcab.dto.PassengerDTO;
import site.opcab.dto.PathInputFromGraph;
import site.opcab.dto.RideDTO;
import site.opcab.dto.SourceInputDto;
import site.opcab.dto.PassengerWalletDTO;
import site.opcab.entities.BookingCalls;
import site.opcab.entities.BookingCallsPK;
import site.opcab.entities.BookingDetails;
import site.opcab.entities.Complaint;
import site.opcab.entities.Driver;
import site.opcab.entities.Passenger;
import site.opcab.entities.PassengerWallet;
import site.opcab.entities.enums.EAvailability;
import site.opcab.entities.enums.EBookingStatus;
import site.opcab.entities.enums.EComplaintStatus;
import site.opcab.entities.enums.EDriverAnswer;
import site.opcab.entities.enums.EGender;
import site.opcab.services.PassengerService;
import site.opcab.utility.RandomEnumGenerator;

@Service
@Transactional
public class PassengerServiceImpl implements PassengerService {

	@Autowired
	private PassengerDao pdao;
	@Autowired
	private DriverDao ddao;
	@Autowired
	private BookingCallsDao bcdao;
	@Autowired
	private BookingDetailsDao bddao;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private PasswordEncoder enc;
	@Autowired
	private RestTemplate restTemplate;
	@Autowired
	private PassengerWalletDao pwdao;
	@Autowired
	private ComplaintDao cdao;
	@Autowired
	private WalletDao wdao;
	@Value("${GRAPH_URL}")
	private String graphUrl;

	@Override
	public PassengerDTO register(PassengerDTO passenger) {
		System.out.println(passenger);
		Passenger p = mapper.map(passenger, Passenger.class);
		System.out.println(p);
		p.setPassword(enc.encode(p.getPassword()));
		System.out.println("Password set");
//		System.out.println(EGender.valueOf(passenger.getGender()).toString());
		p.setGender(EGender.valueOf(passenger.getGender()));

		PassengerWallet wallet = new PassengerWallet(0.0, p);
		wdao.save(wallet);

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
	public PassengerDTO getAccountDetails(String email) {
		Passenger passenger = pdao.findByEmail(email).orElseThrow(() -> new EntityNotFoundException());
		PassengerDTO passengerDto = mapper.map(passenger, PassengerDTO.class);
		passengerDto.setWallet(mapper.map(passenger.getWallet(), PassengerWalletDTO.class));

		return passengerDto;
	}

	@Override
	public void updateAccountDetails(String email, PassengerDTO passenger) {
		Passenger p = pdao.findByEmail(email).orElseThrow(() -> new EntityNotFoundException());
		p.setEmail(passenger.getEmail());
		p.setFirstName(passenger.getFirstName());
		p.setLastName(passenger.getLastName());
		p.setMobileNo(passenger.getMobileNo());
		p.setAddress(passenger.getAddress());
		p.setGender(EGender.valueOf(passenger.getGender()));
		p.setDob(passenger.getDob());
		pdao.save(p);
	}

	@Override
	public List<RideDTO> getPreviousRideDetails(String email) {
		Passenger passenger = pdao.findByEmail(email).orElseThrow(() -> new EntityNotFoundException());
		List<BookingDetails> detailsList = bddao.findByPassengerId(passenger.getId());
		List<RideDTO> rides = detailsList.stream().map(detail -> mapper.map(detail, RideDTO.class))
				.collect(Collectors.toList());
		return rides;
	}

	@Override
	public PassengerWalletDTO getWalletDetails(Integer id) {
		PassengerWallet wallet = pwdao.findByPassengerId(id).orElseThrow(() -> new EntityNotFoundException());
		return mapper.map(wallet, PassengerWalletDTO.class);
	}

	@Override
	public ResponseEntity<String> updateBalanceDetails(String email, double balance) {
		PassengerWallet wallet = pwdao.findByPassengerEmail(email).orElseThrow(() -> new EntityNotFoundException());
		wallet.setBalance(wallet.getBalance() + balance);
		return new ResponseEntity<String>("Balance updated", HttpStatus.OK);

	}

	@Override
	public List<Complaint> getAllComplaints(Integer id) {
		return cdao.findByBookingIdPassengerId(id);
	}

	@Override
	public Complaint getComplaintById(Integer id) {
		return cdao.findById(id).orElseThrow(() -> new EntityNotFoundException());
	}

	@Override
	public void addComplaint(Integer booking_id, Complaint complaint) {
		BookingDetails booking = bddao.findById(booking_id).orElseThrow(() -> new EntityNotFoundException());
		booking.addComplaint(complaint);
		cdao.save(complaint);
	}

	// ====================================================================================================================================
	// .................................................. Djikstra-related methods

	@Override
	public PathInputFromGraph computePath(InputCoordinateDto path) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<InputCoordinateDto> request = new HttpEntity<>(path, headers);
		PathInputFromGraph response = restTemplate
				.postForEntity(graphUrl + "/graph/getpath", request, PathInputFromGraph.class).getBody();

		return response;
	}

	@Override
	public List<DriverGraphOutputDTO> getDriversList(SourceInputDto source) {

		List<Driver> driverList = ddao.findByAvailability(EAvailability.A);
		System.out.println("Booking details populated..");
		List<DriverGraphInputDTO> driverGraphinput = new ArrayList<DriverGraphInputDTO>();
		driverList.forEach((driver) -> {
			driverGraphinput
					.add(new DriverGraphInputDTO(driver.getId(), driver.getxCoordinates(), driver.getyCoordinates()));
		});
		System.out.println("Making the GraphAPICallDTO object..");
		DriverGraphAPICallDTO graphCall = new DriverGraphAPICallDTO(driverGraphinput, source);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<DriverGraphAPICallDTO> request = new HttpEntity<>(graphCall, headers);

		System.out.println("Sending Request for graph API");

		List driverDistances = restTemplate.postForEntity(graphUrl + "/graph/getdrivers", request, List.class)
				.getBody();

		System.out.println("API call successful");

		return driverDistances;
//		for (DriverGraphOutputDTO driver : driverDistances) {
//			Driver d = ddao.getReferenceById(driver.getId());
//			BookingCalls call = new BookingCalls();
//			call.setDriver(d);
//			EDriverAnswer answer = generator.getRandom();
//			call.setDriverAnswer(answer);
//			call.setBooking(booking);
//			bcdao.save(call);
//			if (answer == EDriverAnswer.A) {
//				booking.setDriver(d);
//				break;
//			}
//		}
	}

	// ====================================================================================================================================
	// .................................................... Booking-related methods

	@Override
	public BookingDetails addBookingDetails(String email, BookingInputDTO inputDetails) {
		Passenger passenger = pdao.findByEmail(email).orElseThrow(() -> new EntityNotFoundException());

		BookingDetails booking = new BookingDetails();
		booking = mapper.map(inputDetails, BookingDetails.class);
		booking.setPassenger(passenger);
		return bddao.save(booking);

	}

	@Override
	public BookingCalls addCall(BookingCallsDTO callDetails) {
		System.out.println("inside addcall method in service");

		// Retrieve BookingDetails and Driver entities
		BookingDetails bookingDetails = bddao.findById(callDetails.getBookingId())
				.orElseThrow(() -> new EntityNotFoundException());

		Driver driver = ddao.findById(callDetails.getDriverId()).orElseThrow(() -> new EntityNotFoundException());

		// Create BookingCalls entity with the composite key and fetched Driver
		BookingCalls call = new BookingCalls();
		call.setBooking(bookingDetails);
		call.setDriver(driver);
		call.setDriverAnswer(null);

		// Save the BookingCalls entity
		return bcdao.save(call);
	}

	@Override
	public BookingCallsDTO getDriverAnswer(Integer bookingId, Integer driverId) {
		BookingDetails bookingDetails = bddao.getReferenceById(bookingId);
		Driver driver = ddao.getReferenceById(driverId);

		BookingCalls call = bcdao.findByBookingAndDriver(bookingDetails, driver)
				.orElseThrow(() -> new EntityNotFoundException(
						"BookingCalls not found for Booking ID: " + bookingId + " and Driver ID: " + driverId));

		return new BookingCallsDTO(bookingId, driverId, call.getDriverAnswer());
	}

	@Override
	public BookingCallsDTO updateBookingCallStatus(BookingCallsDTO call) {
		BookingDetails bookingDetails = bddao.getReferenceById(call.getBookingId());
		Driver driver = ddao.getReferenceById(call.getDriverId());

		BookingCalls persistentCall = bcdao.findByBookingAndDriver(bookingDetails, driver)
				.orElseThrow(() -> new EntityNotFoundException("BookingCalls not found for Booking ID: "
						+ call.getBookingId() + " and Driver ID: " + call.getDriverId()));

		persistentCall.setDriverAnswer(call.getDriverAnswer());

		return new BookingCallsDTO(call.getBookingId(), call.getDriverId(), persistentCall.getDriverAnswer());
	}

	@Override
	public boolean updateBookingStatus(BookingDetailDTO detail) {
//		System.out.println("Updating booking status to : " + detail.getStatus().toString());
		BookingDetails bookingDetails = bddao.findById(detail.getBookingId())
				.orElseThrow(() -> new EntityNotFoundException());
		bookingDetails.setStatus(detail.getStatus());
		if (detail.getStatus() == EBookingStatus.O) {
			Driver driver = ddao.findById(detail.getDriverId()).orElseThrow(() -> new EntityNotFoundException());
			bookingDetails.setDriver(driver);
		}
		return true;
	}

	// ====================================================================================================================================
}
