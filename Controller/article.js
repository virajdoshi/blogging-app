const article = require('../models/article.js');

module.exports = {
    create: async function(req, res){
        if(!req.body.data.title || !req.body.data.description || !req.body.data.body){
            return res.status(422).json({errors: {errors: "Fields can't be blank"}});
        }
        else{
            let result = await article.create(req.con, req.payload, req.body);
            res.json(result);
        }
    }, 

    update: async function(req, res){
        if(!req.body.data.article_id || !req.body.data.title || !req.body.data.description || !req.body.data.body){
            return res.status(422).json({errors: {errors: "Fields can't be blank"}});
        }
        else{
            let result = await article.update(req.con, req.payload, req.body);
            res.json(result);
        }
    },

    delete: async function(req, res){
        let result = await article.delete(req.con, req.payload, req.params.id);
        res.json(result);
    },

    getArticle: async function(req, res){
        let result = await article.getArticle(req.con, req.params.id);
        res.json(result);
    },

    listByAuthor: async function(req, res){
        let result = await article.listByAuthor(req.con, req.query.author);
        res.json(result);
    },

    listAll: async function(req, res){
        let result = await article.listAll(req.con);
        res.json(result);
    },

    feed: async function(req, res){
        let result = await article.feed(req.con, req.payload);
        res.json(result);
    }
}