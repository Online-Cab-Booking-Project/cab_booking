package site.opcab.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import site.opcab.entities.enums.EBookingStatus;

public class BookingInputDTO {

	@NotBlank
	private Integer passengerId;

	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate bookingDate;

	@JsonFormat(pattern = "HH:mm:ss")
	private LocalTime bookingTime;

	@NotBlank
	private String pickupAddress;

	@NotBlank
	private String dropoffAddress;

	@JsonProperty(access = Access.READ_ONLY)
	private EBookingStatus status;

	private Double fare;

	{
		this.status = EBookingStatus.P;
	}

	public BookingInputDTO() {
		// TODO Auto-generated constructor stub
	}

	public BookingInputDTO(@NotBlank Integer passengerId, LocalDate bookingDate, LocalTime bookingTime,
			@NotBlank String pickupAddress, @NotBlank String dropoffAddress, Double fare) {
		this.passengerId = passengerId;
		this.bookingDate = bookingDate;
		this.bookingTime = bookingTime;
		this.pickupAddress = pickupAddress;
		this.dropoffAddress = dropoffAddress;
		this.fare = fare;
	}

	public Double getFare() {
		return fare;
	}

	public void setFare(Double fare) {
		this.fare = fare;
	}

	public Integer getPassengerId() {
		return passengerId;
	}

	public void setPassengerId(Integer passengerId) {
		this.passengerId = passengerId;
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

}
