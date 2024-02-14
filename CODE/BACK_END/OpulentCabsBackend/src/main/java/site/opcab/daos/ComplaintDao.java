package site.opcab.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import site.opcab.entities.Complaint;

public interface ComplaintDao extends JpaRepository<Complaint, Integer> {

}
