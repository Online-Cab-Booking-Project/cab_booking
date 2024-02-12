package site.opcab.services;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import site.opcab.daos.ComplaintDao;
import site.opcab.entities.BookingDetails;
import site.opcab.entities.Complaint;

@Service
@Transactional
public class ComplaintServiceImpl implements ComplaintService {

	@Autowired
	private ComplaintDao cdao;

	@Override
	public List<Complaint> getAllComplaints() {
		return cdao.findAll();
	}

	@Override
	public Complaint getComplaintById(Integer id) {

		return cdao.findById(id).orElseThrow(() -> new EntityNotFoundException("Complaint not found"));
	}

	@Override
	public void addComplaint(BookingDetails bd, Complaint c) {
		c.setBookingId(bd);
		bd.setComplaint(c);
	}

	@Override
	public void resolveComplaint(BookingDetails bd, Complaint c) {

	}

}
