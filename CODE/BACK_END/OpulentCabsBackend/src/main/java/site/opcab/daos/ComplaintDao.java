package site.opcab.daos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import site.opcab.entities.Complaint;
import site.opcab.entities.enums.EComplaintStatus;

public interface ComplaintDao extends JpaRepository<Complaint, Integer> {

	List<Complaint> findByBookingIdPassengerId(Integer id);

	List<Complaint> findByBookingIdDriverId(Integer id);

	List<Complaint> findByComplaintStatus(EComplaintStatus status);
}
