var express = require('express');
var router = express.Router();
const profileController = require("../Controller/profile")
var auth = require('./auth');

router.get('/:userid', profileController.getprofile);                               //http://localhost:3001/profile/Viraj.Doshi     GET Request (Retrive profile of viraj doshi))

router.post('/:userid/follow', auth.required, profileController.follow);            //http://localhost:3001/profile/Viraj.Doshi/follow      POST Request (It will follow Viraj Doshi if you are logged in)

router.delete('/:userid/unfollow', auth.required, profileController.unfollow);      //http://localhost:3001/profile/Viraj.Doshi/unfollow    DELETE Request (It will unfollow the user Viraj Doshi)

module.exports = router;
