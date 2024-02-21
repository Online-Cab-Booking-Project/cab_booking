package site.opcab.entities;

import java.io.Serializable;
import java.util.Objects;

//public class BookingCallsPK implements Serializable {
//
////	private static final long serialVersionUID = -14642207220822035L;
//	private BookingDetails booking;
//	private Driver driver;
//
//	public BookingCallsPK() {
//		// TODO Auto-generated constructor stub
//	}
//
//	public BookingCallsPK(BookingDetails booking, Driver driver) {
//		super();
//		this.booking = booking;
//		this.driver = driver;
//	}
//
//	@Override
//	public int hashCode() {
//		return Objects.hash(booking, driver);
//	}
//
//	@Override
//	public boolean equals(Object obj) {
//		if (this == obj) {
//			return true;
//		}
//		if (!(obj instanceof BookingCallsPK)) {
//			return false;
//		}
//		BookingCallsPK other = (BookingCallsPK) obj;
//		return Objects.equals(booking, other.booking) && Objects.equals(driver, other.driver);
//	}
//
//	public BookingDetails getBooking() {
//		return booking;
//	}
//
//	public void setBooking(BookingDetails booking) {
//		this.booking = booking;
//	}
//
//	public Driver getDriver() {
//		return driver;
//	}
//
//	public void setDriver(Driver driver) {
//		this.driver = driver;
//	}
//
//}

public class BookingCallsPK implements Serializable {

	private Integer booking;
	private Integer driver;

	public BookingCallsPK() {
		// TODO Auto-generated constructor stub
	}

	public BookingCallsPK(Integer booking, Integer driver) {
		this.booking = booking;
		this.driver = driver;
	}

	@Override
	public int hashCode() {
		return Objects.hash(booking, driver);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof BookingCallsPK)) {
			return false;
		}
		BookingCallsPK other = (BookingCallsPK) obj;
		return Objects.equals(booking, other.booking) && Objects.equals(driver, other.driver);
	}

	public Integer getBooking() {
		return booking;
	}

	public void setBooking(Integer booking) {
		this.booking = booking;
	}

	public Integer getDriver() {
		return driver;
	}

	public void setDriver(Integer driver) {
		this.driver = driver;
	}
}
