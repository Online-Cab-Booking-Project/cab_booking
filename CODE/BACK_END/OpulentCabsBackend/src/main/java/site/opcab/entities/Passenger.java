package site.opcab.entities;

import java.time.LocalDate;

import javax.persistence.*;

import site.opcab.entities.enums.EGender;
import site.opcab.entities.enums.ERole;

@Entity
public class Passenger extends User {
	@OneToOne(mappedBy = "passenger", cascade = CascadeType.ALL, orphanRemoval = true)
	private PassengerWallet wallet;

	{
		this.setRole(ERole.P);
	}

	public PassengerWallet getWallet() {
		return wallet;
	}

	public void setWallet(PassengerWallet wallet) {
		this.wallet = wallet;
	}

	public Passenger() {
		// TODO Auto-generated constructor stub
	}

	public Passenger(PassengerWallet wallet) {
		super();
		this.wallet = wallet;
	}

	public void addWallet(PassengerWallet wallet) {
		this.wallet = wallet;
		wallet.setPassenger(this);
	}

	public void updateBalance(double balance) {
		this.wallet.setBalance(this.wallet.getBalance() + balance);
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Passenger [wallet=").append(wallet).append("]");
		return builder.toString();
	}

	
}
