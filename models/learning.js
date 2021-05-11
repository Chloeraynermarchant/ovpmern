const mongoose = require('mongoose'); 

const learningSchema = new mongoose.Schema({  
    title:String,
    author:String,
    references:String,
    contentsummary:String,   
    uploadedfile:String  
}); 

const learningModel = mongoose.model('Learning', learningSchema); 
module.exports = learningModel;

