package site.opcab.dto;

import java.util.List;

public class PathInputFromGraph {

	private List<Point> path;
	private Double cost;

	public PathInputFromGraph() {
		// TODO Auto-generated constructor stub
	}

	public PathInputFromGraph(List<Point> path, Double cost) {
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

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Details : \npath=").append(path).append("\n cost=").append(cost);
		return builder.toString();
	}

}
