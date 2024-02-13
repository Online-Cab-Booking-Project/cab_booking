package site.opcab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import site.opcab.service.*;
import site.opcab.dao.*;
import site.opcab.dto.DriverGraphInputDTO;
import site.opcab.dto.DriverGraphOutputDTO;
import site.opcab.dto.InputCoordinateDto;
import site.opcab.dto.PathOutputDTO;
import site.opcab.dto.Point;
import site.opcab.enitites.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/graph")
public class GraphController {

	@Autowired
	private GraphService graphService;

	@PostMapping("/getpath")
	public PathOutputDTO getShortestPath(@RequestBody InputCoordinateDto input) {

		List<Double> sourceCoordinates = new ArrayList<Double>();
		List<Double> destCoordinates = new ArrayList<Double>();
		sourceCoordinates.add(input.getSourceX());
		sourceCoordinates.add(input.getSourceY());
		destCoordinates.add(input.getDestX());
		destCoordinates.add(input.getDestY());

		Vertex source = graphService.findNearestVertex(sourceCoordinates);
		Vertex dest = graphService.findNearestVertex(destCoordinates);

		PathOutputDTO path = graphService.findShortestPath(source, dest);

		return path;
	}

	@PostMapping("/getdrivers")
	public List<DriverGraphOutputDTO> getDriverDistances(@RequestBody List<DriverGraphInputDTO> driverList,
			@RequestBody InputCoordinateDto input) {
		List<Double> sourceCoordinates = new ArrayList<Double>();
		sourceCoordinates.add(input.getSourceX());
		sourceCoordinates.add(input.getSourceY());
		Vertex source = graphService.findNearestVertex(sourceCoordinates);

		return graphService.getDriverDistances(source, driverList);
	}
}
