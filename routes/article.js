var express = require('express');
var router = express.Router();
const articleController = require("../Controller/article");
const article = require('../models/article');
var auth = require('./auth');

router.post('/create', auth.required, articleController.create);    //http://localhost:3001/article/create  POST Request (Create an article for user).

router.put('/update', auth.required, articleController.update);     //http://localhost:3001/article/update  PUT Request 

router.delete('/:id', auth.required, articleController.delete);     //http://localhost:3001/article/2       DELETE Request (Delete an article where id = 2 and it will also check if its belongs to that user or not)

router.get('/:id', articleController.getArticle);                   //http://localhost:3001/article/2       GET Request (Retrive an specific article)

router.get('/', articleController.listByAuthor);                    //http://localhost:3001/article/?author=Viraj.Doshi     GET Request (Retrive all the article by author name)

router.get('/list/all', articleController.listAll);                 //http://localhost:3001/article/list/all    GET Request (LIST all the article with its title and article id)

router.get('/feed/page', auth.required, articleController.feed);    //http://localhost:3001/article/feed/page   GET Request (If user is login then you can check the feed it will show the articles of the users he/she follows)

module.exports = router;