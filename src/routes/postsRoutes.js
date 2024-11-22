import express from "express";

const routes = (app) => {
    app.use(express.json()); // Habilita o middleware para que o Express possa interpretar dados no formato JSON enviados nas requisições.
    app.get("/posts", async (req, res) => {
        const posts = await getAllPosts(); // Chama a função getAllPosts para obter todos os posts.
        res.status(200).json(posts); // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON.
    });
}

export default routes;


