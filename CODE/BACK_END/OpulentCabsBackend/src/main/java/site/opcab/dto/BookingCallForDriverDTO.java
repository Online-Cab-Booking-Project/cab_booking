package site.opcab.dto;

import site.opcab.entities.BookingDetails;
import site.opcab.entities.enums.EDriverAnswer;

public class BookingCallForDriverDTO {
	private BookingDetailsForDriverDTO booking;
	private Integer driverId;
	private EDriverAnswer driverAnswer;

	public BookingDetailsForDriverDTO getBooking() {
		return booking;
	}

	public void setBooking(BookingDetailsForDriverDTO booking) {
		this.booking = booking;
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
