package site.opcab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import site.opcab.dto.BookingInputDTO;
import site.opcab.dto.ComplaintDTO;
import site.opcab.dto.InputCoordinateDto;
import site.opcab.dto.PassengerDTO;
import site.opcab.dto.PathDTO;
import site.opcab.dto.SigninRequest;
import site.opcab.dto.SigninResponse;
import site.opcab.dto.SourceInputDto;
import site.opcab.entities.BookingDetails;
import site.opcab.security.JwtUtils;
import site.opcab.services.ComplaintService;
import site.opcab.services.PassengerService;

@RestController
@RequestMapping("/passenger")
public class PassengerController {

	@Autowired
	private PassengerService pservice;

	@Autowired
	private JwtUtils utils;

	@Autowired
	private AuthenticationManager mgr;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody PassengerDTO passenger) {

		return ResponseEntity.status(HttpStatus.CREATED).body(pservice.register(passenger));
	}

	/*
	 * request payload : Auth req DTO : email n password resp payload : In case of
	 * success : Auth Resp DTO : mesg + JWT token + SC 200 IN case of failure : SC
	 * 401
	 */
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody SigninRequest reqDTO) {
		// simply invoke authentucate(...) on AuthMgr
		// i/p : Authentication => un verifed credentials
		// i/f --> Authentication --> imple by UsernamePasswordAuthToken
		// throws exc OR rets : verified credentials (UserDetails i.pl class: custom
		// user details)

		Authentication verifiedAuth = mgr
				.authenticate(new UsernamePasswordAuthenticationToken(reqDTO.getEmail(), reqDTO.getPassword()));
		System.out.println(verifiedAuth.getClass());// Custom user details
		// => auth success

//		return ResponseEntity.status(HttpStatus.OK).body(pservice.login(email, password));
		return ResponseEntity
				.ok(new SigninResponse(utils.generateJwtToken(verifiedAuth), "Successful Authentication!!!"));
	}

	@GetMapping("/getAll")
	public ResponseEntity<?> getAllPassenger() {
		return ResponseEntity.status(HttpStatus.OK).body(pservice.getAllPassenger());
	}

	@GetMapping("/account/{id}")
	public ResponseEntity<?> getAccountDetails(@PathVariable Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(pservice.getAccountDetails(id));
	}

	@PutMapping("/account/update/{id}")
	public ResponseEntity<?> updateAccountDetails(@PathVariable Integer id, @RequestBody PassengerDTO passenger) {
		pservice.updateAccountDetails(id, passenger);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@GetMapping("/account/wallet/{id}")
	public ResponseEntity<?> getWalletDetails(@PathVariable Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(pservice.getWalletDetails(id));
	}

	@PutMapping("/account/wallet/addBalance/{id}")
	public ResponseEntity<?> updateWalletDetails(@PathVariable Integer id, @RequestBody double balance) {
		pservice.updateBalanceDetails(id, balance);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@PostMapping("/bookRide")
	public ResponseEntity<?> bookRide(@RequestBody InputCoordinateDto path) {
		return ResponseEntity.status(HttpStatus.OK).body(pservice.computePath(path));
	}

	@PostMapping("/bookRide/confirm")
	public ResponseEntity<?> confirmRide(@RequestBody BookingInputDTO inputDetails,
			@RequestBody SourceInputDto source) {
		pservice.confirmBooking(inputDetails, source);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@GetMapping("/yourRides")
	public ResponseEntity<?> getPreviousRideDetails(@RequestParam Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(pservice.getPreviousRideDetails(id));
	}

	@GetMapping("/complaints")
	public ResponseEntity<?> getAllComplaints(@RequestParam Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(pservice.getAllComplaints(id));
	}

	@GetMapping("/complaints/{id}")
	public ResponseEntity<?> getComplaintById(@PathVariable Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(pservice.getComplaintById(id));
	}

	@PostMapping("/complaints/ride/{booking_id}/addComplaint/{id}")
	public ResponseEntity<?> addComplaint(@PathVariable Integer booking_id, @PathVariable Integer id,
			@RequestBody ComplaintDTO complaint) {
		pservice.addComplaint(booking_id, id, complaint);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@DeleteMapping("/complaints/resolveComplaint/{id}")
	public ResponseEntity<?> resolveComplaint(@PathVariable Integer id) {
		pservice.resolveComplaint(id);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

}
