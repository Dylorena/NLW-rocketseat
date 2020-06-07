const express = require("express")
const server = express() // será um obejto de servidor

// Pegar o banco de dados

const db = require("./database/db")
//configurar a pasta publica
server.use(express.static("public"))

server.use(express.urlencoded({extended: true}))

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

server.post("/savepoint", (req,res) => {

    const query =  `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.item
    ]
    function afterInsertData (err){
        if (err) {
            return console.log(err)
        }
        console.log("cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }
    db.run( query, values, afterInsertData )
})

server.get("/search-results", (req,res) => {
    const search = req.query.search

    if(search == ""){
        return res.render("search-results.html", {total: 0})
    }

        // pegar os dados do banco de dados
    db.all( `SELECT * FROM places WHERE CITY LIKE  '%${search}%' `, function(err,rows){
        if (err) {
            return console.log(err)
        }
    
        const total = rows.length
    // mostrar pagina html com os dados do bd
        return res.render("search-results.html", {places: rows, total:total})
    
    })
})

// ligar o servidor
server.listen(3000)