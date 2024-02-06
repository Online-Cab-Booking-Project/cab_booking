package site.opcab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import site.opcab.service.*;
import site.opcab.dao.*;
import site.opcab.dto.InputCoordinateDto;
import site.opcab.enitites.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/graph")
public class GraphController {

	@Autowired
	private GraphService graphService;

	@PostMapping("/getpath")
	public List<Double[]> getShortestPath(@RequestBody InputCoordinateDto input) {

		List<Double> sourceCoordinates = new ArrayList<Double>();
		List<Double> destCoordinates = new ArrayList<Double>();
		sourceCoordinates.add(input.getSourceX());
		sourceCoordinates.add(input.getSourceY());
		destCoordinates.add(input.getDestX());
		destCoordinates.add(input.getDestY());

		Vertex source = graphService.findNearestVertex(sourceCoordinates);
		Vertex dest = graphService.findNearestVertex(destCoordinates);

		return graphService.findShortestPath(source, dest);
	}
}
