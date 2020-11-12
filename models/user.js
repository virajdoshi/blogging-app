var jwt = require('jsonwebtoken');
var secret = require('../config/authConfig').secret;
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    register:async function(con, data){
        return new Promise(function(resolve) {
            con.query("select * from user_info where user_id = ? OR email = ?", [data.data.user_id, data.data.email], function (err, result, fields){    
                if(result.length === 0){
                    bcrypt.hash(data.data.password, saltRounds, (err, hash) => {
                        con.query("INSERT INTO user_info(user_id, first_name, last_name, email, password, bio) VALUES(?, ?, ?, ?, ?, ?)",[
                            data.data.user_id,
                            data.data.first_name,
                            data.data.last_name,
                            data.data.email,
                            hash,
                            data.data.bio
                            ], function (err, result, fields){
                                if (err) throw err;
                        })
                    });
                    resolve("Message: Registration Successfull");
                }
                else{
                    return resolve("Message: Registration Failed beacause your email or username already exist");
                }
            })
        })
    },

    login:async function(con, data){
        return new Promise(function(resolve) {
            con.query("select * from user_info where email = ?", [data.data.email], function (err, result, fields){
                if(result.length === 0){
                    resolve("Message: User does not exist. Register your self.")
                }
                else{
                    bcrypt.compare(data.data.password, result[0].password, function(err, result){
                        if(result === true){
                            var today = new Date();
                            var exp = new Date(today);
                            exp.setDate(today.getDate() + 60);
                        
                            var token = jwt.sign({
                            user_id: data.data.user_id,
                            email: data.data.email,
                            exp: parseInt(exp.getTime() / 1000),
                            }, secret);

                            resolve({user_id : data.data.user_id, email : data.data.email, token : token});
                        }
                        else{
                            resolve("Message: Password you have entered is wrong")
                        }
                    })
                }
            })
        })
    },

    getuser: async function(con, data){
        return new Promise(function(resolve) {
            con.query("select user_id, first_name, last_name, email from user_info where email = ?", [data.email], function (err, result, fields){
                resolve({user_id : result[0].user_id, 
                        first_name : result[0].first_name,
                        last_name : result[0].last_name,
                        email : result[0].email
                });
            })
        })
    },

    updatePass: async function(con, payload, data){
        return new Promise(function(resolve) {
            con.query("select password from user_info where email = ?", [payload.email], function(err, result, fields){
                bcrypt.compare(data.data.oldPass, result[0].password, function(err, result){
                    if(result === true){
                        bcrypt.hash(data.data.newPass, saltRounds, (err, hash) =>{
                            con.query("update user_info set password = ? where email = ?", [hash, payload.email], function(err, result, fields){
                                resolve("Message : Your Password is now updated in our system")
                            })
                        });
                    }
                    else{
                        resolve("Message : You have entered your old password wrong try again")
                    }
                })
            })
        })
    },

    updateBio: async function(con, payload, data){
        return new Promise(function(resolve) {
            con.query("update user_info set bio = ? where email = ?", [data.data.Bio, payload.email], function(err, result, fields){
                resolve("Message : Bio is been Updated")
            })
        })
    }
}