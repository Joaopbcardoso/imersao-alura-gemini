import express from "express";
import routes from './src/routes/postsRoutes.js';


// Criação da aplicação Express
const app = express();
routes(app);

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log("servidor escutando...");
});