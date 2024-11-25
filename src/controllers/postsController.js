import { getAllPosts, criarPost } from "../models/postModel.js";
import fs from "fs";

// Importa as funções para obter todos os posts e criar um novo post do módulo postModel.
// Importa o módulo fs para realizar operações com o sistema de arquivos.

export async function listarPosts(req, res) {
  // Função assíncrona para listar todos os posts.
  const posts = await getAllPosts(); // Chama a função getAllPosts para obter todos os posts do banco de dados (ou outra fonte).
  res.status(200).json(posts); // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON para o cliente.
}

export async function postarNovoPost(req, res) {
  // Função assíncrona para criar um novo post.
  const novoPost = req.body; // Obtém os dados do novo post enviados no corpo da requisição.
  try {
    // Bloco try-catch para tratar possíveis erros.
    const postCriado = await criarPost(novoPost); // Chama a função criarPost para inserir o novo post no banco de dados e retorna o post criado.
    res.status(200).json(postCriado); // Envia uma resposta HTTP com status 200 (OK) e o post criado no formato JSON.
  } catch (erro) {
    // Se ocorrer um erro, ele é capturado aqui.
    console.error(erro.message); // Imprime a mensagem de erro no console para ajudar na depuração.
    res.status(500).json({"Erro":"Falha na requisição"}); // Envia uma resposta HTTP com status 500 (Erro interno do servidor) e uma mensagem de erro genérica.
  }
}

export async function uploadImage(req, res) {
  // Função assíncrona para fazer upload de uma imagem e criar um novo post.
  const novoPost = {
    descricao: "", // Inicializa a descrição como uma string vazia (pode ser preenchida pelo usuário).
    imgUrl: req.file.originalname, // Obtém o nome original do arquivo da imagem enviada.
    alt: "" // Inicializa o texto alternativo como uma string vazia (importante para acessibilidade).
  };
  try {
    // Bloco try-catch para tratar possíveis erros.
    const postCriado = await criarPost(novoPost); // Cria um novo post com os dados da imagem.
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`; // Gera um novo nome para o arquivo da imagem com base no ID do post criado.
    fs.renameSync(req.file.path, imagemAtualizada); // Renomeia o arquivo da imagem para o novo nome e move para a pasta "uploads".
    res.status(200).json(postCriado); // Envia uma resposta HTTP com status 200 (OK) e o post criado no formato JSON.
  } catch (erro) {
    // Se ocorrer um erro, ele é capturado aqui.
    console.error(erro.message); // Imprime a mensagem de erro no console para ajudar na depuração.
    res.status(500).json({"Erro":"Falha na requisição"}); // Envia uma resposta HTTP com status 500 (Erro interno do servidor) e uma mensagem de erro genérica.
  }
}