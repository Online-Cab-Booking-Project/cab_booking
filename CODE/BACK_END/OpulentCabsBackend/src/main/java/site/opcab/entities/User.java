package site.opcab.entities;

import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.*;

import site.opcab.entities.enums.EGender;
import site.opcab.entities.enums.ERole;

@MappedSuperclass
public abstract class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "first_name", length = 20)
	private String firstName;

	@Column(name = "last_name", length = 20)
	private String lastName;

	@Column(length = 50, unique = true, nullable = false)
	private String email;

	@Column(length = 255)
	private String address;

	@Column(name = "mobile_no", length = 12)
	private String mobileNo;

	@Enumerated(EnumType.STRING)
	private EGender gender;

	@Column(name = "date_of_birth")
	private LocalDate dob;

	@Column(name = "password")
	private String password;

	@Transient
	private ERole role;

	public User() {
		// TODO Auto-generated constructor stub
	}

	public User(Integer id, String firstName, String lastName, String email, String address, String mobileNo,
			EGender gender, LocalDate dob, String password, ERole role) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.address = address;
		this.mobileNo = mobileNo;
		this.gender = gender;
		this.dob = dob;
		this.password = password;
		this.role = role;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public EGender getGender() {
		return gender;
	}

	public void setGender(EGender gender) {
		this.gender = gender;
	}

	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}

	public ERole getRole() {
		return role;
	}

	public void setRole(ERole role) {
		this.role = role;
	}

	@Override
	public int hashCode() {
		return Objects.hash(email);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (!(obj instanceof User)) {
			return false;
		}
		User other = (User) obj;
		return Objects.equals(email, other.email);
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("User [id=").append(id).append(", firstName=").append(firstName).append(", lastName=")
				.append(lastName).append(", email=").append(email).append(", address=").append(address)
				.append(", mobileNo=").append(mobileNo).append(", gender=").append(gender).append(", dob=").append(dob)
				.append(", role=").append(role).append("]");
		return builder.toString();
	}

}
