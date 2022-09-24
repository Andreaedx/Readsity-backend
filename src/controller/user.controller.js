const User = require("../model/user.model");


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "content can't be empty!"
        });
    }

    const { email, password } = req.body;
    
    const user = new User(email.trim(), password.trim());

     User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "some error occurred while creating the User."
            });
        }
        else res.send(data)
    });
    
};



