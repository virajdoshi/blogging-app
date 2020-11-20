module.exports = {
    getprofile: async function(con, uid){
        return new Promise(function(resolve) {

            //retrive the profile with following count if following count is zero it will retrive null data
            con.query("select user_info.user_id, user_info.bio, count(following.following_user_id) as following from user_info inner join following on user_info.user_id = following.user_id where following.user_id = ?", uid, function(err, result, fields){
                if(result[0].user_id === null){

                    //if data is null the directly retrive the data of user and send with following 0 
                    con.query("select user_id, bio from user_info where user_id = ?", uid, function(err, result, fields){
                        if(result.length === 0){
                            resolve("message : Profile does not exist");
                        }
                        else{
                            resolve({user_id : result[0].user_id, bio : result[0].bio, following : 0})
                        }
                    })
                }
                else{
                    resolve({user_id : result[0].user_id, bio : result[0].bio, following : result[0].following})
                }
            })
        })
    },

    follow: async function(con, payload, uid){
        return new Promise(function(resolve) {

            //before following user checking that user already follow that user or not
            con.query("select * from following where user_id in(select user_id from user_info where email = ?) AND following_user_id = ?", [payload.email, uid], function(err, result, fields){
                if(result.length === 0){
                    
                    //if it not follow the inserting the data and also checking that the profile is exist or not 
                    con.query("insert into following(user_id, following_user_id) values((select user_id from user_info where email = ?), (select user_id from user_info where user_id = ?))",[payload.email, uid], function(err, result, fields){
                        if(err) resolve("Message : Profile you are trying to follow it did not exist.");
                        else{

                            //if profile is exist then it will return the profile with updated following count
                            con.query("select user_info.user_id, user_info.bio, count(following.following_user_id) as following from user_info inner join following on user_info.user_id = following.user_id where user_info.email = ?", payload.email, function(err, result, fields){
                                resolve({user_id : result[0].user_id, bio : result[0].bio, following : result[0].following})
                            })
                        }   
                    })
                }
                else{
                    resolve("Message: You are already following " + uid);
                }
            })
        })
    },

    unfollow: async function(con, payload, uid){
        return new Promise(function(resolve) {

            //before following user checking that user already follow that user or not
            con.query("select * from following where user_id in(select user_id from user_info where email = ?) AND following_user_id = ?", [payload.email, uid], function(err, result, fields){
                if(result.length === 0){
                    resolve("Message : You are already not following "+ uid + " OR profile does not exist.")
                }
                else{

                    //if it follows then we will delete the data and send the profile witn updated following count
                    con.query("delete from following where user_id in(select user_id from user_info where email = ?) and following_user_id = ?", [payload.email, uid], function(err, result, fields){
                        con.query("select user_info.user_id, user_info.bio, count(following.following_user_id) as following from user_info inner join following on user_info.user_id = following.user_id where user_info.email = ?", payload.email, function(err, result, fields){
                            if(result[0].user_id === null){
                                con.query("select user_id, bio from user_info where user_id = ?", uid, function(err, result, fields){
                                    resolve({user_id : result[0].user_id, bio : result[0].bio, following : 0})
                                })
                            }
                            else{
                                resolve({user_id : result[0].user_id, bio : result[0].bio, following : result[0].following})
                            }
                        })
                    })
                }
            })
        })
    }
}
