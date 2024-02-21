package site.opcab.dto;

import java.util.List;

public class DriverGraphAPICallDTO {

	private List<DriverGraphInputDTO> driverList;
	private SourceInputDto source;

	public DriverGraphAPICallDTO() {
		// TODO Auto-generated constructor stub
	}

	public DriverGraphAPICallDTO(List<DriverGraphInputDTO> driverList, SourceInputDto source) {
		this.driverList = driverList;
		this.source = source;
	}

	public List<DriverGraphInputDTO> getDriverList() {
		return driverList;
	}

	public void setDriverList(List<DriverGraphInputDTO> driverList) {
		this.driverList = driverList;
	}

	public SourceInputDto getSource() {
		return source;
	}

	public void setSource(SourceInputDto source) {
		this.source = source;
	}

}
