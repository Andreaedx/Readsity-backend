const router = require("express").Router();

const usercontroller = require("../controller/user.controller");

module.exports = app => {
    router.post("/", usercontroller.create);

    app.use('/api/users', router);
};