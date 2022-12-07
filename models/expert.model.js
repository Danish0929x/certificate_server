const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
    expert_name:{
        type:String,
        required:true
    },expert_sign:{
        type:String,
        required:true
    }
});

const Expert = mongoose.model('Expert',expertSchema);
module.exports = Expert;