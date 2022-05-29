CREATE DATABASE db_test;

USE db_test; 

CREATE TABLE contact(
    id INT(10) NOT NULL,
    sex VARCHAR(10) NOT NULL,
    date_birthday DATE NOT NULL,
    name VARCHAR(10) NOT NULL,
    last_name VARCHAR(15) NOT NULL,
    email VARCHAR(25) NOT NULL,
    address VARCHAR(25) NOT NULL, 
    country VARCHAR(15) NOT NULL, 
    state VARCHAR(25) NOT NULL,
    city VARCHAR(25) NOT NULL,
    comment VARCHAR(25)

);

ALTER TABLE contact
  ADD PRIMARY KEY (id);

ALTER TABLE contact
  MODIFY id INT(10) NOT NULL, AUTO_INCREMENT = 1;