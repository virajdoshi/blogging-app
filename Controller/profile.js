const profile = require("../models/profile.js");

module.exports = {
    getprofile: function(req, res){
        console.log(req.params.userid);
        profile.getprofile(req.con, req.params.userid, function(result){
            res.json(result);
        })
    }
}