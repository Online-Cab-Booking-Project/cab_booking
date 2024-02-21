package site.opcab.dto;

public class BookingAndSourceDTO {
	private BookingInputDTO inputDetails;
	private SourceInputDto source;

	public BookingInputDTO getInputDetails() {
		return inputDetails;
	}

	public void setInputDetails(BookingInputDTO inputDetails) {
		this.inputDetails = inputDetails;
	}

	public SourceInputDto getSource() {
		return source;
	}

	public void setSource(SourceInputDto source) {
		this.source = source;
	}

}
