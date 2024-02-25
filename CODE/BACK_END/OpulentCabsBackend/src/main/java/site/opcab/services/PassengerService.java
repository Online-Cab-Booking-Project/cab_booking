package site.opcab.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import site.opcab.dto.BookingCallsDTO;
import site.opcab.dto.BookingDetailDTO;
import site.opcab.dto.BookingInputDTO;
import site.opcab.dto.DriverGraphOutputDTO;
import site.opcab.dto.InputCoordinateDto;
import site.opcab.dto.PassengerDTO;
import site.opcab.dto.PathInputFromGraph;
import site.opcab.dto.RideDTO;
import site.opcab.dto.SourceInputDto;
import site.opcab.entities.BookingCalls;
import site.opcab.entities.BookingDetails;
import site.opcab.entities.Complaint;
import site.opcab.dto.PassengerWalletDTO;

public interface PassengerService {

	public PassengerDTO register(PassengerDTO passenger);

	public PassengerDTO login(String email, String password);

	public List<PassengerDTO> getAllPassenger();

	public PassengerDTO getAccountDetails(String email);

	public void updateAccountDetails(String email, PassengerDTO passenger);

	public List<RideDTO> getPreviousRideDetails(String email);

	public PassengerWalletDTO getWalletDetails(Integer id);

	public ResponseEntity<String> updateBalanceDetails(String email, double balance);

	public List<Complaint> getAllComplaints(Integer id);

	public Complaint getComplaintById(Integer id);

	public void addComplaint(Integer booking_id, Complaint complaint);

	public PathInputFromGraph computePath(InputCoordinateDto path);

	public List<DriverGraphOutputDTO> getDriversList(SourceInputDto source);

	public BookingDetails addBookingDetails(String email, BookingInputDTO inputDetails);

	public BookingCalls addCall(BookingCallsDTO callDetails);

	public BookingCallsDTO getDriverAnswer(Integer bookingId, Integer driverId);

	public BookingCallsDTO updateBookingCallStatus(BookingCallsDTO call);

	public boolean updateBookingStatus(BookingDetailDTO detail);

}
