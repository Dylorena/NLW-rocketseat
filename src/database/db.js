const sqlite3 = require("sqlite3").verbose()

//iniciar objeto de DB
const db = new sqlite3.Database("./src/database/database.db")


module.exports = db

/* db.serialize(() => {
    //com comandos SQL eu vou:
    // 1= criar uma tabela 
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    // 2= inserir dados na tabela
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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]
    function afterInsertData (err){
        if (err) {
            return console.log(err)
        }
        console.log("cadastrado com sucesso")
        console.log(this)
    }
    db.run( query, values, afterInsertData ) */

    // Consultar os dados na tabela

    /* db.all( 'SELECT * FROM places', function(err,rows){
        if (err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros:")
        console.log(rows)
    }) */
    
    // Deletar um dado da tabela
    db.run('DELETE FROM places WHERE id = ?', [3], function(err){
        if(err) {
            return console.log(err)
        }
    })
// })

