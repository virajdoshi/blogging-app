module.exports = {

    //create an article required jwt token and data
    create: async function(con, payload, data){
        return new Promise(function(resolve) {
            con.query("select user_id from user_info where email = ?", payload.email, function(err, result, fields){
                con.query("insert into articles(title, description, body, author) values (?, ?, ?, ?)", [data.data.title, data.data.description, data.data.body, result[0].user_id])
                con.query("select * from articles where author = ?", result[0].user_id, function(err, res, fields){
                    resolve(res[0]);
                })
            })
        })
    },


    //update article required jwt token and data
    update: async function(con, payload, data){
        return new Promise(function(resolve) {
            con.query("select user_id from user_info where email = ?", payload.email, function(err, result, fields){
                
                //updating article based on author name and artile id 
                con.query("update articles set title = ?, description = ?, body = ? where author = ? and article_id = ?", [data.data.title, data.data.description, data.data.body, result[0].user_id, data.data.article_id], function(err, res, fields){
                    if(res.affectedRows === 0){
                        resolve("Message : The article is not updated check your article_id and try again.");
                    }
                    else{
                        con.query("select * from articles where author = ? and article_id = ?", [result[0].user_id, data.data.article_id], function(err, r, fields){
                            resolve(r[0]);
                        })
                    }
                })
            })
        })
    },

    //delete an article based on article id and author with proper jwt token
    delete: async function(con, payload, data){
        return new Promise(function(resolve) {
            con.query("select user_id from user_info where email = ?", payload.email, function(err, result, fields){
                con.query("delete from articles where article_id = ? and author = ?", [data, result[0].user_id], function(err, res, fields){
                    if(res.affectedRows === 0){
                        resolve("Message : The article is not deleted check your article_id and try again.");
                    }
                    else{
                        resolve("Message : The article is succesfully deleted");
                    }
                })
            })
        })
    },

    //retrive an article with its id
    getArticle: async function(con, data){
        return new Promise(function(resolve) {
            con.query("select article_id, title, description, body, author from articles where article_id = ?", data, function(err, result, fields){
                if(result.length === 0){
                    resolve("Message : The article you are trying to read is not available. Check your article ID and try again.");
                }
                else{
                    resolve(result[0]);
                }
            }) 
        })
    },

    //retrive all articles of specific author 
    listByAuthor: async function(con, data){
        return new Promise(function(resolve){
            con.query("select article_id, title from articles where author = ?", data, function(err, result, fields){
                if(result.length === 0){
                    resolve("Message : Author never published any articles.");
                }
                else{
                    resolve(result);
                }
            })
        })
    },

    //list all article
    listAll: async function(con){
        return new Promise(function(resolve){
            con.query("select article_id, title from articles", function(err, result, fields){
                if(result.length === 0){
                    resolve("Message : At this moment no articles is available");
                }
                else{
                    resolve(result);
                }
            })
        })
    },

    //feed will only work if user follow to another user
    feed: async function(con, payload){
        var feedArticles = [];
        return new Promise(function(resolve){
            con.query("select user_id from user_info where email = ?", payload.email, function(err, result, fields){
               
                //retive all the following user name to create the feed
                con.query("select following_user_id from following where user_id = ?", result[0].user_id, function(err, res, fields){
                    if(res.length === 0){
                        resolve("Message : follow any users to see your feed.")
                    }
                    else{

                        //to show the feed retive all the articles for following user and store it in array and return the feed
                        for(var i = 0; i<res.length; i++){
                            feedArticles.push(new Promise(function(resolve, reject){
                                con.query("select title, description, body from articles where author = ?", res[i].following_user_id, function(err, r, fields){
                                    if(err) reject(err)
                                    var articles = r
                                    resolve(articles);
                                })
                            }))
                        }
                        Promise.all(feedArticles).then(function(results) {
                            resolve(results);
                        });
                    }
                })
            })
        })
    }
}