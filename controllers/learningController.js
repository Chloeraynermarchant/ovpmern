const express = require('express'); 
const fs = require('fs') 
const learningModel = require('../models/learning');  
const router = express.Router();    
router.use(express.json());     


router.post('/newlesson', (req, res) => {
    var path= __dirname + '/upload/' 
    var filename='downloaded'+req.body.title+'.mp4';
    // store file
    req.body.uploadedfile = req.body.uploadedfile.replace(/^data:(.*?);base64,/, ""); // <--- make it any type
    req.body.uploadedfile = req.body.uploadedfile.replace(/ /g, '+'); // <--- this is important
    
    fs.writeFile(`${path}${filename}`, req.body.uploadedfile, 'base64', function(err) {
        console.log(err);
    });
    var newlesson={
        title:req.body.title,
        author:req.body.author,
        references:req.body.references,
        contentsummary:req.body.contentsummary,   
        uploadedfile:req.body.uploadedfile  
    }
    learningModel.create(newlesson, (err, lesson) => {
        if (err) {
            res.send(500).send("Error in creating new lesson."); 
        }
        else {
            res.status(200).send({"messsage":"Acknowledged",lesson:lesson}); 
        }
    });
}); 

router.get('/specificLesson/:id', (req, res) => {
    learningModel.find({_id:req.params.id}, (err, lesson) => { 
        if (err) {
            res.send(500).send("Error in finding lesson."); 
        }
        else {
            res.status(200).send({lesson:lesson}); 
        }
    });
}); 
router.delete('/specificLesson/:id', (req, res) => {
    learningModel.deleteOne({_id:req.params.id}, (err, lesson) => { 
        if (err) {
            res.send(500).send("Error in finding lesson."); 
        }
        else {
            res.status(200).send({message:"Deleted"}); 
        }
    });
}); 
router.get('/allLessons', (req, res) => {
    learningModel.find({}, (err, lessons) => { 
        if (err) {
            res.send(500).send("Error in returning lessons."); 
        }
        else {
            res.status(200).send({lessons:lessons}); 
        }
    });
}); 

module.exports=router