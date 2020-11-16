module.exports = {
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

    update: async function(con, payload, data){
        return new Promise(function(resolve) {
            con.query("select user_id from user_info where email = ?", payload.email, function(err, result, fields){
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
    }
}