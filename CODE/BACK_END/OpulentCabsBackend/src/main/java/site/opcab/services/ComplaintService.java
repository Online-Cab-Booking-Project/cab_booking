package site.opcab.services;

import java.util.List;

import site.opcab.entities.BookingDetails;
import site.opcab.entities.Complaint;

public interface ComplaintService {

	public List<Complaint> getAllComplaints();

	public Complaint getComplaintById(Integer id);

	public void resolveComplaint(Integer complaintId);

}
