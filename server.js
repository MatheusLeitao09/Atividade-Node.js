import express from "express";
import dados from "./src/data/dados.js"

const app = express();
const PORT = 3000;
const { bruxos, casas, varinhas, animais, pocoes } = dados;

// Novas rotas

app.get("/casas", (req, res) => {

    if (casas.length > 0 ) {
       res.status(200).json(casas);
    
    } else {
        res.status(404).json({
            mensagem: "Nenhuma casa encontrada!"
        })
    }
    });


app.get("/varinhas", (req, res) => {

    if (varinhas.length > 0 ) {
       res.status(200).json(varinhas);
    
    } else {
        res.status(404).json({
            mensagem: "Nenhuma varinha encontrada!"
        })
    }
    });

  
  
app.get("/animais", (req, res) => {
    
    if (animais.length > 0 ) {
        res.status(200).json(animais);
     
     } else {
         res.status(404).json({
             mensagem: "Nenhum animal encontrado!"
         })
     }
     });


  
  app.get("/pocoes", (req, res) => {
    
    if (pocoes.length > 0 ) {
        res.status(200).json(pocoes);
     
     } else {
         res.status(404).json({
             mensagem: "Nenhuma poção encontrada!"
         })
     }
     });

// Novas rotas por ID

app.get("/varinhas/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const varinha = varinhas.find(b => b.id === id);
    
    if (!varinha) {
        return res.status(404).json({
            success: false,
            message: "Varinha não encontrada! 🔍"
        });
    }
    
    res.json({
        success: true,
        message: "Varinha encontrado!",
        data: varinha
    });
});


app.get("/animais/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const animal = animais.find(b => b.id === id);
    
    if (!animal) {
        return res.status(404).json({
            success: false,
            message: "Animal não encontrado! 🔍"
        });
    }
    
    res.json({
        success: true,
        message: "Animal encontrado!",
        data: animal
    });
});

app.get("/pocoes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pocao = pocoes.find(b => b.id === id);
    
    if (!pocao) {
        return res.status(404).json({
            success: false,
            message: "Poção não encontrada! 🔍"
        });
    }
    
    res.json({
        success: true,
        message: "Poção encontrado!",
        data: pocao
    });
});


  
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
