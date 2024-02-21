package site.opcab.dto;

import site.opcab.entities.enums.EComplaintStatus;

public class ComplaintDTO {

	private Integer complaintId;

	private Integer bookingId;

	private EComplaintStatus complaintStatus;

	private String adminComment;

	private String description;

	public Integer getComplaintId() {
		return complaintId;
	}

	public void setComplaintId(Integer complaintId) {
		this.complaintId = complaintId;
	}

	public Integer getBookingId() {
		return bookingId;
	}

	public void setBookingId(Integer bookingId) {
		this.bookingId = bookingId;
	}

	public EComplaintStatus getComplaintStatus() {
		return complaintStatus;
	}

	public void setComplaintStatus(EComplaintStatus complaintStatus) {
		this.complaintStatus = complaintStatus;
	}

	public String getAdminComment() {
		return adminComment;
	}

	public void setAdminComment(String adminComment) {
		this.adminComment = adminComment;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
