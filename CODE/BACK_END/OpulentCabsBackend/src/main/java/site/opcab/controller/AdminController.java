package site.opcab.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import site.opcab.dto.*;
import site.opcab.services.AdminService;

@RestController
@RequestMapping("/admin")
@Validated
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
		RequestMethod.DELETE })
public class AdminController {

	@Autowired
	private AdminService aService;
	@Autowired
	private ModelMapper mapper;

	@GetMapping("/alldrivers")
	public ApiResponse getAllDrivers() {
		return null;
	}

	@GetMapping("/allpassengers")
	public ApiResponse getAllPassenger() {
		return null;
	}

	@GetMapping("/allrides")
	public ApiResponse getAllRides() {
		return null;
	}

	@GetMapping("/unresolvedcomplaints")
	public List<ComplaintDTO> getUnresolvedComplaints() {
		return aService.getUnresolvedComplaints().stream().map(complaint -> {
			ComplaintDTO c = mapper.map(complaint, ComplaintDTO.class);
			c.setBookingId(complaint.getBookingId().getId());
			return c;
		}).collect(Collectors.toList());
	}

	@GetMapping("/resolvedcomplaints")
	public List<ComplaintDTO> getResolvedComplaints() {
		return aService.getResolvedComplaints().stream().map(complaint -> {
			ComplaintDTO c = mapper.map(complaint, ComplaintDTO.class);
			c.setBookingId(complaint.getBookingId().getId());
			return c;
		}).collect(Collectors.toList());
	}

	@DeleteMapping("/complaints/resolveComplaint/{id}")
	public ResponseEntity<?> resolveComplaint(@PathVariable Integer id) {
		aService.resolveComplaint(id);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
}
