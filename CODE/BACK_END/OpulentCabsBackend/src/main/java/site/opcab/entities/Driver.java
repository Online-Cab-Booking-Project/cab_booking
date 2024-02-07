package site.opcab.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

public class Driver extends User {

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn
	private Wallet wallet;

	@Column(length = 10)
	private String vehno;
	
	@Column(length = 10)
	private String vehcolor;
	
	@Column(length = 10)
	private String vehname;
	
	@Column(length = 10)
	private String vehtype;
	
	@Enumerated
	availability;
}
