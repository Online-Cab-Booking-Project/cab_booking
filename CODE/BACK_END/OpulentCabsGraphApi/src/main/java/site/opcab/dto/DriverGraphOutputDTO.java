package site.opcab.dto;

public class DriverGraphOutputDTO {
	private Integer id;
	private Double distance;

	public DriverGraphOutputDTO() {
		// TODO Auto-generated constructor stub
	}

	public DriverGraphOutputDTO(Integer id, Double distance) {
		this.id = id;
		this.distance = distance;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Double getDistance() {
		return distance;
	}

	public void setDistance(Double distance) {
		this.distance = distance;
	}

}
