package site.opcab.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;



public class RideDTO {
	private Long id;
    private Long passengerId;
    private Long driverId;
    private String startLocation;
    private String endLocation;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Double fare;
    private String status;
    
    
    
    
    
    
	public RideDTO() {
		super();
	}
	public RideDTO(Long id, Long passengerId, Long driverId, String startLocation, String endLocation,
			LocalDateTime startTime, LocalDateTime endTime, Double fare, String status) {
		super();
		this.id = id;
		this.passengerId = passengerId;
		this.driverId = driverId;
		this.startLocation = startLocation;
		this.endLocation = endLocation;
		this.startTime = startTime;
		this.endTime = endTime;
		this.fare = fare;
		this.status = status;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getPassengerId() {
		return passengerId;
	}
	public void setPassengerId(Long passengerId) {
		this.passengerId = passengerId;
	}
	public Long getDriverId() {
		return driverId;
	}
	public void setDriverId(Long driverId) {
		this.driverId = driverId;
	}
	public String getStartLocation() {
		return startLocation;
	}
	public void setStartLocation(String startLocation) {
		this.startLocation = startLocation;
	}
	public String getEndLocation() {
		return endLocation;
	}
	public void setEndLocation(String endLocation) {
		this.endLocation = endLocation;
	}
	public LocalDateTime getStartTime() {
		return startTime;
	}
	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}
	public LocalDateTime getEndTime() {
		return endTime;
	}
	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
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
	@Override
	public String toString() {
		return "RideDTO [id=" + id + ", passengerId=" + passengerId + ", driverId=" + driverId + ", startLocation="
				+ startLocation + ", endLocation=" + endLocation + ", startTime=" + startTime + ", endTime=" + endTime
				+ ", fare=" + fare + ", status=" + status + "]";
	}
    
    
    
}
