package site.opcab.services;

import org.springframework.stereotype.Service;

import site.opcab.dto.PassengerDTO;

public interface PassengerService {

	public PassengerDTO save(PassengerDTO passenger);

}
