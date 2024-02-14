package site.opcab.enitites;

import javax.persistence.*;

@Entity
@Table(name = "nodes")
public class Vertex {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "name")
	private String name;

	@Column(name = "x_coordinates")
	private Double xCoordinates;

	@Column(name = "y_coordinates")
	private Double yCoordinates;

	public Vertex() {
	}

	public Vertex(String name, Double xCoordinates, Double yCoordinates) {
		this.name = name;
		this.xCoordinates = xCoordinates;
		this.yCoordinates = yCoordinates;
	}

	// Getters and setters

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getXCoordinates() {
		return xCoordinates;
	}

	public void setXCoordinates(Double xCoordinates) {
		this.xCoordinates = xCoordinates;
	}

	public Double getYCoordinates() {
		return yCoordinates;
	}

	public void setYCoordinates(Double yCoordinates) {
		this.yCoordinates = yCoordinates;
	}
}
