const db = require("../config/db.config");

class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        
    }
    static create(newUser, result) {
        db.query(`INSERT INTO users (email, password) VALUES (?, ?)`, [newUser.email, newUser.password], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null)
                return;
            }

            console.log("Created User: ", {...newUser});
            result(null, {id: res.insertId, ...newUser});

        });
    }

}
module.exports = User;