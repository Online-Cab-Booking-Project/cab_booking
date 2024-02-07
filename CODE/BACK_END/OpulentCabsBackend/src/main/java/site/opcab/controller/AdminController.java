package site.opcab.controller;

import javax.validation.constraints.NotNull;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import site.opcab.dto.ApiResponse;
import site.opcab.dto.DriverDTO;
import site.opcab.dto.PassengerDTO;
import site.opcab.dto.ReportDTO;
import site.opcab.dto.RideDTO;
import site.opcab.service.DriverService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/dashboard")
    public String adminDashboard() {
        return "Welcome to Admin Dashboard!";
    }
    
    public ApiResponse getAllDrivers(){
		try {
			return .getAllDrivers();
		} catch (Exception e) {
			System.out.println(e);
			return new ApiResponse(e.getMessage());
		}
}
    
    public ApiResponse getAllPassenger(){
		try {
			return .getAllPassengers();
		} catch (Exception e) {
			System.out.println(e);
			return new ApiResponse(e.getMessage());
		}
}
    
    public ApiResponse ride() {
		try {
			return .getAllRides();
		} catch (Exception e) {
			System.out.println(e);
			return new ApiResponse(e.getMessage());
		}
}
 
    
    
    
}
