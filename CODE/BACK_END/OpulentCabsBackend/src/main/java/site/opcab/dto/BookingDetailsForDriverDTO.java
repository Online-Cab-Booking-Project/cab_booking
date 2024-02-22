package site.opcab.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import site.opcab.entities.Complaint;
import site.opcab.entities.enums.EBookingStatus;

public class BookingDetailsForDriverDTO {
	private Integer id;
	private LocalDate bookingDate;
	private LocalTime bookingTime;
	private String pickupAddress;
	private String dropoffAddress;
	private EBookingStatus status;
	private String passengerFeedBack;
	private String driverFeedBack;
	private List<Complaint> complaints;
	private Double fare;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDate getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(LocalDate bookingDate) {
		this.bookingDate = bookingDate;
	}

	public LocalTime getBookingTime() {
		return bookingTime;
	}

	public void setBookingTime(LocalTime bookingTime) {
		this.bookingTime = bookingTime;
	}

	public String getPickupAddress() {
		return pickupAddress;
	}

	public void setPickupAddress(String pickupAddress) {
		this.pickupAddress = pickupAddress;
	}

	public String getDropoffAddress() {
		return dropoffAddress;
	}

	public void setDropoffAddress(String dropoffAddress) {
		this.dropoffAddress = dropoffAddress;
	}

	public EBookingStatus getStatus() {
		return status;
	}

	public void setStatus(EBookingStatus status) {
		this.status = status;
	}

	public String getPassengerFeedBack() {
		return passengerFeedBack;
	}

	public void setPassengerFeedBack(String passengerFeedBack) {
		this.passengerFeedBack = passengerFeedBack;
	}

	public String getDriverFeedBack() {
		return driverFeedBack;
	}

	public void setDriverFeedBack(String driverFeedBack) {
		this.driverFeedBack = driverFeedBack;
	}

	public List<Complaint> getComplaints() {
		return complaints;
	}

	public void setComplaints(List<Complaint> complaints) {
		this.complaints = complaints;
	}

	public Double getFare() {
		return fare;
	}

	public void setFare(Double fare) {
		this.fare = fare;
	}

}
