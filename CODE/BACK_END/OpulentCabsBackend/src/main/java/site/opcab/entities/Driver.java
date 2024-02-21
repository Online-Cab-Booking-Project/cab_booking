package site.opcab.entities;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.OneToOne;

import site.opcab.entities.enums.EAvailability;
import site.opcab.entities.enums.EGender;
import site.opcab.entities.enums.ERole;

@Entity
public class Driver extends User implements Serializable {

	{
		this.setRole(ERole.D);
	}

	@OneToOne(mappedBy = "driver", cascade = CascadeType.ALL, orphanRemoval = true)
	private DriverWallet wallet;

	@Column(name = "x_coordinates")
	private Double xCoordinates;

	@Column(name = "y_coordinates")
	private Double yCoordinates;

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

	public Driver(DriverWallet wallet, Double xCoordinates, Double yCoordinates, String vehno, String vehcolor,
			String vehname, String vehtype, EAvailability availability) {
		this.wallet = wallet;
		this.xCoordinates = xCoordinates;
		this.yCoordinates = yCoordinates;
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

	public Double getxCoordinates() {
		return xCoordinates;
	}

	public void setxCoordinates(Double xCoordinates) {
		this.xCoordinates = xCoordinates;
	}

	public Double getyCoordinates() {
		return yCoordinates;
	}

	public void setyCoordinates(Double yCoordinates) {
		this.yCoordinates = yCoordinates;
	}

}
