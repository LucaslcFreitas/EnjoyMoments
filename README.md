# Enjoy Moments

Projeto Enjoy Moments, uma plataforma simples para compartilhar momentos especiais do seu dia a dia! Projeto criado praticar o desenvolvimento. Esta aplicação web, construída com React no front-end e Node.js com Express, TypeORM e PostgreSQL no back-end, permite que os usuários criem posts, interajam com outros usuários através de comentários e expressem apreço por momentos inesquecíveis através de likes.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar algumas variáveis de ambiente;

### Front-End

No fron-end adicione a seguinte variável no seu ./frontend/.env

`REACT_APP_API_URL`: contendo a url base para conexão com o back-end

### Back-End

No back-end adicione as seguintes variáveis no seu ./backend/.env

`TYPEORM_CONNECTION`: contendo o tipo de banco de dados, no caso 'postgres';

`TYPEORM_HOST`: contendo endereço do banco de dados;

`TYPEORM_USERNAME`: nome de usuário do postgres;

`TYPEORM_PASSWORD`: senha do postgres;

`TYPEORM_DATABASE`: nome da database;

`TYPEORM_PORT`: porta em execução do postgres;

`TYPEORM_MIGRATIONS`: local de origem das migrations ('src/database/migrations/\*.ts');

`TYPEORM_MIGRATIONS_DIR`: local para criação das migrations ('src/database/migrations');

`TYPEORM_ENTITIES`: local de origem das entidades ('src/entities/\*.ts');

`TYPEORM_ENTITIES_DIR`: local para criação das entidades ('src/entities');

`PWD_SECRET`: chave secreta para geração das hashs de senha;

`JWD_SECRET`: chave secreta para autenticação de token com JWT;

`IP_ADDRESS`: ip do seu computador;

`PORT`: porta em que a api deverá rodar.

## Instalação

Primeiramente, certifique-se de ter o node instalado em sua máquina.

Clone este repositório e siga as instruções:

### Front-End

Entre na pasta 'frontend' e instale as dependências

```bash
  cd frontend
  npm install
```

Rode o projeto com:

```bash
  npm start
```

### Back-End

Instale em seu computador o postgres e configure seu usuário e senha.

Entre na pasta 'backend' e instale as dependências

```bash
  cd frontend
  npm install
```

Em seguida, rode as migrations

```bash
  typeorm migration:run
```

Rode o projeto com:

```bash
  npm run dev
```

## Stack utilizada

**Front-end:** React, Context API, Axios

**Back-end:** Node, Express, Type-ORM, Auth JWT
