package site.opcab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import site.opcab.dto.PassengerDTO;
import site.opcab.services.PassengerService;

@RestController
@RequestMapping("/passenger")
public class PassengerController {

	@Autowired
	private PassengerService pservice;

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody PassengerDTO passenger) {

		return ResponseEntity.status(HttpStatus.CREATED).body(pservice.save(passenger));
	}

	@PostMapping("/login")
	public PassengerDTO login(@RequestBody String email, @RequestBody String password) {
		return pservice.save(passenger);
	}

}
