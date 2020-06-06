const express = require("express")
const server = express() // será um obejto de servidor

//configurar a pasta publica
server.use(express.static("public"))

//configurar caminho da aplicação
//Página inicial
//requisição e resposta
server.get("/", (req,res) => {
    res.sendFile(__dirname + "/views/index.html")
})

server.get("/create-point", (req,res) => {
    res.sendFile(__dirname + "/views/create-point.html")
})

// ligar o servidor
server.listen(3000)