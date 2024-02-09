package site.opcab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import site.opcab.dto.ComplaintDTO;
import site.opcab.dto.PassengerDTO;
import site.opcab.services.PassengerService;

@RestController
@RequestMapping("/passenger")
public class PassengerController {

	@Autowired
	private PassengerService pservice;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody PassengerDTO passenger) {

		return ResponseEntity.status(HttpStatus.CREATED).body(pservice.register(passenger));
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody String email, @RequestBody String password) {

		return ResponseEntity.status(HttpStatus.OK).body(pservice.login(email, password));
	}

	@GetMapping("/getAll")
	public ResponseEntity<?> getAllPassenger() {
		return ResponseEntity.status(HttpStatus.OK).body(pservice.getAllPassenger());
	}

	@GetMapping("/account/:id")
	public ResponseEntity<?> getAccountDetails(@RequestParam Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(pservice.getAccountDetails(id));
	}

	@PutMapping("/account/update/:id")
	public ResponseEntity<?> updateAccountDetails(@RequestParam Integer id, @RequestBody PassengerDTO passenger) {
		pservice.updateAccountDetails(id, passenger);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@GetMapping("/account/wallet/:id")
	public ResponseEntity<?> getWalletDetails(@RequestParam Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(pservice.getWalletDetails(id));
	}

	@PutMapping("/account/wallet/addBalance/:id")
	public ResponseEntity<?> updateWalletDetails(@RequestParam Integer id, @RequestBody double balance) {
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

	@GetMapping("/complaints")
	public ResponseEntity<?> getAllComplaints(@RequestParam Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(pservice.getAllComplaints(id));
	}

	@GetMapping("/complaints/:id")
	public ResponseEntity<?> getComplaintById(@RequestParam Integer id) {
		return ResponseEntity.status(HttpStatus.OK).body(pservice.getComplaintById(id));
	}

	@PostMapping("/complaints/addComplaint/:id")
	public ResponseEntity<?> addComplaint(@RequestParam Integer id, @RequestBody ComplaintDTO complaint) {
		pservice.addComplaint(id, complaint);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@DeleteMapping("/complaints/resolveComplaint/:id")
	public ResponseEntity<?> resolveComplaint(@RequestParam Integer id) {
		pservice.resolveComplaint(id);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

}
