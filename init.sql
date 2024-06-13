CREATE DATABASE ystoq;

\c ystoq;

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    senha TEXT,
    "createdAt" TIMESTAMP DEFAULT current_timestamp,
    "updatedAt" TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE estoque (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    endereco TEXT NOT NULL,
    quantidade INT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT current_timestamp,
    "updatedAt" TIMESTAMP DEFAULT current_timestamp
);

INSERT INTO admin (nome, senha) VALUES ('João', '123321');
INSERT INTO admin (nome, senha) VALUES ('Pedro', '12312');
INSERT INTO admin (nome, senha) VALUES ('Gustavo', '123213');
INSERT INTO admin (nome, senha) VALUES ('Naieli', '123123');
INSERT INTO admin (nome, senha) VALUES ('Vitor', '1232131');
INSERT INTO admin (nome, senha) VALUES ('Marcos', '12222');
INSERT INTO admin (nome, senha) VALUES ('JonnyBravo', '123321');

INSERT INTO estoque (descricao, endereco, quantidade) VALUES ('Estoque Reserva 1', 'Rua 1', 10);
INSERT INTO estoque (descricao, endereco, quantidade) VALUES ('Estoque Reserva 2', 'Rua 2', 20);
INSERT INTO estoque (descricao, endereco, quantidade) VALUES ('Estoque Reserva 3', 'Rua 3', 30);
INSERT INTO estoque (descricao, endereco, quantidade) VALUES ('Estoque Secundário', 'Rua 4', 40);
INSERT INTO estoque (descricao, endereco, quantidade) VALUES ('Estoque Principal', 'Rua 5', 50);