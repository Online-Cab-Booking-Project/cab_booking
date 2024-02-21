package site.opcab.entities;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import site.opcab.entities.enums.EDriverAnswer;

@Entity
@IdClass(BookingCallsPK.class)
public class BookingCalls {

	@Id
	@ManyToOne
	@JoinColumn(name = "booking_id")
	private BookingDetails booking;

	@Id
	@ManyToOne
	@JoinColumn(name = "driver_id")
	private Driver driver;

	@Enumerated(EnumType.STRING)
	private EDriverAnswer driverAnswer;

	public BookingCalls() {
		// TODO Auto-generated constructor stub
	}

	public BookingCalls(BookingDetails booking, Driver driver, EDriverAnswer driverAnswer) {
		this.booking = booking;
		this.driver = driver;
		this.driverAnswer = driverAnswer;
	}

//	public BookingCalls(BookingCallsPK compositeKey, EDriverAnswer driverAnswer) {
//		this.booking = compositeKey.getBooking();
//		this.driver = compositeKey.getDriver();
//		this.driverAnswer = driverAnswer;
//	}

	public BookingDetails getBooking() {
		return booking;
	}

	public void setBooking(BookingDetails booking) {
		this.booking = booking;
	}

	public Driver getDriver() {
		return driver;
	}

	public void setDriver(Driver driver) {
		this.driver = driver;
	}

	public EDriverAnswer getDriverAnswer() {
		return driverAnswer;
	}

	public void setDriverAnswer(EDriverAnswer driverAnswer) {
		this.driverAnswer = driverAnswer;
	}

}
