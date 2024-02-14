package site.opcab.dto;

public class DriverGraphInputDTO {

	private Integer id;
	private Double xCoordinates;
	private Double yCoordinates;

	public DriverGraphInputDTO() {
		// TODO Auto-generated constructor stub
	}

	public DriverGraphInputDTO(Integer id, Double xCoordinates, Double yCoordinates) {
		this.id = id;
		this.xCoordinates = xCoordinates;
		this.yCoordinates = yCoordinates;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Double getxCoordinates() {
		return xCoordinates;
	}

	public void setxCoordinates(Double xCoordinates) {
		this.xCoordinates = xCoordinates;
	}

	public Double getyCoordinates() {
		return yCoordinates;
	}

	public void setyCoordinates(Double yCoordinates) {
		this.yCoordinates = yCoordinates;
	}

}
