package site.opcab.dto;

public class SourceInputDto {

	private Double sourceX;
	private Double sourceY;

	public SourceInputDto() {
		// TODO Auto-generated constructor stub
	}

	public SourceInputDto(Double sourceX, Double sourceY) {
		super();
		this.sourceX = sourceX;
		this.sourceY = sourceY;
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
}
