package site.opcab.dto;

import java.util.List;

public class PathOutputDTO {

	private List<Point> path;
	private Double cost;

	public PathOutputDTO() {
		// TODO Auto-generated constructor stub
	}

	public PathOutputDTO(List<Point> path, Double cost) {
		this.path = path;
		this.cost = cost;
	}

	public List<Point> getPath() {
		return path;
	}

	public void setPath(List<Point> path) {
		this.path = path;
	}

	public Double getCost() {
		return cost;
	}

	public void setCost(Double cost) {
		this.cost = cost;
	}

}
