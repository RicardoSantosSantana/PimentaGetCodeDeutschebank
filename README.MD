### README.md

# Projeto de Geração de Código para Consumo da API Deutsche Bank

## Visão Geral

Este projeto tem como objetivo gerar um **CODE** que permite a autenticação e o consumo da **API do Deutsche Bank**. Para alcançar isso, você precisa:

1. Criar uma aplicação no **simulador** do Deutsche Bank, o que fornecerá o `client_id` e o `client_secret`.
2. Cadastrar um **usuário de teste** fornecido pela plataforma.
3. O projeto está totalmente **dockerizado** e, ao receber o **CODE**, ele é armazenado no banco de dados **MySQL** na tabela `codes`.

## Configuração do Projeto

### Pré-requisitos

- **Docker** e **Docker Compose** instalados na sua máquina.
- Conta de desenvolvedor no [Dashboard do Deutsche Bank](https://developer.db.com/dashboard/overview).

### Configurando a Aplicação no Deutsche Bank

#### Passo 1: Crie uma Aplicação no Deutsche Bank

1. Acesse o [Dashboard do Deutsche Bank](https://developer.db.com/dashboard/overview).
2. Crie uma nova aplicação simulada.
   - Anote o `client_id` e o `client_secret`, pois você os utilizará no arquivo `.env`.

#### Passo 2: Crie um Usuário de Teste

1. Dentro do Dashboard, crie um **usuário de teste**.
   - Esse usuário será usado para simular as interações com a API.

### Estrutura de Arquivos

O projeto contém a seguinte estrutura básica:

```
├── Dockerfile
├── docker-compose.yaml
├── init.sql
├── .env
├── nextjs-app
│   ├── package.json
│   ├── public
│   └── ...
└── README.md
```

### Variáveis de Ambiente

Você deve configurar as variáveis de ambiente no arquivo `.env` da seguinte maneira:

#### Variáveis do MySQL

```bash
# MySQL Configurações
MYSQL_SERVER='mysql_transactions'
MYSQL_HOST=database
MYSQL_ROOT_PASSWORD=pimenta001
MYSQL_DATABASE=bank_transactions
MYSQL_USER=pimenta
MYSQL_PASSWORD=pimenta001
MYSQL_PORT=3306
```

#### Variáveis do Next.js

O Next.js exige que as variáveis de ambiente públicas comecem com `NEXT_PUBLIC`. Aqui estão as variáveis usadas no projeto:

```bash
# Next.js Configurações
NEXT_PUBLIC_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
NEXT_PUBLIC_CLIENT_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_BASE_API=https://simulator-api.db.com/gw/oidc/authorize
NEXT_PUBLIC_REDIRECT_URL=http://localhost:3000/
NEXT_PUBLIC_RESPONSE_TYPE=code
NEXT_PUBLIC_STATE=PimentaGroup
```

Substitua `xxxxxxxx` pelos valores corretos obtidos ao criar a aplicação no **simulador do Deutsche Bank**.

### Docker Compose

O projeto é **dockerizado** e pode ser iniciado facilmente com o Docker Compose.

#### Conteúdo do `docker-compose.yaml`

```yaml
version: '3'
services:
  database:
    image: rssantan/mysql8dev
    container_name: banco
    env_file: .env
    ports:
      - "3306:3306"
    volumes:
      - ./mysql:/var/lib/mysql
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - bank-transaction-network

  phpmyadmin:
    image: phpmyadmin/phpmyadmin
    container_name: pma
    links:
      - database
    env_file: .env
    restart: always
    ports:
      - "8085:80"
    networks:
      - bank-transaction-network
    environment:
      - PMA_HOST=${MYSQL_SERVER}
      - PMA_PORT=3306
      - DATABASE_DRIVER=pdo_mysql
      - PMA_ARBITRARY=1

  nextjs-app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: nextjs_app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    networks:
      - bank-transaction-network

networks:
  bank-transaction-network:
    driver: bridge
```

### Inicializando o Projeto

1. **Clone o repositório** e navegue até o diretório raiz:

   ```bash
   git clone <link_do_repositorio>
   cd <nome_do_projeto>
   ```
2. **Configure o arquivo `.env`** com as variáveis necessárias, conforme descrito na seção de variáveis de ambiente.
3. **Inicie o projeto com o Docker Compose**:

   ```bash
   docker-compose up --build -d
   ```

Isso irá configurar e iniciar:

- Um contêiner para o **MySQL**.
- Um contêiner para o **phpMyAdmin**, acessível em `http://localhost:8085`.
- O **Next.js**, acessível em `http://localhost:3000`.

### Acessando o MySQL e phpMyAdmin

- Para gerenciar o banco de dados MySQL, acesse o **phpMyAdmin** em [http://localhost:8085](http://localhost:8085).
- Use as credenciais fornecidas no arquivo `.env` para se autenticar.

### Tabelas no Banco de Dados

Após a inicialização, duas tabelas serão criadas automaticamente:

- **tokens**: Armazena os tokens recebidos da API do Deutsche Bank.
- **log**: Armazena logs da aplicação.

### Fluxo do Projeto

1. O **Next.js** gera uma requisição para o **Deutsche Bank** a partir dos dados configurados nas variáveis de ambiente.
2. Ao autenticar com sucesso, a aplicação recebe um **CODE**, que é então armazenado na tabela `tokens` no banco de dados MySQL.
3. O **Next.js** também registra logs das operações na tabela `log`.

### Acesso ao Simulador do Deutsche Bank

1. Acesse o painel do simulador em [https://developer.db.com/dashboard/overview](https://developer.db.com/dashboard/overview).
2. Use o **client_id** e o **client_secret** obtidos para integrar com as APIs fornecidas pelo Deutsche Bank.
3. O fluxo de autenticação OAuth2 será iniciado, e o **CODE** gerado será salvo automaticamente na tabela `tokens`.

### Considerações Finais

Este projeto é uma base para gerar códigos de autenticação e consumir a API do **Deutsche Bank**. Ele pode ser estendido para incluir funcionalidades adicionais, como a automação de operações bancárias ou a integração com outros serviços.

Sinta-se à vontade para modificar o código e expandir o projeto conforme necessário!

### Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
 