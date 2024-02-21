package site.opcab.dto;

import site.opcab.entities.enums.EBookingStatus;

public class BookingDetailDTO {
	private Integer bookingId;
	private EBookingStatus status;
	private Integer driverId;

	public Integer getBookingId() {
		return bookingId;
	}

	public void setBookingId(Integer bookingId) {
		this.bookingId = bookingId;
	}

	public EBookingStatus getStatus() {
		return status;
	}

	public void setStatus(EBookingStatus status) {
		this.status = status;
	}

	public Integer getDriverId() {
		return driverId;
	}

	public void setDriverId(Integer driverId) {
		this.driverId = driverId;
	}

}
