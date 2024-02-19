package site.opcab.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SigninResponse {
	@JsonProperty(value = "JWT_TOKEN")
	private String jwt;

	@JsonProperty(value = "message")
	private String mesg;

	public SigninResponse() {
		super();
	}

	public SigninResponse(String jwt, String mesg) {
		super();
		this.jwt = jwt;

		this.mesg = mesg;
	}

	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

	public String getMesg() {
		return mesg;
	}

	public void setMesg(String mesg) {
		this.mesg = mesg;
	}

}
