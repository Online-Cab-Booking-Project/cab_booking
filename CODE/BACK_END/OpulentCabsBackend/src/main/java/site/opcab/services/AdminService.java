package site.opcab.services;

import java.util.Collection;
import java.util.List;

import site.opcab.dto.ApiResponse;
import site.opcab.dto.ComplaintDTO;
import site.opcab.entities.Complaint;

public interface AdminService {

	void resolveComplaint(Integer id);

	List<Complaint> getUnresolvedComplaints();

	List<Complaint> getResolvedComplaints();

}
