-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/* para workbench - local - desenvolvimento */
CREATE DATABASE bible_learning;
USE bible_learning;

/* Tabela de usuarios */
CREATE TABLE usuario (
id int primary key auto_increment,
nome varchar (45),
email varchar (70) unique,
senha varchar (15),
fk_parte_favorita int,
foreign key (fk_partes_favoritas) references partes_biblicas(id),
fk_partes_testamento int,
foreign key (fk_partes_testamento) references partes_testamento(id));

/* Tabela com os nomes das partes biblicas que o usuario pode votar */
CREATE TABLE partes_biblicas (
id int primary key auto_increment,
parte varchar (45));

INSERT INTO partes_biblicas (parte)
VALUES ('Pentateuco'),
  ('Livros históricos'),
  ('Livros poéticos'),
  ('Profetas maiores'),
  ('Profetas menores'),
  ('Evangelhos'),
  ('Histórico'),
  ('Epístolas ou carta'),
  ('Revelações');
  
/* Tabela com o nome dos testamentos (antigo e novo) */
CREATE TABLE partes_testamento (id int primary key auto_increment,
nome varchar(45));
  
INSERT INTO partes_testamento (nome)
VALUES ('Antigo testamento'),
  ('Novo testamento');

/* Tabela onde os posts feitos na parte de comunidade ficam salvos */
CREATE TABLE posts(
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(100),
descricao VARCHAR(500),
fk_usuario INT,
FOREIGN KEY (fk_usuario) REFERENCES usuario (id)
);

/* para sql server - remoto - produção */

CREATE TABLE usuario (
	id INT PRIMARY KEY IDENTITY(1,1),
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
);

CREATE TABLE aviso (
	id INT PRIMARY KEY IDENTITY(1,1),
	titulo VARCHAR(100),
    descricao VARCHAR(150),
	fk_usuario INT FOREIGN KEY REFERENCES usuario(id)
); 

CREATE TABLE medida (
	id INT PRIMARY KEY IDENTITY(1,1),
	temperatura DECIMAL,
	umidade DECIMAL,
	momento DATETIME,
	fk_aquario INT
);


