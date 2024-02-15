package site.opcab.dto;

import java.util.List;

public class PathDTO {

	private List<Point> finalPath;
	private Double cost;

	public PathDTO() {
		// TODO Auto-generated constructor stub
	}

	public PathDTO(List<Point> finalPath, Double cost) {
		super();
		this.finalPath = finalPath;
		this.cost = cost;
	}

	public List<Point> getFinalPath() {
		return finalPath;
	}

	public void setFinalPath(List<Point> finalPath) {
		this.finalPath = finalPath;
	}

	public Double getCost() {
		return cost;
	}

	public void setCost(Double cost) {
		this.cost = cost;
	}

}
