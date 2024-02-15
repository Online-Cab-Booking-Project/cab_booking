package site.opcab.daos;

import org.springframework.data.jpa.repository.JpaRepository;

import site.opcab.entities.Wallet;

public interface WalletDao extends JpaRepository<Wallet, Integer> {

}
