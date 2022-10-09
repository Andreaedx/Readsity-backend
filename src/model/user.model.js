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
    static findById(id, result) {
        db.query(`SELECT * FROM users WHERE id = ?`, [id], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found user: ", res[0]);
                result(null, res[0]);
                return;
            }
            result({ kind: "not found" }, null);
        });
    }

    static findByEmail(email, result) {
        db.query(`SELECT * FROM users WHERE email = ?`, email, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            if (res.length) {
                console.log("found user: ", res[0]);
                result(null, res[0]);
                return;
            }
            result({ kind: "not found" }, null);
        });
    }

    static getAll(result) {
        db.query(`SELECT * FROM users`, (err, res) => {
            if (err) {
                console.log("error", err);
                result(err, null);
                return;
            }
            console.log("users: ", res);
            result(null, res);
        })
    }



    // registering email for newletter
    static registerEmailForNewsletter(email, result) {
        db.query(`INSERT INTO newsletter (email) VALUE (?)`, email, (req, res) => {
            if (err) {
                console.log("error", err);
                result(err, null);
                return;
            }
            console.log("email registered", {...email});
            result(null, {...email})
        })
    }

    static findOne(email, result) {
        db.query(`SELECT * FROM newletter WHERE email = ?`, email, (req, res) => {
            if (err) {
                console.log('error', err);
                result (err, null);
                return;
            }
            if (res.length) {
                console.log("found user: ", res[0]);
                result (data, null);
                return;
            }
            result({ kind: "not found" }, null);
        });
    }
}

module.exports = User;