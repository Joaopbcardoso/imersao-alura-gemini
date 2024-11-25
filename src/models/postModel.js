import conectarAoBanco from "../config/dbConfig.js";

// Importa a função `conectarAoBanco` do arquivo `dbConfig.js`, que provavelmente contém a lógica para se conectar ao banco de dados MongoDB.

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); 
// Estabelece a conexão com o banco de dados MongoDB de forma assíncrona. 
// A string de conexão é obtida da variável de ambiente `STRING_CONEXAO`, que geralmente contém informações como o nome do host, porta, banco de dados e credenciais.

export async function getAllPosts() {
  // Função assíncrona para obter todos os posts do banco de dados.
  const db = conexao.db("imersao-instabytes"); 
  // Seleciona o banco de dados "imersao-instabytes" dentro da conexão estabelecida.
  const colecao = db.collection("posts"); 
  // Seleciona a coleção "posts" dentro do banco de dados, onde os documentos (posts) serão armazenados.
  return colecao.find().toArray(); 
  // Realiza uma consulta para encontrar todos os documentos da coleção "posts" e retorna os resultados em um array. 
  // O método `toArray()` converte o cursor de resultados em um array de objetos JavaScript.
};

export async function criarPost(novoPost) {
  // Função assíncrona para criar um novo post no banco de dados.
  const db = conexao.db("imersao-instabytes"); 
  // Seleciona o banco de dados "imersao-instabytes".
  const colecao = db.collection("posts");
  // Seleciona a coleção "posts".
  return colecao.insertOne(novoPost); 
  // Insere um novo documento (post) na coleção "posts". 
  // O método `insertOne()` retorna um objeto que contém informações sobre o documento inserido, como o ID.
}