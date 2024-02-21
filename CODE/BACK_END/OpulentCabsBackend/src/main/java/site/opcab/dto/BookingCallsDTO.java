package site.opcab.dto;

import site.opcab.entities.enums.EDriverAnswer;

public class BookingCallsDTO {

	private Integer bookingId;
	private Integer driverId;
	private EDriverAnswer driverAnswer;

	public BookingCallsDTO(Integer bookingId, Integer driverId, EDriverAnswer driverAnswer) {
		this.bookingId = bookingId;
		this.driverId = driverId;
		this.driverAnswer = driverAnswer;
	}

	public Integer getBookingId() {
		return bookingId;
	}

	public void setBookingId(Integer bookingId) {
		this.bookingId = bookingId;
	}

	public Integer getDriverId() {
		return driverId;
	}

	public void setDriverId(Integer driverId) {
		this.driverId = driverId;
	}

	public EDriverAnswer getDriverAnswer() {
		return driverAnswer;
	}

	public void setDriverAnswer(EDriverAnswer driverAnswer) {
		this.driverAnswer = driverAnswer;
	}

}
