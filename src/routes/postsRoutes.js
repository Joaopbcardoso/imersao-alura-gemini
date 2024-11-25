import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImage } from "../controllers/postsController.js";

// Importa o framework Express para criar a API.
// Importa o módulo multer para lidar com o upload de imagens.
// Importa as funções controladoras para posts do arquivo `postsController.js`.

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define a pasta "uploads" como destino para os arquivos enviados.
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Mantém o nome original do arquivo enviado.
  }
});

// Configura o armazenamento para o multer.
// Utiliza o armazenamento em disco (`diskStorage`).
// Define o destino (`destination`) para salvar os arquivos na pasta "uploads".
// Define o nome do arquivo (`filename`) utilizando o nome original enviado pelo cliente.

const upload = multer({ storage }); // Cria uma instância do multer utilizando o armazenamento configurado.

const routes = (app) => {
  app.use(express.json()); // Habilita o middleware para interpretar dados JSON nas requisições.

  // Define as rotas da API:
  app.get("/posts", listarPosts); // Rota para listar todos os posts (método GET em "/posts").
  app.post("/posts", postarNovoPost); // Rota para criar um novo post (método POST em "/posts").
  app.post("/upload", upload.single("Imagem"), uploadImage); // Rota para upload de imagem e criação de post (método POST em "/upload", utiliza o middleware `upload.single("Imagem")` para processar o arquivo enviado com o campo "Imagem").

  // Cada rota utiliza a função controladora correspondente para tratar a lógica de negócio.
};

export default routes; // Exporta a função `routes` para ser utilizada no arquivo principal da aplicação.