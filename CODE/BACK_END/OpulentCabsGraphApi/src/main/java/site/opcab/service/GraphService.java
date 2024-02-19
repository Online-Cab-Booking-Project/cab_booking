package site.opcab.service;

import java.util.List;

import site.opcab.dto.DriverGraphInputDTO;
import site.opcab.dto.DriverGraphOutputDTO;
import site.opcab.dto.PathOutputDTO;
import site.opcab.enitites.Vertex;

public interface GraphService {

	PathOutputDTO findShortestPath(Vertex source, Vertex destination);

	Vertex findNearestVertex(List<Double> coordinates);

	List<DriverGraphOutputDTO> getDriverDistances(Vertex source, List<DriverGraphInputDTO> driverList);

	List<Vertex> getNamedNodes();
}
