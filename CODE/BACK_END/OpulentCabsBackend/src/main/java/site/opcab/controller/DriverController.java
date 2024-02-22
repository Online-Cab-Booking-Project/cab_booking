package site.opcab.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import site.opcab.dto.ApiResponse;
import site.opcab.dto.BookingCallForDriverDTO;
import site.opcab.dto.BookingCallsDTO;
import site.opcab.dto.BookingDetailsForDriverDTO;
import site.opcab.dto.DriverDTO;
import site.opcab.dto.SigninRequest;
import site.opcab.dto.SigninResponse;
import site.opcab.entities.BookingCalls;
import site.opcab.entities.Complaint;
import site.opcab.security.JwtUtils;
import site.opcab.services.DriverService;

@RestController
@RequestMapping("/driver")
@Validated
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
		RequestMethod.DELETE })
public class DriverController {

	@Autowired
	private DriverService dservice;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private JwtUtils utils;

	@Autowired
	private AuthenticationManager mgr;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody DriverDTO driver) {
		dservice.register(driver);
		return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse("success"));
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
		System.out.println("Driver Verified Authorities :: "
				+ verifiedAuth.getAuthorities().iterator().next().getAuthority().getClass());

		if (verifiedAuth.getAuthorities().iterator().next().getAuthority() != "D") {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
		// => auth success

		return ResponseEntity
				.ok(new SigninResponse(utils.generateJwtToken(verifiedAuth), "Successful Authentication!!!"));
	}

	@GetMapping("/getAll")
	public ResponseEntity<?> getAllDrivers() {
		return ResponseEntity.status(HttpStatus.OK).body(dservice.getAllDrivers());
	}

	@GetMapping("/account/")
	public ResponseEntity<?> getAccountDetails() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		return ResponseEntity.status(HttpStatus.OK)
				.body(dservice.getAccountDetails(authentication.getPrincipal().toString()));
	}

	@PutMapping("/account/update/")
	public ResponseEntity<?> updateAccountDetails(@Valid @RequestBody DriverDTO driver) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		dservice.updateAccountDetails(authentication.getPrincipal().toString(), driver);
		return ResponseEntity.status(HttpStatus.OK).body("success");
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
	public ResponseEntity<?> getPreviousRideDetails() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return ResponseEntity.status(HttpStatus.OK)
				.body(dservice.getPreviousRideDetails(authentication.getPrincipal().toString()));
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

	@GetMapping("/checkforcalls")
	public ResponseEntity<?> checkForCalls() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		List<BookingCalls> calls = dservice.checkForCalls(authentication.getPrincipal().toString());
		List<BookingCallForDriverDTO> response = null;
		if (!calls.isEmpty()) {
			response = calls.stream().map((call) -> {
				BookingDetailsForDriverDTO details = mapper.map(call.getBooking(), BookingDetailsForDriverDTO.class);
				BookingCallForDriverDTO callDetails = new BookingCallForDriverDTO();
				callDetails.setBooking(details);
				callDetails.setDriverId(call.getDriver().getId());
				callDetails.setDriverAnswer(call.getDriverAnswer());
				return callDetails;
			}).collect(Collectors.toList());
			return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		return ResponseEntity.status(HttpStatus.OK).body("No calls");
	}

	@PostMapping("/bookride/updatecallstatus")
	public BookingCallsDTO updateCallStatus(@RequestBody BookingCallsDTO call) {
		System.out.println("Inside controller method of update call status");
		return dservice.updateBookingCallStatus(call);
	}

}
