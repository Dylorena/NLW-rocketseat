const express = require("express")
const server = express() // será um obejto de servidor

//configurar a pasta publica
server.use(express.static("public"))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})

//configurar caminho da aplicação
//Página inicial
//requisição e resposta
server.get("/", (req,res) => {
    return res.render("index.html",{
        title: "Seu marketplace de coleta de resíduos."
    })
})

server.get("/create-point", (req,res) => {
    return res.render("create-point.html")
})

server.get("/search-results", (req,res) => {
    return res.render("search-results.html")
})

// ligar o servidor
server.listen(3000)