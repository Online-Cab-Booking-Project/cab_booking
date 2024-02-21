package site.opcab.services.impl;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import site.opcab.daos.ComplaintDao;
import site.opcab.daos.DriverDao;
import site.opcab.daos.PassengerDao;
import site.opcab.entities.Complaint;
import site.opcab.entities.enums.EComplaintStatus;
import site.opcab.services.AdminService;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

	@Autowired
	private ComplaintDao cdao;
	@Autowired
	private DriverDao ddao;
	@Autowired
	private PassengerDao pdao;

	@Override
	public void resolveComplaint(Integer id) {
		Complaint complaint = getComplaintById(id);
		complaint.setComplaintStatus(EComplaintStatus.R);
	}

	public Complaint getComplaintById(Integer id) {
		return cdao.findById(id).orElseThrow(() -> new EntityNotFoundException());
	}

	@Override
	public List<Complaint> getUnresolvedComplaints() {
		return cdao.findByComplaintStatus(EComplaintStatus.L);

	}

	@Override
	public List<Complaint> getResolvedComplaints() {
		return cdao.findByComplaintStatus(EComplaintStatus.R);
	}

}
