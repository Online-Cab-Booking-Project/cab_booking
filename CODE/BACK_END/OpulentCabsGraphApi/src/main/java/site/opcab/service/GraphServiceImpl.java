package site.opcab.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import site.opcab.enitites.*;
import site.opcab.dao.*;
import site.opcab.dto.PathOutputDTO;
import site.opcab.dto.Point;

import javax.annotation.PostConstruct;
import java.util.*;

class Node {
	public Vertex vertex;
	public double distance;

	public Node(Vertex vertex, double distance) {
		this.vertex = vertex;
		this.distance = distance;
	}
}

@Service
public class GraphServiceImpl implements GraphService {

	@Autowired
	private EdgeDao edgeDao;

	@Autowired
	private VertexDao vertexDao;

	private Map<Vertex, List<Edge>> directedGraph;

	@PostConstruct
	public void initializeDirectedGraph() {
		directedGraph = getDirectedGraphFromDatabase();
		System.out.println("DirectedGraph created");
	}

	@Override
	public PathOutputDTO findShortestPath(Vertex source, Vertex destination) {
		Map<Vertex, Double> distanceMap = new HashMap<>();
		Map<Vertex, Vertex> predecessorMap = new HashMap<>();
		Double cost = 0.0;

		PriorityQueue<Node> minHeap = new PriorityQueue<>(
				Comparator.comparingDouble(node -> distanceMap.get(node.vertex)));
		distanceMap.put(source, 0.0);
		minHeap.add(new Node(source, 0.0));

		while (!minHeap.isEmpty()) {
			Node current = minHeap.poll();
			Vertex currentVertex = current.vertex;

			for (Edge neighbor : directedGraph.get(currentVertex)) {
				double newDistance = distanceMap.get(currentVertex) + neighbor.getWeight();
				if (!distanceMap.containsKey(neighbor.getDestinationVertex())
						|| newDistance < distanceMap.get(neighbor.getDestinationVertex())) {
					distanceMap.put(neighbor.getDestinationVertex(), newDistance);
					predecessorMap.put(neighbor.getDestinationVertex(), currentVertex);
					minHeap.add(new Node(neighbor.getDestinationVertex(), newDistance));
				}
			}
		}

		cost = distanceMap.get(destination) * 10;

		return getPathWithCoordinates(source, destination, predecessorMap, cost);
	}

	@Override
	public Vertex findNearestVertex(List<Double> coordinates) {
		double minDistance = Double.MAX_VALUE;
		Vertex nearestVertex = null;

		for (Map.Entry<Vertex, List<Edge>> entry : directedGraph.entrySet()) {
			Vertex vertex = entry.getKey();
			double distance = calculateDistance(coordinates, vertex);

			if (distance < minDistance) {
				minDistance = distance;
				nearestVertex = vertex;
			}
		}

		return nearestVertex;
	}

	private double calculateDistance(List<Double> coordinates, Vertex vertex) {
		double xDiff = coordinates.get(0) - vertex.getXCoordinates();
		double yDiff = coordinates.get(1) - vertex.getYCoordinates();
		return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
	}

	private PathOutputDTO getPathWithCoordinates(Vertex source, Vertex destination, Map<Vertex, Vertex> predecessorMap,
			Double cost) {
		PathOutputDTO pathOutput = new PathOutputDTO();
		List<Point> points = new ArrayList<>();

		for (Vertex currentVertex = destination; currentVertex != null; currentVertex = predecessorMap
				.get(currentVertex)) {
			points.add(new Point(currentVertex.getXCoordinates(), currentVertex.getYCoordinates()));
		}
		Collections.reverse(points);

		pathOutput.setPath(points);
		pathOutput.setCost(cost);

		return pathOutput;
	}

	private Map<Vertex, List<Edge>> getDirectedGraphFromDatabase() {
		List<Edge> edgeEntities = edgeDao.findAll();
		Map<Vertex, List<Edge>> directedGraph = new HashMap<>();

		for (Edge edgeEntity : edgeEntities) {
			Vertex sourceVertex = edgeEntity.getSourceVertex();
			Vertex destinationVertex = edgeEntity.getDestinationVertex();

			directedGraph.computeIfAbsent(sourceVertex, k -> new ArrayList<>()).add(edgeEntity);
			directedGraph.computeIfAbsent(destinationVertex, k -> new ArrayList<>()).add(edgeEntity);
			// In a directed graph, don't add the reverse edge
		}

		return directedGraph;
	}
}
