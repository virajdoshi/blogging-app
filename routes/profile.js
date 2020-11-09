var express = require('express');
var router = express.Router();
const profileController = require("../Controller/profile")
var auth = require('./auth');

router.get('/:userid', profileController.getprofile);

router.post('/:userid/follow', auth.required, profileController.follow);

module.exports = router;