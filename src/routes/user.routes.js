const router = require("express").Router();

const usercontroller = require("../controller/user.controller");



module.exports = app => {
    router.post("/signup", usercontroller.signup);

    router.post("/signin", usercontroller.signin);

    router.post("/register", usercontroller.registerEmail);

    router.get('/users', usercontroller.findAllUsers);

    app.use('/api/users', router);
};