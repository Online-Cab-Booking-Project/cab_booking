package site.opcab.entities;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
@DiscriminatorValue("driver")
public class DriverWallet extends Wallet {

	@OneToOne
	@JoinColumn(name = "driver_id")
	private Driver driver;

	public DriverWallet() {
		// TODO Auto-generated constructor stub
	}

	public DriverWallet(double balance, Driver driver) {
		super(balance);
		this.driver = driver;
	}

	public Driver getDriver() {
		return driver;
	}

	public void setDriver(Driver driver) {
		this.driver = driver;
	}

}
