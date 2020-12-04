// modules required for routing
let express = require('express');
let router = express.Router();
//let mongoose = require('mongoose');

// define the game model
let Book = require('../models/surveys'); //modify name 
let indexController = require('../controllers/index');

/* GET home page. wildcard */
router.get('/', indexController.displayHomePage);

/* GET home page. wildcard */
router.get('/home', indexController.displayHomePage);

/* GET list page. wildcard */
router.get('/list', indexController.displayBooksPage); 

/* GET contact page. wildcard */
router.get('/contact', indexController.displayContactPage);

/* GET about page. wildcard */
router.get('/about', indexController.displayAboutPage);

/* GET about page. wildcard */
router.get('/table', indexController.displayTablePage);

/* GET Route for displaying the Login page */  
router.get('/login', indexController.displayLoginPage); 

/* POST Route for processing the Login page */  
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register page */ 
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */ 
router.post('/register', indexController.processRegisterPage);

/* GET to perform  User Logout */  
router.get('/logout', indexController.performLogout);

module.exports = router;