CREATE DATABASE ystoq;

\c ystoq;

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    senha TEXT,
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