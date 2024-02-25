package site.opcab.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.opcab.entities.PassengerWallet;

public interface PassengerWalletDao extends JpaRepository<PassengerWallet, Integer> {

	Optional<PassengerWallet> findByPassengerId(Integer id);

	Optional<PassengerWallet> findByPassengerEmail(String email);

}
