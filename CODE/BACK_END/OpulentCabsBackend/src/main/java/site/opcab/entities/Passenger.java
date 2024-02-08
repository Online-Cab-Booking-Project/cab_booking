package site.opcab.entities;

import java.time.LocalDate;

import javax.persistence.*;

@Entity
public class Passenger extends User {
	@OneToOne(mappedBy = "passenger", cascade = CascadeType.ALL, orphanRemoval = true)
	private PassengerWallet wallet;

	public PassengerWallet getWallet() {
		return wallet;
	}

	public void setWallet(PassengerWallet wallet) {
		this.wallet = wallet;
	}

	public Passenger() {
		// TODO Auto-generated constructor stub
	}

	public Passenger(int id, String firstName, String lastName, String email, String address, String mobileNo,
			EGender gender, LocalDate dob, PassengerWallet wallet) {
		super(id, firstName, lastName, email, address, mobileNo, gender, dob);
		this.wallet = wallet;
	}

	public void addWallet(PassengerWallet wallet) {
		this.wallet = wallet;
		wallet.setPassenger(this);
	}

}
