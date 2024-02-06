package site.opcab.entities;

import javax.persistence.*;

@Entity
public class Passenger extends User {
	@OneToOne
	@JoinColumn(name = "wallet_id")
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

	public Passenger(Wallet wallet) {
		super();
		this.wallet = wallet;
	}

}
