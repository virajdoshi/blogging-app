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
    }
}