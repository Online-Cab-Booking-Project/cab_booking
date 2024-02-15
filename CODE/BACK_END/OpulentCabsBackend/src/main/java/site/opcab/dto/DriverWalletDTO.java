package site.opcab.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import site.opcab.entities.Driver;

public class DriverWalletDTO {

	private Integer walletId;
	private Double balance;
	@JsonProperty(access = Access.WRITE_ONLY)
	private Driver driver;

	public DriverWalletDTO() {
		// TODO Auto-generated constructor stub
	}

	public DriverWalletDTO(Integer walletId, Double balance, Driver driver) {
		this.walletId = walletId;
		this.balance = balance;
		this.driver = driver;
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

	public Driver getDriver() {
		return driver;
	}

	public void setDriver(Driver driver) {
		this.driver = driver;
	}

}
