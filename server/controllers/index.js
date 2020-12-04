let express = require('express');
let router = express.Router();
let mongoose = require('mongoose'); 
let passport = require('passport'); 

// enable jwt 
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

//create the user model instance 
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next) => {
    res.render('content/index', {title: 'Home', displayName: req.user ? req.user.displayName : ''}); 
}

module.exports.displayBooksPage = (req, res, next) => { 
    res.render('surveys/list', { title: 'Surveys', displayName: req.user ? req.user.displayName : ''}); 
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('content/contact', {title: 'Contact', displayName: req.user ? req.user.displayName : ''}); 
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('content/about', {title: 'About', displayName: req.user ? req.user.displayName : ''}); 
}

module.exports.displayTablePage = (req, res, next) => {
    res.render('content/table', {title: 'Start Here', displayName: req.user ? req.user.displayName : ''}); 
}

//display login page 
module.exports.displayLoginPage = (req, res, next) => {
    //check is the user is already logged in
    if(!req.user)
    {
        res.render('auth/login', 
        {
           title: "Login",
           messages: req.flash('loginMessage'),
           displayName: req.user ? req.user.displayName : '' 
        })
    }
    else
    {
        return res.redirect('/');
    }
    }

    //process login 
    module.exports.processLoginPage = (req, res, next) => {
        passport.authenticate('local',
        (err, user, info) => {
            // server err?
            if(err)
            {
                return next(err);
            }
            // is there a user login error?
            if(!user)
            {
                req.flash('loginMessage', 'Authentication Error');
                return res.redirect('/login');
            }
            req.login(user, (err) => {
                // server error?
                if(err)
                {
                    return next(err);
                }
    
                const payload = 
                {
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    email: user.email
                }
    
                const authToken = jwt.sign(payload, DB.Secret, {
                    expiresIn: 604800 // 1 week
                });
    
               return res.redirect('/surveys');
            });
        })(req, res, next);
    }
    
    //display register page
    module.exports.displayRegisterPage = (req, res, next) => {
        // check if the user is not already logged in
        if(!req.user)
        {
            res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            return res.redirect('/');
        }
    }
    
    //process register page 
    module.exports.processRegisterPage = (req, res, next) => {
        // instantiate a user object
        let newUser = new User({
            username: req.body.username,
            //password: req.body.password
            email: req.body.email,
            displayName: req.body.displayName
        });
    
        User.register(newUser, req.body.password, (err) => {
            if(err)
            {
                console.log("Error: Inserting New User");
                if(err.name == "UserExistsError")
                {
                    req.flash(
                        'registerMessage',
                        'Registration Error: User Already Exists!'
                    );
                    console.log('Error: User Already Exists!')
                }
                return res.render('auth/register',
                {
                    title: 'Register',
                    messages: req.flash('registerMessage'),
                    displayName: req.user ? req.user.displayName : ''
                });
            }
            else
            {
                // if no error exists, then registration is successful
    
                // redirect the user and authenticate them
    
                return passport.authenticate('local')(req, res, () => {
                    res.redirect('/surveys')
                });
            }
        });
    }

    //perform logout 
    module.exports.performLogout = (req, res, next) => {
        req.logout();
        res.redirect('/');
    }