const mongoose = require('mongoose'); 

const qualifierSchema = new mongoose.Schema({
    name: String,
    typeschool: String, 
    gcseresult: String,
    schoolgoverned: String,
    schoolsize:String,
    coresubjectstatistics:String,
    notesaditionalinfo:String,
    publishedmediaaddresses:String,
    ofstedreport:String,
    contactname:String,
    jobrole:String,
    phoneextension:String,
    phonenumber:String,
    emailtype:String,
    email:String,
    schoolname:String,
    schooladdress:String,
    country:String,
    townorcity:String,
    schoolwebsite:String,
    user:String
}); 

const qualifierModel = mongoose.model('Qualifier', qualifierSchema); 
module.exports = qualifierModel;
