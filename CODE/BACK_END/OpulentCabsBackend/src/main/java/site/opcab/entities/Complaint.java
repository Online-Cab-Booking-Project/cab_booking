package site.opcab.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import site.opcab.entities.enums.EComplaintStatus;

@Entity
public class Complaint {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer complaintId;

	@ManyToOne
	@JoinColumn(name = "booking_id")
	private BookingDetails bookingId;

	@Enumerated(EnumType.STRING)
	@Column(name = "complaint_status")
	private EComplaintStatus complaintStatus;

	@Column(name = "admin_comment")
	private String adminComment;

	private String description;

	public Complaint() {
		// TODO Auto-generated constructor stub
	}

	public Complaint(Integer complaintId, BookingDetails bookingId, EComplaintStatus complaintStatus,
			String adminComment, String description) {
		this.complaintId = complaintId;
		this.bookingId = bookingId;
		this.complaintStatus = complaintStatus;
		this.adminComment = adminComment;
		this.description = description;
	}

	public String getAdminComment() {
		return adminComment;
	}

	public void setAdminComment(String adminComment) {
		this.adminComment = adminComment;
	}

	public Integer getComplaintId() {
		return complaintId;
	}

	public void setComplaintId(Integer complaintId) {
		this.complaintId = complaintId;
	}

	public BookingDetails getBookingId() {
		return bookingId;
	}

	public void setBookingId(BookingDetails bookingId) {
		this.bookingId = bookingId;
	}

	public EComplaintStatus getComplaintStatus() {
		return complaintStatus;
	}

	public void setComplaintStatus(EComplaintStatus complaintStatus) {
		this.complaintStatus = complaintStatus;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Complaint [complaintId=").append(complaintId).append(", bookingId=").append(bookingId)
				.append(", complaintStatus=").append(complaintStatus).append(", description=").append(description)
				.append("]");
		return builder.toString();
	}

}
