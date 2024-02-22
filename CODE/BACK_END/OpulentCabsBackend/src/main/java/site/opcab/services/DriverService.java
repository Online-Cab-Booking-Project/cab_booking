package site.opcab.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import site.opcab.dto.BookingCallsDTO;
import site.opcab.dto.DriverDTO;
import site.opcab.dto.DriverWalletDTO;
import site.opcab.dto.RideDTO;
import site.opcab.entities.BookingCalls;
import site.opcab.entities.Complaint;

public interface DriverService {

	public DriverDTO register(DriverDTO driver);

	public DriverDTO login(String email, String password);

	public List<DriverDTO> getAllDrivers();

	public DriverDTO getAccountDetails(String email);

	public void updateAccountDetails(String email, DriverDTO driver);

	public List<RideDTO> getPreviousRideDetails(String id);

	public DriverWalletDTO getWalletDetails(Integer id);

	public ResponseEntity<String> updateBalanceDetails(Integer id, double balance);

	public List<Complaint> getAllComplaints(Integer id);

	public Complaint getComplaintById(Integer id);

	public void addComplaint(Integer booking_id, Complaint complaint);

	public void resolveComplaint(Integer id);

	public List<BookingCalls> checkForCalls(String email);

	public BookingCallsDTO updateBookingCallStatus(BookingCallsDTO call);

}
