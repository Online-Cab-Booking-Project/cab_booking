package site.opcab.entities;

import java.time.LocalDate;

import javax.persistence.*;

@Entity
public class Passenger extends User {
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private Wallet wallet;

	public Wallet getWallet() {
		return wallet;
	}

	public void setWallet(Wallet wallet) {
		this.wallet = wallet;
	}

	public Passenger() {
		// TODO Auto-generated constructor stub
	}

	public Passenger(int id, String firstName, String lastName, String email, String address, String mobileNo,
			EGender gender, LocalDate dob, Wallet wallet) {
		super(id, firstName, lastName, email, address, mobileNo, gender, dob);
		this.wallet = wallet;
	}

	public void addWallet(Wallet wallet) {
		this.wallet = wallet;
		wallet.setUser(this);
	}
}
