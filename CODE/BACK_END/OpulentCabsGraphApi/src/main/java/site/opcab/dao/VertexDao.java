package site.opcab.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import site.opcab.enitites.Vertex;

@Repository
public interface VertexDao extends JpaRepository<Vertex, Integer> {

	List<Vertex> getByNameIsNotNull();
}
