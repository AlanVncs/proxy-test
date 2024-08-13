# Use a imagem base do Deno
FROM denoland/deno:latest

# Crie um diretório de trabalho
WORKDIR /app

# Copie os arquivos da aplicação para o container
COPY . .

# Exponha a porta 443
EXPOSE 443

# Comando para rodar a aplicação
CMD ["deno", "task", "start"]
# CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "src/main.ts"]