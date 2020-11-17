var express = require('express');
var router = express.Router();
const articleController = require("../Controller/article");
const article = require('../models/article');
var auth = require('./auth');

router.post('/create', auth.required, articleController.create);

router.put('/update', auth.required, articleController.update);

router.delete('/:id', auth.required, articleController.delete);

router.get('/:id', articleController.getArticle);

router.get('/', articleController.listByAuthor);

router.get('/list/all', articleController.listAll);

module.exports = router;