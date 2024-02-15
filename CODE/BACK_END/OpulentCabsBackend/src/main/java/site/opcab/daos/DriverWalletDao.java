package site.opcab.daos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.opcab.entities.DriverWallet;

public interface DriverWalletDao extends JpaRepository<DriverWallet, Integer> {

	Optional<DriverWallet> findByDriverId(Integer id);

}
