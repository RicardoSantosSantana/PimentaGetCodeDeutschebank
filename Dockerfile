# Use a imagem base do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY ./app/package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos da pasta `app` para o contêiner
COPY ./app ./

# Build da aplicação (opcional, para produção)
RUN npm run build

# Exponha a porta em que a aplicação vai rodar
EXPOSE 3000

# Defina o comando para iniciar a aplicação Next.js
CMD ["npm", "run", "start"]
