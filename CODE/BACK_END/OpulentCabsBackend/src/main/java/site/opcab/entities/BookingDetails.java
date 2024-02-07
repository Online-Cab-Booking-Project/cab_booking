package site.opcab.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class BookingDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "passenger_id")
	private Passenger passenger;

	@ManyToOne
	@JoinColumn(name = "driver_id")
	private Driver driver;

	@Column(name = "booking_date")
	private LocalDate bookingDate;

	@Column(name = "booking_time")
	private LocalTime bookingTime;

	@Column(name = "pickup_address")
	private String pickupAddress;

	@Column(name = "dropoff_address")
	private String dropoffAddress;

	@Enumerated(EnumType.STRING)
	private EBookingStatus status;

	@Column(name = "passenger_feedback")
	private String passengerFeedBack;

	@Column(name = "driver_feedback")
	private String driverFeedBack;

	public BookingDetails() {
		// TODO Auto-generated constructor stub
	}

	public BookingDetails(Integer id, Passenger passenger, Driver driver, LocalDate bookingDate, LocalTime bookingTime,
			String pickupAddress, String dropoffAddress, EBookingStatus status, String passengerFeedBack,
			String driverFeedBack) {
		this.id = id;
		this.passenger = passenger;
		this.driver = driver;
		this.bookingDate = bookingDate;
		this.bookingTime = bookingTime;
		this.pickupAddress = pickupAddress;
		this.dropoffAddress = dropoffAddress;
		this.status = status;
		this.passengerFeedBack = passengerFeedBack;
		this.driverFeedBack = driverFeedBack;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Passenger getPassenger() {
		return passenger;
	}

	public void setPassenger(Passenger passenger) {
		this.passenger = passenger;
	}

	public Driver getDriver() {
		return driver;
	}

	public void setDriver(Driver driver) {
		this.driver = driver;
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

	@Override
	public int hashCode() {
		return Objects.hash(bookingTime, driver, passenger, status);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof BookingDetails)) {
			return false;
		}
		BookingDetails other = (BookingDetails) obj;
		return Objects.equals(bookingTime, other.bookingTime) && Objects.equals(driver, other.driver)
				&& Objects.equals(passenger, other.passenger) && status == other.status;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("BookingDetails [id=").append(id).append(", passenger=").append(passenger).append(", driver=")
				.append(driver).append(", bookingDate=").append(bookingDate).append(", bookingTime=")
				.append(bookingTime).append(", pickupAddress=").append(pickupAddress).append(", dropoffAddress=")
				.append(dropoffAddress).append(", status=").append(status).append(", passengerFeedBack=")
				.append(passengerFeedBack).append(", driverFeedBack=").append(driverFeedBack).append("]");
		return builder.toString();
	}

}
