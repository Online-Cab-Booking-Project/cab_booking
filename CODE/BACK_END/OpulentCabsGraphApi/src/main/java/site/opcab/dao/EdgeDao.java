package site.opcab.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import site.opcab.enitites.Edge;

@Repository
public interface EdgeDao extends JpaRepository<Edge, Integer> {
}
