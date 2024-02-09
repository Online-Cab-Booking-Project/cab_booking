package site.opcab.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import site.opcab.entities.BookingDetails;
import site.opcab.entities.enums.EComplaintStatus;

public class ComplaintDTO {

	@JsonProperty(access = Access.READ_ONLY)
	private Integer complaint_id;

	@JsonProperty(access = Access.READ_ONLY)
	private EComplaintStatus status;

	@JsonProperty(access = Access.READ_ONLY)
	private BookingDetails booking_id;

	private String description;

	public ComplaintDTO() {
	}

	public ComplaintDTO(Integer complaint_id, EComplaintStatus status, BookingDetails booking_id, String description) {
		this.complaint_id = complaint_id;
		this.status = status;
		this.booking_id = booking_id;
		this.description = description;
	}

	public Integer getComplaint_id() {
		return complaint_id;
	}

	public void setComplaint_id(Integer complaint_id) {
		this.complaint_id = complaint_id;
	}

	public EComplaintStatus getStatus() {
		return status;
	}

	public void setStatus(EComplaintStatus status) {
		this.status = status;
	}

	public BookingDetails getBooking_id() {
		return booking_id;
	}

	public void setBooking_id(BookingDetails booking_id) {
		this.booking_id = booking_id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
