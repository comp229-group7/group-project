let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let Survey = require('../models/surveys');


module.exports.displaySurveysList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(surveys);
            res.render('surveys/list',  
            {title: 'Surveys', 
            surveys: surveyList, //este surveys: pasa a list.ejs
            displayName: req.user ? req.user.displayName : ''
        }); 
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(surveys);
            res.render('surveys/add', {title: 'Add Survey', //folder calling
            surveys: surveyList,
            displayName: req.user ? req.user.displayName : '',
            userName: req.user ? req.user.username : ''//Added
             })  
        }
    });


            
}

module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "first": req.body.first, 
        "last": req.body.last,
        "gender": req.body.gender,
        "age": req.body.age,
        "question1": req.body.question1,
        "question2": req.body.question2,
        "question3": req.body.question3,
        "question4": req.body.question4,
        "question5": req.body.question5,
        "createdbyuser": req.user ? req.user.username : '' //added
    });

    Survey.create(newSurvey, (err, Survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the survey list
            res.redirect('/surveys');
        }
    });

}


module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id; 

    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('surveys/edit', {title: 'Edit Survey', surveys: surveyToEdit,//, surveys: surveys //check this surveys //este surveys pasa a edit.ejs
            displayName: req.user ? req.user.displayName : ''}) 
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "first": req.body.first, 
        "last": req.body.last,
        "gender": req.body.gender,
        "age": req.body.age,
        "question1": req.body.question1,
        "question2": req.body.question2,
        "question3": req.body.question3,
        "question4": req.body.question4,
        "question5": req.body.question5,
    });
    
    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the survey list
            res.redirect('/surveys');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the survey list
             res.redirect('/surveys');
        }
    });
}