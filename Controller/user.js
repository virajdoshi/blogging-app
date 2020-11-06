const user = require("../models/user.js");

module.exports = {
    register: function(req, res) {
      if(!req.body.data.user_id || !req.body.data.first_name || !req.body.data.last_name || !req.body.data.email || !req.body.data.password){
        return res.status(422).json({errors: {errors: "Fields can't be blank"}});
      }
      else{
        user.register(req.con, req.body, function(result){
          res.json(result);
        })
      }
    },

    login: function(req, res) {
      if(!req.body.data.email){
        return res.status(422).json({errors: {email: "can't be blank"}});
      }
      else if(!req.body.data.password){
        return res.status(422).json({errors: {password: "can't be blank"}});
      }
      else{
        user.login(req.con, req.body, function(result){
          res.json(result);
        })
      }
    },

    getuser: function(req, res){
      user.getuser(req.con, req.payload, function(result){
        res.json(result);
      })
    },

    update: function(req,res){
      var obj = req.body.data;
      if(obj.hasOwnProperty('oldPass') && obj.hasOwnProperty('newPass'))
      {
        if(!req.body.data.oldPass){
          return res.status(422).json({errors: {oldPass: "can't be blank"}});
        }
        else if(!req.body.data.newPass){
          return res.status(422).json({errors: {newPass: "can't be blank"}});
        }
        else if(req.body.data.oldPass === req.body.data.newPass){
          return res.status(422).json({errors: {errors: "Your Old Password and New Password can't be same"}});
        }
        else{
          user.updatePass(req.con, req.payload, req.body, function(result){
            res.json(result);
          })
        }
      }
      else if(obj.hasOwnProperty('Bio'))
      {
        if(!req.body.data.Bio){
          return res.status(422).json({errors: {Bio: "can't be blank"}});
        }
        else{
          user.updateBio(req.con, req.payload, req.body, function(result){
            res.json(result);
          })
        }
      }
      else{
        res.json("error : you can only update password and bio fields");
      }
    }
}