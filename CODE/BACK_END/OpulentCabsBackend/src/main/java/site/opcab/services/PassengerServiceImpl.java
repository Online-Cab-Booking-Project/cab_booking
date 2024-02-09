package site.opcab.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import site.opcab.dto.PassengerDTO;

@Service
@Transactional
public class PassengerServiceImpl implements PassengerService {

	@Override
	public PassengerDTO save(PassengerDTO passenger) {

		return null;
	}

}
