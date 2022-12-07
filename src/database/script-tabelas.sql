CREATE DATABASE teste;
USE teste;

CREATE TABLE usuario (
id int primary key auto_increment,
nome varchar(100),
email varchar(100),
telefone char(15),
dtNascimento varchar(15),
senha varchar(50));

SELECT * FROM usuario;