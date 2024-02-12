package site.opcab.dto;  

import java.time.LocalDateTime;

//DTO :  resp DTO : to send API resp from rest server ---> rest clnt

public class ApiResponse {
	private LocalDateTime timeStamp;
	private String message;
	public ApiResponse(String message) {
		super();
		this.message = message;
		this.timeStamp=LocalDateTime.now();
	}
	public LocalDateTime getTimeStamp() {
		return timeStamp;
	}
	public void setTimeStamp(LocalDateTime timeStamp) {
		this.timeStamp = timeStamp;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public ApiResponse(LocalDateTime timeStamp, String message) {
		super();
		this.timeStamp = timeStamp;
		this.message = message;
	}
	public ApiResponse() {
		super();
	}
	@Override
	public String toString() {
		return "ApiResponse [timeStamp=" + timeStamp + ", message=" + message + "]";
	}
	
	
	
}

