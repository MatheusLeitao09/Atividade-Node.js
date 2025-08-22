import express from "express";
import bruxos from "./src/data/bruxos.js";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Bem vindo ao Mundo de Harry Potter!");
});

// Criar a rota GET Buxos
app.get("/bruxos", (req, res) => {
    res.json(bruxos);
});

// Rota GET by ID - A estrela do show! ⭐
app.get("/bruxos/:id", (req, res) => {
    // Pega o ID da URL
    const id = parseInt(req.params.id);
    
    // Busca o bruxo pelo ID
    const bruxo = bruxos.find(b => b.id === id);
    
    // Se encontrou, retorna os dados
    if (bruxo) {
        res.json({
            success: true,
            message: `Bruxo ${bruxo.nome} encontrado! ⚡`,
            data: bruxo
        });
    } else {
        // Se não encontrou, retorna erro 404
        res.status(404).json({
            success: false,
            error: "Bruxo não encontrado 😕",
            message: `Nenhum bruxo com ID ${id} foi encontrado`,
            codigo: "WIZARD_NOT_FOUND"
        });
    }
});

// Rota para buscar TODOS (para comparar)
app.get("/bruxos", (req, res) => {
    res.json({
        success: true,
        message: "Todos os bruxos de Hogwarts! 🏰",
        data: bruxos,
        total: bruxos.length
    });
});


// Buscar o bruxo pelo nome
app.get("/bruxos/nome/:nome",  (req, res) =>  {
    const nomeBusca = req.params.nome.toLowerCase();
    const bruxosEncontrados = bruxos.filter(b => b.nome.toLowerCase().includes(nomeBusca));

    if(bruxosEncontrados.length > 0) {
       res.json({
        success: true,
        message: `${bruxosEncontrados.length} bruxos(s) encontrado com o nome "${req.params.nome}" !`,
        data: bruxosEncontrados
      });

    } else { 
        res.status(404).json({
            success: false,
            error: "Bruxo não encontrado!",
            message: `Nenhum bruxo com o nome "${req.params.nome}" foi encontrado"`,
            codigo: "WIZARD_NOT_FOUND"
        })

    }

});

app.listen(3000, () => {
    console.log(`🧙‍♂️ API dos Bruxos está no ar na porta 3000! Acesse http://localhost:${PORT}`);
});


// Rota para buscar os bruxos da casa informada

app.get("/bruxos/casa/:casa", (req, res) => {
    const casaBusca = req.params.casa.toLowerCase();
    const bruxosDaCasa = bruxos.filter(b => b.casa.toLowerCase ().includes(casaBusca));

    if(bruxosDaCasa.length > 0) {
        res.json({
            success: true,
            message: `${bruxosDaCasa.length} bruxo(s) encontrado da casa "${req.params.casa}"!`,
            data: bruxosDaCasa
        });
    } else {
        res.status(404).json ({
            success: false,
            error: "Casa não foi encontrada ou está sem bruxos",
            message: `Nenhum bruxo encontrado para a casa "${req.params.casa}"`,
            codigo: "WIZARD_NOT_FOUND"
        })
    }
});
