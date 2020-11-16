var express = require('express');
var router = express.Router();
const articleController = require("../Controller/article")
var auth = require('./auth');

router.post('/create', auth.required, articleController.create);

router.put('/update', auth.required, articleController.update);

module.exports = router;