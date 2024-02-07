package site.opcab.dto;

	import com.fasterxml.jackson.annotation.JsonProperty;

	import lombok.AllArgsConstructor;
	import lombok.Getter;
	import lombok.NoArgsConstructor;
	import lombok.Setter;
	import lombok.ToString;


	@Getter
	@Setter
	@ToString
	public class DriverDTO {	
		 private Long id;
		    private String firstName;
		    private String lastName;
		    private String email;
		    private String phoneNumber;
		    private String licenseNumber;
		    private String carModel;
		    private String carRegistrationNumber;
		
			
	}

