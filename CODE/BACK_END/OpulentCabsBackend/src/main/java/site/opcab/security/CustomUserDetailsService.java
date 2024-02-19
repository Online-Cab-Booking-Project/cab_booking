package site.opcab.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import site.opcab.daos.DriverDao;
import site.opcab.daos.PassengerDao;
import site.opcab.entities.Driver;
import site.opcab.entities.Passenger;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {
	@Autowired
	private PassengerDao pdao;

	@Autowired
	private DriverDao ddao;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("inside load userby username");
		Optional<Passenger> passenger = pdao.findByEmail(email);
		System.out.println(passenger);

		if (passenger.isEmpty()) {
			Driver driver = ddao.findByEmail(email)
					.orElseThrow(() -> new UsernameNotFoundException("Email not found!!!!"));
			System.out.println(driver);
			return new CustomUserDetails(driver);
		}

		return new CustomUserDetails(passenger.get());
	}

}
