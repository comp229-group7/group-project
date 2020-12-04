// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');
let passport = require('passport');

let Survey = require('../models/surveys');

// define the survey model
let surveyController = require('../controllers/surveys');

// helper function for guard purposes 
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET surveys List page. READ */
router.get('/', surveyController.displaySurveysList);// esta bn


//  GET the Survey Details page in order to add a new Survey
router.get('/add', requireAuth, surveyController.displayAddPage); // cambie /add a /details 
    /*****************
     * ADD CODE HERE *
     *****************/

// POST process the Survey Details page and create a new Survey - CREATE
router.post('/add', requireAuth, surveyController.processAddPage); //  cambie /add a /details 

    /*****************
     * ADD CODE HERE *
     *****************/


// GET the Survey Details page in order to edit an existing Survey
router.get('/edit/:id', requireAuth, surveyController.displayEditPage); 

    /*****************
     * ADD CODE HERE *
     *****************/

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', requireAuth, surveyController.processEditPage); 

    /*****************
     * ADD CODE HERE *
     *****************/


// GET - process the delete by user id
router.get('/delete/:id', requireAuth, surveyController.performDelete);  

    /*****************
     * ADD CODE HERE *
     *****************/


module.exports = router;
