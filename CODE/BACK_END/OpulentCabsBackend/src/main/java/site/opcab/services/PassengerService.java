package site.opcab.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import site.opcab.dto.BookingInputDTO;
import site.opcab.dto.DriverGraphOutputDTO;
import site.opcab.dto.InputCoordinateDto;
import site.opcab.dto.PassengerDTO;
import site.opcab.dto.PathInputFromGraph;
import site.opcab.dto.RideDTO;
import site.opcab.dto.SourceInputDto;
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

	public ResponseEntity<String> updateBalanceDetails(Integer id, double balance);

	public List<Complaint> getAllComplaints(Integer id);

	public Complaint getComplaintById(Integer id);

	public void addComplaint(Integer booking_id, Complaint complaint);

	public void resolveComplaint(Integer id);

	public PathInputFromGraph computePath(InputCoordinateDto path);

	public List<DriverGraphOutputDTO> getDriversList(BookingInputDTO inputDetails, SourceInputDto source);

}
