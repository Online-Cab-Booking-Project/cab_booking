package site.opcab.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import site.opcab.entities.Passenger;

public class PassengerWalletDTO {

	private Integer walletId;
	private Double balance;
	@JsonProperty(access = Access.WRITE_ONLY)
	private Passenger passenger;

	public PassengerWalletDTO() {
		// TODO Auto-generated constructor stub
	}

	public PassengerWalletDTO(Integer walletId, Double balance, Passenger passenger) {
		this.walletId = walletId;
		this.balance = balance;
		this.passenger = passenger;
	}

	public Integer getWalletId() {
		return walletId;
	}

	public void setWalletId(Integer walletId) {
		this.walletId = walletId;
	}

	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	public Passenger getPassenger() {
		return passenger;
	}

	public void setPassenger(Passenger passenger) {
		this.passenger = passenger;
	}

}
