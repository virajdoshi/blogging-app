const profile = require("../models/profile.js");

module.exports = {
    getprofile: async function(req, res){
        let result = await profile.getprofile(req.con, req.params.userid)
        res.json(result);
    },

    follow: async function(req, res){
        let result = await profile.follow(req.con, req.payload, req.params.userid)
        res.json(result);
    },

    unfollow: async function(req, res){
        let result = await profile.unfollow(req.con, req.payload, req.params.userid)
        res.json(result);
    }
}