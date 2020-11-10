module.exports = {
    getprofile: function(con, uid, callback){
        con.query("select user_info.user_id, user_info.bio, count(following.following_user_id) as following from user_info inner join following on user_info.user_id = following.user_id where following.user_id = ?", uid, function(err, result, fields){
            if(result[0].user_id === null){
                con.query("select user_id, bio from user_info where user_id = ?", uid, function(err, result, fields){
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
    },

    follow: function(con, payload, uid, callback){
        con.query("select * from following where user_id in(select user_id from user_info where email = ?) AND following_user_id = ?", [payload.email, uid], function(err, result, fields){
            if(result.length === 0){
                con.query("insert into following(user_id, following_user_id) values((select user_id from user_info where email = ?), (select user_id from user_info where user_id = ?))",[payload.email, uid], function(err, result, fields){
                    if(err) callback("Message : Profile you are trying to follow it did not exist.");
                    else{
                        con.query("select user_info.user_id, user_info.bio, count(following.following_user_id) as following from user_info inner join following on user_info.user_id = following.user_id where user_info.email = ?", payload.email, function(err, result, fields){
                            callback({user_id : result[0].user_id, bio : result[0].bio, following : result[0].following})
                        })
                    }   
                })
            }
            else{
                callback("Message: You are already following " + uid);
            }
        })
    },

    unfollow: function(con, payload, uid, callback){
        con.query("select * from following where user_id in(select user_id from user_info where email = ?) AND following_user_id = ?", [payload.email, uid], function(err, result, fields){
            if(result.length === 0){
                callback("Message : You are already not following "+ uid + " OR profile does not exist.")
            }
            else{
                con.query("delete from following where user_id in(select user_id from user_info where email = ?) and following_user_id = ?", [payload.email, uid], function(err, result, fields){
                    con.query("select user_info.user_id, user_info.bio, count(following.following_user_id) as following from user_info inner join following on user_info.user_id = following.user_id where user_info.email = ?", payload.email, function(err, result, fields){
                        callback({user_id : result[0].user_id, bio : result[0].bio, following : result[0].following})
                    })
                })
            }
        })
    }
}
