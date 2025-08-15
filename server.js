import express from "express";
import bruxos from "./src/data/bruxos.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Bem vindo ao Mundo de Harry Potter!");
});

app.get("/bruxos", (req, res) => {
    res.json(bruxos);
});

app.listen(3000, () => {
    console.log(`🧙‍♂️ API dos Bruxos está no ar na porta 3000! Acesse http://localhost:${PORT}`);
});
