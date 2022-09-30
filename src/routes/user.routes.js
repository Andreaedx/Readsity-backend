const router = require("express").Router();

const usercontroller = require("../controller/user.controller");

module.exports = app => {
    router.post("/", usercontroller.signup);

    router.get("/email", usercontroller.signin);

    app.use('/api/users', router);
};