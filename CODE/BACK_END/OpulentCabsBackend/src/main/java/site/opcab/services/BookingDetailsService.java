package site.opcab.services;

import site.opcab.entities.BookingDetails;
import site.opcab.entities.Complaint;

public interface BookingDetailsService {

	public void addComplaint(BookingDetails bd, Complaint c);

}
