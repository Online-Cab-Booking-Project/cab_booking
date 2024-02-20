package site.opcab.entities;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
@DiscriminatorValue("passenger")

public class PassengerWallet extends Wallet {

	@OneToOne
	@JoinColumn(name = "passenger_id")
	private Passenger passenger;

	public PassengerWallet() {
		// TODO Auto-generated constructor stub
	}

	public PassengerWallet(double balance, Passenger passenger) {
		super(balance);
		this.passenger = passenger;
	}

	public Passenger getPassenger() {
		return passenger;
	}

	public void setPassenger(Passenger passenger) {
		this.passenger = passenger;
	}

}
