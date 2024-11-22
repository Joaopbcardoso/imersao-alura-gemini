import express from "express"; // Importa o framework Express, que será utilizado para criar o servidor web.

import conectarAoBanco from "./src/config/dbConfig.js"; // Importa a função que estabelece a conexão com o banco de dados.

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Estabelece a conexão com o banco de dados, utilizando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO.

const app = express(); // Cria uma instância do Express, que será o nosso servidor.

app.listen(3000, () => {
    console.log("Servidor escutando..."); // Inicia o servidor na porta 3000 e exibe uma mensagem no console indicando que o servidor está em execução.
});

async function getAllPosts() {
    const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados "imersao-instabytes" na conexão estabelecida.
    const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados.
    return colecao.find().toArray(); // Realiza uma consulta para encontrar todos os documentos da coleção "posts" e retorna os resultados em um array.
};

