package site.opcab.dto;

import java.io.Serializable;

public class Point implements Serializable {

	private static final long serialVersionUID = 249388244652703313L;

	private Double x;
	private Double y;

	public Point() {
		// TODO Auto-generated constructor stub
	}

	public Point(Double x, Double y) {
		super();
		this.x = x;
		this.y = y;
	}

	public Double getX() {
		return x;
	}

	public void setX(Double x) {
		this.x = x;
	}

	public Double getY() {
		return y;
	}

	public void setY(Double y) {
		this.y = y;
	}

}
