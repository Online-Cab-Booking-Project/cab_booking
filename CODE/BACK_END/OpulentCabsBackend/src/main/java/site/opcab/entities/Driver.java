package site.opcab.entities;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.OneToOne;

import site.opcab.entities.enums.EAvailability;
import site.opcab.entities.enums.EGender;

@Entity
public class Driver extends User {

	@OneToOne(mappedBy = "driver", cascade = CascadeType.ALL, orphanRemoval = true)
	private DriverWallet wallet;

	@Column(length = 10)
	private String vehno;

	@Column(length = 10)
	private String vehcolor;

	@Column(length = 10)
	private String vehname;

	@Column(length = 10)
	private String vehtype;

	@Enumerated
	private EAvailability availability;

	public Driver() {
		// TODO Auto-generated constructor stub
	}

	public Driver(int id, String firstName, String lastName, String email, String address, String mobileNo,
			EGender gender, LocalDate dob, DriverWallet wallet, String vehno, String vehcolor, String vehname,
			String vehtype, EAvailability availability) {
		super(id, firstName, lastName, email, address, mobileNo, gender, dob);
		this.wallet = wallet;
		this.vehno = vehno;
		this.vehcolor = vehcolor;
		this.vehname = vehname;
		this.vehtype = vehtype;
		this.availability = availability;
	}

	public DriverWallet getWallet() {
		return wallet;
	}

	public void setWallet(DriverWallet wallet) {
		this.wallet = wallet;
	}

	public String getVehno() {
		return vehno;
	}

	public void setVehno(String vehno) {
		this.vehno = vehno;
	}

	public String getVehcolor() {
		return vehcolor;
	}

	public void setVehcolor(String vehcolor) {
		this.vehcolor = vehcolor;
	}

	public String getVehname() {
		return vehname;
	}

	public void setVehname(String vehname) {
		this.vehname = vehname;
	}

	public String getVehtype() {
		return vehtype;
	}

	public void setVehtype(String vehtype) {
		this.vehtype = vehtype;
	}

	public EAvailability getAvailability() {
		return availability;
	}

	public void setAvailability(EAvailability availability) {
		this.availability = availability;
	}

	public void addWallet(DriverWallet wallet) {
		this.wallet = wallet;
		wallet.setDriver(this);
	}
}
