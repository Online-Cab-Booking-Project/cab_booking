package site.opcab.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import site.opcab.daos.PassengerDao;
import site.opcab.entities.Passenger;

@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {
	@Autowired
	private PassengerDao pdao;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println("inside load userby username");
		Passenger p = pdao.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Email not found!!!!"));
		System.out.println(p);
		return new CustomUserDetails(p);
	}

}
