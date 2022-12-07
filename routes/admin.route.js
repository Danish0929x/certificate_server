const router = require('express').Router();
const User = require("../models/user.model");
const auth = require('../middleware/user');

// get all admin users

router.get("/getusers",async(req,res) => {
    try {            
        const result = await User.find({}).exec();
        if(result)
            res.status(200).json(result);
        else
            res.status(200).json(false);
    } catch (error) {
        console.log(error);
    }
})

router.post("/deleteUser/:id",auth,async(req,res) => {
    try {            
        const _id = req.params.id;
        const result = await User.findByIdAndDelete({_id}).exec();
        if(result)
            res.status(200).json(true);
        else
            res.status(200).json(false);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;