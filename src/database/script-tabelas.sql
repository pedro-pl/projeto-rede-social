CREATE DATABASE advenChat;
USE advenChat;

CREATE TABLE usuario (
id int primary key auto_increment,
nome varchar(100),
email varchar(100),
telefone char(15),
dtNascimento varchar(15),
senha varchar(50),
statusUsuario varchar(7));

SELECT * FROM usuario;

CREATE TABLE publicacao (
id int primary key auto_increment,
descricao varchar(738),
horaPublicacao DATETIME default current_timestamp,
statusPublicacao varchar(7),
fk_usuario int,
foreign key (fk_usuario)
references usuario(id));

CREATE TABLE amigos (
id int primary key auto_increment,
fk_usuario int,
fk_amigo int,
foreign key (fk_usuario) references usuario(id),
foreign key (fk_amigo) references usuario(id));

INSERT INTO amigos (fk_usuario, fk_amigo) VALUES (2, 3);

SELECT * FROM amigos;

SELECT usu.nome as usuario, amg.nome as amigo
FROM usuario as usu
JOIN amigos as ami
ON ami.fk_usuario = usu.id
JOIN usuario as amg
ON ami.fk_amigo = amg.id
WHERE ami.fk_usuario = 1;

CREATE TABLE pedidosAmizade (
id int primary key auto_increment,
fk_usuario int,
fk_pedido int,
foreign key (fk_usuario) references usuario(id),
foreign key (fk_pedido) references usuario(id));

INSERT INTO pedidosAmizade (fk_usuario, fk_pedido) VALUES (2, 4);

/*query para função de exibir pedidos de amizade*/
SELECT usu.nome as usuario, amg.nome as amigo
FROM usuario as usu
JOIN pedidosAmizade as ped
ON ped.fk_usuario = usu.id
JOIN usuario as amg
ON ped.fk_pedido = amg.id
WHERE ped.fk_pedido = 4; /*substituir o 4 pelo id do usuario logado*/

select * from publicacao;

SELECT pub.id, pub.descricao, time_format(pub.horaPublicacao, '%h:%i') AS horaPublicacao, usu.nome 
FROM publicacao AS pub 
JOIN usuario AS usu
ON pub.fk_usuario = usu.id
ORDER BY pub.id DESC;

/*Usar isso pra pegar a hora formata e jogar no html do post*/
select TIME_FORMAT(horaPublicacao, '%h:%i') AS HORA_FORMATADA from publicacao;

select * from usuario;

SELECT amg.nome AS nome 
FROM usuario AS usu 
JOIN amigos AS ami
ON ami.fk_usuario = usu.id
JOIN usuario AS amg
ON ami.fk_amigo = amg.id
WHERE ami.fk_usuario = 1
AND amg.statusUsuario = 'online'
ORDER BY amg.nome;

truncate table publicacao;