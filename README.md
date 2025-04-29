# Projeto Fullstack - Backend e Frontend com Docker

Este é um projeto fullstack que inclui um backend, um frontend, e um banco de dados PostgreSQL, tudo gerenciado através do Docker. Ao rodar o Docker, todo o ambiente será configurado automaticamente e
será capaz de rodar o projeto por completo.

## Requisitos

Antes de começar, certifique-se de ter o Docker e o Docker Compose instalados na sua máquina.

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)

## Como Rodar o Projeto

### Passo 1: Clonar o Repositório

Primeiro, clone o repositório para a sua máquina:

```bash
git clone https://github.com/VictorVilelaDuarte/teste-ntt.git
cd nome-do-repositorio
```

### Passo 2: Rodar o Docker Compose

Com o Docker e Docker Compose instalados, você pode iniciar os containers com o comando abaixo:

```bash
docker-compose up --build
```

Este comando irá:

- Construir as imagens do backend e frontend.
- Subir o serviço do PostgreSQL.
- Rodar as migrations do prisma.
- Rodar o backend e frontend em containers Docker.

### Passo 3: Acessar a Aplicação

- **Frontend:** Acesse o frontend do seu projeto em [http://localhost:3000](http://localhost:3000).
- **Backend:** O backend estará rodando na porta 3333, mas normalmente você não precisará acessar diretamente. Caso precise, use [http://localhost:3333](http://localhost:3333).
- **Prisma Studio:** Para acessar o Prisma Studio e visualizar os dados no banco de dados, use [http://localhost:5555](http://localhost:5555).

## Variáveis de Ambiente

As variaveis de ambiente estão em .env.example, para rodar o projeto corretamente basta copiar o conteudo
para um arquivo .env

### Backend

- `DATABASE_URL`: Conexão com o banco de dados PostgreSQL. Exemplo: `postgresql://victorfy_user:victorfy_pass@postgres:5432/victorfy_db?schema=public`.

### Frontend

- `NEXT_PUBLIC_API_URL`: URL da API que o frontend usará para fazer requisições. Definido como `http://localhost:3000`.

### Banco de Dados (PostgreSQL)

- **Usuário:** `victorfy_user`
- **Senha:** `victorfy_pass`
- **Banco de dados:** `victorfy_db`

## Considerações Finais

- **Containers:** Todos os containers são definidos no arquivo `docker-compose.yml`, o que facilita o gerenciamento e a execução do projeto.
- **Persistência de Dados:** O banco de dados usa volumes Docker para garantir que os dados sejam persistidos entre reinicializações do container.

---

OBS: no inicio o projeto foi configurado para utilizar o Spotify para fazer a pesquisa de músicas, porém
por limitações da API, foi optado de seguir com a API da Dezzer, porém deixei a configuração do Spotify
no projeto para poder exemplificar como seria pra fazer a conexão com a API da empresa.
