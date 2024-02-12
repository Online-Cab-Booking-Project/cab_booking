package site.opcab.dto;

	import com.fasterxml.jackson.annotation.JsonProperty;




	public class DriverDTO {	
		 private Long id;
		    private String firstName;
		    private String lastName;
		    private String email;
		    private String phoneNumber;
		    private String licenseNumber;
		    private String carModel;
		    private String carRegistrationNumber;
			public DriverDTO(Long id, String firstName, String lastName, String email, String phoneNumber,
					String licenseNumber, String carModel, String carRegistrationNumber) {
				super();
				this.id = id;
				this.firstName = firstName;
				this.lastName = lastName;
				this.email = email;
				this.phoneNumber = phoneNumber;
				this.licenseNumber = licenseNumber;
				this.carModel = carModel;
				this.carRegistrationNumber = carRegistrationNumber;
			}
			public DriverDTO() {
				super();
			}
			public Long getId() {
				return id;
			}
			public void setId(Long id) {
				this.id = id;
			}
			public String getFirstName() {
				return firstName;
			}
			public void setFirstName(String firstName) {
				this.firstName = firstName;
			}
			public String getLastName() {
				return lastName;
			}
			public void setLastName(String lastName) {
				this.lastName = lastName;
			}
			public String getEmail() {
				return email;
			}
			public void setEmail(String email) {
				this.email = email;
			}
			public String getPhoneNumber() {
				return phoneNumber;
			}
			public void setPhoneNumber(String phoneNumber) {
				this.phoneNumber = phoneNumber;
			}
			public String getLicenseNumber() {
				return licenseNumber;
			}
			public void setLicenseNumber(String licenseNumber) {
				this.licenseNumber = licenseNumber;
			}
			public String getCarModel() {
				return carModel;
			}
			public void setCarModel(String carModel) {
				this.carModel = carModel;
			}
			public String getCarRegistrationNumber() {
				return carRegistrationNumber;
			}
			public void setCarRegistrationNumber(String carRegistrationNumber) {
				this.carRegistrationNumber = carRegistrationNumber;
			}
			@Override
			public String toString() {
				return "DriverDTO [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email="
						+ email + ", phoneNumber=" + phoneNumber + ", licenseNumber=" + licenseNumber + ", carModel="
						+ carModel + ", carRegistrationNumber=" + carRegistrationNumber + "]";
			}
		
			
	}

