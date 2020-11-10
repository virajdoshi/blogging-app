const profile = require("../models/profile.js");

module.exports = {
    getprofile: function(req, res){
        profile.getprofile(req.con, req.params.userid, function(result){
            res.json(result);
        })
    },

    follow: function(req, res){
        profile.follow(req.con, req.payload, req.params.userid, function(result){
            res.json(result);
        })
    },

    unfollow: function(req, res){
        profile.unfollow(req.con, req.payload, req.params.userid, function(result){
            res.json(result);
        })
    }
}