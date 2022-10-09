const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../model/user.model");
const jwt = require('jsonwebtoken');



exports.signup = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "content can't be empty!"
        });
    }
        User.findByEmail(req.body.email, (err, data) => {
            if(data) {
                return res.status(400).send({
                    status: "error",
                    message: `user with email ${email} already exist!`
                });
            }
        });

    
    const { email, password } = req.body

    await bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(500).send({
                message: err.message || "could'nt hash password!"
            });
        };
        const hashpassword = hash;

        
        const user =  new User(email.trim(), hashpassword)

        User.create(user, async (err, data) => {
            if (err) {
                res.status(500).send({
               message: err.message || "some error occurred while creating the User."
           });
       }
       else {
        const token = await jwt.sign({ id: data.id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
        return res.status(200).send({
            status: 'sucess',
            data: {
                token,
                data
            } 
        });
       }
   });
   
    })
};

exports.signin = (req, res) => {
    const { email, password } = req.body

    User.findByEmail(email, (err, data) => {
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
                const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })
                return res.status(200).send({
                    status: 'sucess',
                    data: {
                        token,
                        email: data.email
                    }
                })
                
            })
            

        }
    });
}

exports.registerEmail = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "content can't be empty "
        });
    }
     if(User.findOne(req.body.email)) {
        return res.status(400).send({
            message: `email ${email} already exists!`
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

exports.findAllUsers = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
        try {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET_KEY)
    
        }catch (err) {
            console.log(err);
            return res.status(400).send({
                message: 'login to gain access!'
            });
        };
        res.send(data);
    })
}