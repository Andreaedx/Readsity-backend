const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "Test@1234",
    database: "test"
})

connection.connect(function(err) {
    if (err) throw err;
    else console.log("database connected!");
})


module.exports = connection;