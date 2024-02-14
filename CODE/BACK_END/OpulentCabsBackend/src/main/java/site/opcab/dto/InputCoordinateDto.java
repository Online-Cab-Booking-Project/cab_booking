package site.opcab.dto;

public class InputCoordinateDto {

	private Double sourceX;
	private Double sourceY;
	private Double destX;
	private Double destY;

	public InputCoordinateDto() {
		// TODO Auto-generated constructor stub
	}

	public InputCoordinateDto(Double sourceX, Double sourceY, Double destX, Double destY) {
		super();
		this.sourceX = sourceX;
		this.sourceY = sourceY;
		this.destX = destX;
		this.destY = destY;
	}

	public Double getSourceX() {
		return sourceX;
	}

	public void setSourceX(Double sourceX) {
		this.sourceX = sourceX;
	}

	public Double getSourceY() {
		return sourceY;
	}

	public void setSourceY(Double sourceY) {
		this.sourceY = sourceY;
	}

	public Double getDestX() {
		return destX;
	}

	public void setDestX(Double destX) {
		this.destX = destX;
	}

	public Double getDestY() {
		return destY;
	}

	public void setDestY(Double destY) {
		this.destY = destY;
	}

}
