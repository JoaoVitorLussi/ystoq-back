Criar Migrations:

-> Na pasta src/module/ystoq rodar o comando:
npx sequelize-cli model:generate --name <TABLE_NAME> --attributes <Properties>
ex: npx sequelize-cli model:generate --name Admin --attributes nome:string,senha:string

-> Na pasta Migrations, no arquivo criado, alterar as linhas 6 e 31 conforme os outros já existentes 

Criar Seeder:
-> Na pasta src/module/ystoq rodar o comando:
npx sequelize-cli seed:generate --name <SEED_NAME>
ex: npx sequelize-cli seed:generate --name admin-seed

-> Na pasta Seeder, no arquivo criado, inserir alguns objetos para serem criados e popular a tabela no método "UP"

Quando finalizado na pasta src/module/ystoq rodar os comandos a seguir para criar e popular as tabelas:
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
