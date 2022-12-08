CREATE DATABASE advenChat;
USE advenChat;

CREATE TABLE usuario (
id int primary key auto_increment,
nome varchar(100),
email varchar(100),
telefone char(15),
dtNascimento varchar(15),
senha varchar(50));

INSERT INTO usuario (nome, email, telefone, dtNascimento, senha) VALUES ("Pedro", "lucaspires2322@gmail.com", "(11) 94725-4880", "2003-11-11", "brasil.12");

SELECT * FROM usuario;

CREATE TABLE publicacao (
id int primary key auto_increment,
descricao varchar(738),
horaPublicacao DATETIME default current_timestamp,
statusPublicacao varchar(7),
fk_usuario int,
foreign key (fk_usuario)
references usuario(id));

INSERT INTO publicacao(descricao, statusPublicacao, fk_usuario) VALUES ("Apenas um teste", "amigos", 1);

select * from publicacao;

SELECT pub.descricao, time_format(pub.horaPublicacao, '%h:%i') AS horaPublicacao, usu.nome 
FROM publicacao AS pub 
JOIN usuario AS usu
ON pub.fk_usuario = usu.id
ORDER BY pub.id DESC;

/*Usar isso pra pegar a hora formata e jogar no html do post*/
select TIME_FORMAT(horaPublicacao, '%h:%i') AS HORA_FORMATADA from publicacao;