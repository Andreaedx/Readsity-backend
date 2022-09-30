const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../model/user.model");


exports.signup = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "content can't be empty!"
        });
    }
    const { email, password } = req.body

    await bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(500).send({
                message: err.message || "could'nt hash password!"
            });
        };
        const hashpassword = hash;

        
        const user =  new User(email.trim(), hashpassword)

        User.create(user, (err, data) => {
            if (err) {
                res.status(500).send({
               message: err.message || "some error occurred while creating the User."
           });
       }
       else res.send(data)
   });
   
    })
};

exports.signin = (req, res) => {
    const { email, password } = req.body

    User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if(err.kind === "not found") {
                res.status(404).send({
                    status: 'error',
                    message: `${email} not found!`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data){
            bcrypt.compare(password, data.password, (err, ismatch) => {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                    return;
                }
                if (!ismatch) {
                    res.status(404).send({
                        status: 'error',
                        message: "Incorrect password"
                    });
                    return;
                }
                res.send(data)
                

            })
            

        }
    });
}

exports.register = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "content can't be empty "
        });
    }
    const email = req.body;

    User.registerEmailForNewsletter(email, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "An error occurred!"
            });
        }
        res.send(data)
    })
}