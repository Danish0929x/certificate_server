const mongoose = require('mongoose');
const Expert = require("../models/expert.model");
const userSchema = new mongoose.Schema({
    course_name:{
        type:String,
        required:true
    // },expert_id:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Expert"
    // },webinar_date:{
    //     type:Date,
    //     required:true
    // }
    // ,expert_sign:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Expert"
    }
    
});
const Course = mongoose.model('COURSE',userSchema);
module.exports = Course;