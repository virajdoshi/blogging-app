var express = require('express');
var router = express.Router();
const userController = require("../Controller/user")
var auth = require('./auth');

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/", auth.required, userController.getuser);

router.put("/", auth.required, userController.update);

module.exports = router;