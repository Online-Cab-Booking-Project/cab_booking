package site.opcab.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import site.opcab.daos.BookingDetailsDao;
import site.opcab.daos.ComplaintDao;
import site.opcab.daos.DriverDao;
import site.opcab.daos.DriverWalletDao;
import site.opcab.daos.WalletDao;
import site.opcab.dto.DriverDTO;
import site.opcab.dto.DriverWalletDTO;
import site.opcab.dto.RideDTO;
import site.opcab.entities.BookingDetails;
import site.opcab.entities.Complaint;
import site.opcab.entities.Driver;
import site.opcab.entities.DriverWallet;
import site.opcab.entities.enums.EComplaintStatus;
import site.opcab.entities.enums.EGender;
import site.opcab.services.DriverService;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {

	@Autowired
	private DriverDao ddao;
	@Autowired
	private BookingDetailsDao bddao;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private PasswordEncoder enc;
	@Autowired
	private DriverWalletDao dwdao;
	@Autowired
	private ComplaintDao cdao;
	@Autowired
	private WalletDao wdao;

	@Override
	public DriverDTO register(DriverDTO driver) {
		Driver d = mapper.map(driver, Driver.class);
		d.setPassword(enc.encode(d.getPassword()));
		d.setGender(EGender.valueOf(driver.getGender()));

		DriverWallet wallet = new DriverWallet(0.0, d);
		wdao.save(wallet);

		return mapper.map(ddao.save(d), DriverDTO.class);
	}

	@Override
	public DriverDTO login(String email, String password) {
		Driver d = ddao.findByEmail(email).orElseThrow(() -> new EntityNotFoundException());
		if (d.getPassword().equals(enc.encode(password))) {
			return mapper.map(d, DriverDTO.class);
		}
		return null;
	}

	@Override
	public List<DriverDTO> getAllDrivers() {
		List<Driver> d = ddao.findAll();

		return d.stream().map(e -> mapper.map(e, DriverDTO.class)).collect(Collectors.toList());
	}

	@Override
	public DriverDTO getAccountDetails(Integer id) {
		return mapper.map(ddao.findById(id).orElseThrow(() -> new EntityNotFoundException()), DriverDTO.class);
	}

	@Override
	public void updateAccountDetails(Integer id, DriverDTO driver) {
		Driver d = ddao.findById(id).orElseThrow(() -> new EntityNotFoundException());
		d.setEmail(driver.getEmail());
		d.setFirstName(driver.getFirstName());
		d.setLastName(driver.getLastName());
		d.setMobileNo(driver.getMobileNo());
		d.setAddress(driver.getAddress());
		d.setGender(EGender.valueOf(driver.getGender()));
		d.setDob(driver.getDob());
	}

	@Override
	public List<RideDTO> getPreviousRideDetails(Integer id) {
		List<BookingDetails> detailsList = bddao.findByDriverId(id);
		List<RideDTO> rides = detailsList.stream().map(detail -> mapper.map(detail, RideDTO.class))
				.collect(Collectors.toList());
		return rides;
	}

	@Override
	public DriverWalletDTO getWalletDetails(Integer id) {
		DriverWallet wallet = dwdao.findByDriverId(id).orElseThrow(() -> new EntityNotFoundException());
		return mapper.map(wallet, DriverWalletDTO.class);
	}

	@Override
	public ResponseEntity<String> updateBalanceDetails(Integer id, double balance) {
		DriverWallet wallet = dwdao.findByDriverId(id).orElseThrow(() -> new EntityNotFoundException());
		wallet.setBalance(balance);
		return new ResponseEntity<String>("Balance updated", HttpStatus.OK);
	}

	@Override
	public List<Complaint> getAllComplaints(Integer id) {
		return cdao.findByBookingIdDriverId(id);
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

	@Override
	public void resolveComplaint(Integer id) {
		Complaint complaint = getComplaintById(id);
		complaint.setComplaintStatus(EComplaintStatus.R);
	}

}
