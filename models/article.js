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
    }
}