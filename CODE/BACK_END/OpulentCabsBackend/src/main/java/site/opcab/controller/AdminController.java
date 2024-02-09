package site.opcab.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import site.opcab.dto.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@GetMapping("/dashboard")
	public String adminDashboard() {
		return "Welcome to Admin Dashboard!";
	}

	public ApiResponse getAllDrivers() {

	}

	public ApiResponse getAllPassenger() {

	}

	public ApiResponse ride() {

	}

}
