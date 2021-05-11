const express = require('express');    
const qualifierModel = require('../../models/qualifier');  
const router = express.Router();    
router.use(express.json());     


router.post('/newqualifier', (req, res) => {
    var newqualifier={
        typeschool:req.body.typeschool, 
        gcseresult:req.body.gcseresult,
        schoolgoverned:req.body.schoolgoverned,
        schoolsize:req.body.schoolsize,
        coresubjectstatistics:req.body.coresubjectstatistics,
        notesaditionalinfo:req.body.notesaditionalinfo,
        publishedmediaaddresses:req.body.publishedmediaaddresses,
        ofstedreport:req.body.ofstedreport,
        contactname:req.body.contactname,
        jobrole:req.body.jobrole,
        phoneextension:req.body.phoneextension,
        phonenumber:req.body.phonenumber,
        emailtype:req.body.emailtype,
        email:req.body.email,
        schoolname:req.body.schoolname,
        schooladdress:req.body.schooladdress,
        country:req.body.country,
        townorcity:req.body.townorcity,
        schoolwebsite:req.body.schoolwebsite,
        user:req.body.user
    }
    qualifierModel.create(newqualifier, (err, qualifier) => {
        if (err) {
            res.send(500).send("Error in creating new Qualifier."); 
        }
        else {
            res.status(200).send({"messsage":"Acknowledged",qualifier:qualifier}); 
        }
    });
}); 

router.get('/specificqualifier/:id', (req, res) => {
    qualifierModel.find({_id:req.params.id}, (err, qualifier) => { 
        if (err) {
            res.send(500).send("Error in finding Qualifier."); 
        }
        else {
            res.status(200).send({lesson:lesson}); 
        }
    });
}); 

router.get('/allqualifier', (req, res) => {
    qualifierModel.find({}, (err, qualifiers) => { 
        if (err) {
            res.send(500).send("Error in returning Qualifiers."); 
        }
        else {
            res.status(200).send({qualifiers:qualifiers}); 
        }
    });
}); 

module.exports=router