const express = require('express')
const router = express.Router()
const registerUser = require('../controller/registerUser');
const checkEmail = require('../controller/checkEmail');
const checkPassword = require('../controller/checkPassword');
const userDetails = require('../controller/userDetails');
const logout = require('../controller/logout');
const updateUserDetails = require('../controller/updateUserDetails');
const searchUser = require('../controller/searchUser');

// create user 
router.post('/register' , registerUser);

// check user email
router.post('/email' , checkEmail);

// chceck user password
router.post('/password' , checkPassword);

// login user details
router.get('/user-details' , userDetails);

// update user details
router.post('/update-user' , updateUserDetails);

// logout user
router.get('/logout' , logout);

// search user
router.post('/search-user' , searchUser)

module.exports = router;
