package site.opcab.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

public class SigninRequest {

	@NotBlank(message = "Email can't be blank")
	@Email(message = "Invalid email format")
	private String email;

	@NotBlank
	@Length(min = 3, max = 20, message = "Invalid password length")
	private String password;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "SigninRequest [email=" + email + ", password=" + password + "]";
	}

}
