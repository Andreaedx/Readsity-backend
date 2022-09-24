const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: "DB_HOST",
    user: "DB_USER",
    password: "DB_PASSWORD",
    database: "DB"
})

connection.connect(function(err) {
    if (err) throw err;
    else console.log("database connected!");
})


module.exports = connection;