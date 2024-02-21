package site.opcab.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import site.opcab.entities.enums.EBookingStatus;

public class ConfirmationDTO {
//	@JsonProperty(value = "bookingId")
	private Integer id;

	private LocalDate bookingDate;

	private LocalTime bookingTime;

	private String pickupAddress;

	private String dropoffAddress;

	private EBookingStatus status;

	private Double fare;

	private List<DriverGraphOutputDTO> driverList;

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

	public Double getFare() {
		return fare;
	}

	public void setFare(Double fare) {
		this.fare = fare;
	}

	public List<DriverGraphOutputDTO> getDriverList() {
		return driverList;
	}

	public void setDriverList(List<DriverGraphOutputDTO> driverList) {
		this.driverList = driverList;
	}

}
