const express = require('express')
const router = express.Router();
const passport = require('passport')
const catchAsync = require('../utils/catchAsync')
const users = require('../controllers/users')



const authenticateUser = passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' })


router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));


router.route('/login')
    .get(users.renderLogin)
    .post(authenticateUser, users.login)


router.get('/logout', users.logout)


module.exports = router