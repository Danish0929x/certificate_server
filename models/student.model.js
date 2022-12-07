const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    certificate_id:{
        type:String,
        required:true
    },student_fullname:{
        type:String,
        required:true
    },course_completed:{
        type:Boolean,        
        default:true
    },course_name:{
        type:String,
        required:true
    },completion_date:{
        type:String,
        required:true
    },industry_expert:{
        type:String,
        required:true
    },certificate_qrcode:{
        type:String,
        required:true
    },expert_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Expert"
    }
});

const Student = mongoose.model('Student',userSchema);
module.exports = Student;