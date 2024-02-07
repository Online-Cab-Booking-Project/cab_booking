package site.opcab.entities;

import javax.persistence.*;

@Entity
public class Passenger extends User {
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn
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
			Wallet wallet) {
		super(id, firstName, lastName, email, address, mobileNo);
		this.wallet = wallet;
	}

	public void addWallet(Wallet wallet) {
		this.wallet = wallet;
		wallet.setUser(this);
	}
}
