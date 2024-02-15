package site.opcab.dto;

import java.time.LocalDate;

import java.time.LocalTime;

import site.opcab.entities.Driver;
import site.opcab.entities.Passenger;

public class RideDTO {
	private Integer id;
	private Driver driver;
	private Passenger passenger;
	private String pickupAddress;
	private String dropoffAddress;
	private LocalTime bookingTime;
	private LocalDate bookingDate;
	private Double fare;
	private String status;

	public RideDTO() {
	}

	public RideDTO(Integer id, Driver driver, Passenger passenger, String pickupAddress, String dropoffAddress,
			LocalTime bookingTime, LocalDate bookingDate, Double fare, String status) {
		this.id = id;
		this.driver = driver;
		this.passenger = passenger;
		this.pickupAddress = pickupAddress;
		this.dropoffAddress = dropoffAddress;
		this.bookingTime = bookingTime;
		this.bookingDate = bookingDate;
		this.fare = fare;
		this.status = status;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Driver getDriver() {
		return driver;
	}

	public void setDriver(Driver driver) {
		this.driver = driver;
	}

	public Passenger getPassenger() {
		return passenger;
	}

	public void setPassenger(Passenger passenger) {
		this.passenger = passenger;
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

	public LocalTime getBookingTime() {
		return bookingTime;
	}

	public void setBookingTime(LocalTime bookingTime) {
		this.bookingTime = bookingTime;
	}

	public LocalDate getBookingDate() {
		return bookingDate;
	}

	public void setBookingDate(LocalDate bookingDate) {
		this.bookingDate = bookingDate;
	}

	public Double getFare() {
		return fare;
	}

	public void setFare(Double fare) {
		this.fare = fare;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
