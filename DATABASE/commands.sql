CREATE DATABASE IF NOT EXISTS opulent;
USE opulent;

CREATE TABLE wallets (
	wallet_id INT AUTO_INCREMENT PRIMARY KEY,
	wallet_balance DOUBLE
);

CREATE TABLE passengers (
	p_id INT AUTO_INCREMENT PRIMARY KEY,
	p_name_first VARCHAR(20) NOT NULL,
	p_name_last VARCHAR(20) NOT NULL,
	p_email VARCHAR(255) NOT NULL UNIQUE,
	p_password VARCHAR(255) NOT NULL,
	p_address TEXT(255),
	p_dob DATE,
	p_gender CHAR(1),
	p_wallet_id INT,
	CONSTRAINT FK_passengerwallet
	FOREIGN KEY (p_wallet_id)
	REFERENCES wallets(wallet_id)
	ON DELETE CASCADE
); 
	
DELIMITER //
CREATE TRIGGER after_insert_passenger
BEFORE INSERT
ON passengers FOR EACH ROW
BEGIN
  INSERT INTO wallets (wallet_balance) VALUES (0.0);
  SET NEW.p_wallet_id = LAST_INSERT_ID();
END;
//
DELIMITER ;
	

