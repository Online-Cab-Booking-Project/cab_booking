package site.opcab.services;

import java.util.List;

import org.springframework.stereotype.Service;

import site.opcab.dto.ComplaintDTO;
import site.opcab.dto.PassengerDTO;
import site.opcab.dto.RideDTO;
import site.opcab.dto.WalletDTO;

public interface PassengerService {

	public PassengerDTO register(PassengerDTO passenger);

	public PassengerDTO login(String email, String password);

	public List<PassengerDTO> getAllPassenger();

	public PassengerDTO getAccountDetails(Integer id);

	public void updateAccountDetails(Integer id, PassengerDTO passenger);

	public List<RideDTO> getPreviousRideDetails(Integer id);

	public WalletDTO getWalletDetails(Integer id);

	public void updateBalanceDetails(Integer id, double balance);

	public List<ComplaintDTO> getAllComplaints(Integer id);

	public ComplaintDTO getComplaintById(Integer id);

	public void addComplaint(Integer id, ComplaintDTO complaint);

	public void resolveComplaint(Integer id);

}
