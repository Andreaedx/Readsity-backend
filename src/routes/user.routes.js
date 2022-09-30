const router = require("express").Router();

const usercontroller = require("../controller/user.controller");

module.exports = app => {
    router.post("/", usercontroller.signup);

    router.get("/email", usercontroller.signin);

    router.get("/register", usercontroller.registerEmail);

    app.use('/api/users', router);
};