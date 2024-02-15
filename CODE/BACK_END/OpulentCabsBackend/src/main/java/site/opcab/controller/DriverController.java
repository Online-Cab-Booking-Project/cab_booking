package site.opcab.controller;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import site.opcab.dto.DriverDTO;
import site.opcab.dto.SigninRequest;
import site.opcab.dto.SigninResponse;
import site.opcab.entities.Complaint;
import site.opcab.security.JwtUtils;
import site.opcab.services.DriverService;

@RestController
@RequestMapping("/driver")
@Validated
public class DriverController {

	@Autowired
	private DriverService dservice;

	@Autowired
	private JwtUtils utils;

	@Autowired
	private AuthenticationManager mgr;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody DriverDTO driver) {

		return ResponseEntity.status(HttpStatus.CREATED).body(dservice.register(driver));
	}

	/*
	 * request payload : Auth req DTO : email n password response payload : In case
	 * of success : Auth Resp DTO : mesg + JWT token + SC 200 IN case of failure :
	 * SC 401
	 */
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody SigninRequest reqDTO) {
		// simply invoke authenticate(...) on AuthMgr
		// i/p : Authentication => un verifed credentials
		// i/f --> Authentication --> imple by UsernamePasswordAuthToken
		// throws exc OR rets : verified credentials (UserDetails i.pl class: custom
		// user details)

		Authentication verifiedAuth = mgr
				.authenticate(new UsernamePasswordAuthenticationToken(reqDTO.getEmail(), reqDTO.getPassword()));
		System.out.println(verifiedAuth.getClass());// Custom user details
		// => auth success

		return ResponseEntity
				.ok(new SigninResponse(utils.generateJwtToken(verifiedAuth), "Successful Authentication!!!"));
	}

	@GetMapping("/getAll")
	public ResponseEntity<?> getAllDrivers() {
		return ResponseEntity.status(HttpStatus.OK).body(dservice.getAllDrivers());
	}

	@GetMapping("/account/{id}")
	public ResponseEntity<?> getAccountDetails(@PathVariable Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(dservice.getAccountDetails(id));
	}

	@PutMapping("/account/update/{id}")
	public ResponseEntity<?> updateAccountDetails(@PathVariable Integer id, @Valid @RequestBody DriverDTO driver) {
		dservice.updateAccountDetails(id, driver);
		return ResponseEntity.status(HttpStatus.OK).body(dservice.getAccountDetails(id));
	}

	@GetMapping("/account/wallet/{id}")
	public ResponseEntity<?> getWalletDetails(@PathVariable Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(dservice.getWalletDetails(id));
	}

	@PutMapping("/account/wallet/addBalance/{id}")
	public ResponseEntity<?> updateWalletDetails(@PathVariable Integer id, @Positive @RequestBody double balance) {
		dservice.updateBalanceDetails(id, balance);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@GetMapping("/yourRides")
	public ResponseEntity<?> getPreviousRideDetails(@RequestParam Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(dservice.getPreviousRideDetails(id));
	}

	@GetMapping("/complaints")
	public ResponseEntity<?> getAllComplaints(@RequestParam Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(dservice.getAllComplaints(id));
	}

	@GetMapping("/complaints/{id}")
	public ResponseEntity<?> getComplaintById(@PathVariable Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(dservice.getComplaintById(id));
	}

	@PostMapping("/complaints/addComplaint/{booking_id}")
	public ResponseEntity<?> addComplaint(@PathVariable Integer booking_id, @RequestBody Complaint complaint) {
		dservice.addComplaint(booking_id, complaint);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@DeleteMapping("/complaints/resolveComplaint/{id}")
	public ResponseEntity<?> resolveComplaint(@PathVariable Integer id) {
		dservice.resolveComplaint(id);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

}
