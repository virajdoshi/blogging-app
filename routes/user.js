var express = require('express');
var router = express.Router();
const userController = require("../Controller/user")
var auth = require('./auth');

router.post("/register", userController.register);      //http://localhost:3001/user/register    POST Request

router.post("/login", userController.login);            //http://localhost:3001/user/login       POST Request

router.get("/", auth.required, userController.getuser); //http://localhost:3001/user/            GET Request      

router.put("/", auth.required, userController.update);  //http://localhost:3001/user/            PUT Request

module.exports = router;