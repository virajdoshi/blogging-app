const user = require("../models/user.js");

module.exports = {
    register: async function(req, res) {
      if(!req.body.data.user_id || !req.body.data.first_name || !req.body.data.last_name || !req.body.data.email || !req.body.data.password){
        return res.status(422).json({errors: {errors: "Fields can't be blank"}});
      }
      else{
        let result = await user.register(req.con, req.body) 
        res.json(result)
      }
    },

    login: async function(req, res) {
      if(!req.body.data.email){
        return res.status(422).json({errors: {email: "can't be blank"}});
      }
      else if(!req.body.data.password){
        return res.status(422).json({errors: {password: "can't be blank"}});
      }
      else{
        let result = await user.login(req.con, req.body)
        res.json(result);
      }
    },

    getuser: async function(req, res){
      let result = await user.getuser(req.con, req.payload)
      res.json(result);
    },

    update: async function(req,res){
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
          let result = await user.updatePass(req.con, req.payload, req.body)
          res.json(result);
        }
      }
      else if(obj.hasOwnProperty('Bio'))
      {
        if(!req.body.data.Bio){
          return res.status(422).json({errors: {Bio: "can't be blank"}});
        }
        else{
          let result = await user.updateBio(req.con, req.payload, req.body)
          res.json(result);
        }
      }
      else{
        res.json("error : you can only update password and bio fields");
      }
    }
}