package site.opcab.service;

import java.util.List;

import site.opcab.enitites.Vertex;

public interface GraphService {

	List<Double[]> findShortestPath(Vertex source, Vertex destination);

	Vertex findNearestVertex(List<Double> coordinates);
}
