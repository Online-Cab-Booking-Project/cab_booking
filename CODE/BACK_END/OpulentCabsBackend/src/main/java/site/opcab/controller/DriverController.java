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

import site.opcab.dto.ComplaintDTO;
import site.opcab.dto.DriverDTO;
import site.opcab.dto.SigninRequest;
import site.opcab.dto.SigninResponse;
import site.opcab.security.JwtUtils;
import site.opcab.services.DriverService;

@RestController
@RequestMapping("/driver")
public class DriverController {

	@Autowired
	private DriverService pservice;

	@Autowired
	private JwtUtils utils;

	@Autowired
	private AuthenticationManager mgr;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody DriverDTO driver) {

		return ResponseEntity.status(HttpStatus.CREATED).body(pservice.register(driver));
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
	public ResponseEntity<?> getAlldriver() {
		return ResponseEntity.status(HttpStatus.OK).body(pservice.getAlldriver());
	}

	@GetMapping("/account/{id}")
	public ResponseEntity<?> getAccountDetails(@PathVariable Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(pservice.getAccountDetails(id));
	}

	@PutMapping("/account/update/{id}")
	public ResponseEntity<?> updateAccountDetails(@PathVariable Integer id, @RequestBody DriverDTO driver) {
		pservice.updateAccountDetails(id, driver);
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
	public ResponseEntity<?> bookRide(@RequestParam Integer id) {
		// booking logic
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@PostMapping("/bookRide/confirm")
	public ResponseEntity<?> confirmRide(@RequestParam Integer id) {
		// booking logic
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@GetMapping("/yourRides")
	public ResponseEntity<?> getPreviousRideDetails(@RequestParam Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(pservice.getPreviousRideDetails(id));
	}

}
