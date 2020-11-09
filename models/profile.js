module.exports = {
    getprofile: function(con, data, callback){
        con.query("select user_info.user_id, user_info.bio, count(following.following_user_id) as following from user_info inner join following on user_info.user_id = following.user_id where following.user_id = ?", data, function(err, result, fields){
            if(result[0].user_id === null){
                con.query("select user_id, bio from user_info where user_id = ?", data, function(err, result, fields){
                    if(result.length === 0){
                        callback("message : Profile does not exist");
                    }
                    else{
                        callback({user_id : result[0].user_id, bio : result[0].bio, following : 0})
                    }
                })
            }
            else{
                callback({user_id : result[0].user_id, bio : result[0].bio, following : result[0].following})
            }
        })
    }
}