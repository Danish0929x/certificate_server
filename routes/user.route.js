const router = require("express").Router();
const Student = require("../models/student.model");
const Expert = require("../models/expert.model");
const Course = require("../models/course.model");
const auth = require('../middleware/user')
const QRCode = require("qrcode");
const User = require("../models/user.model");

// ------------- For certificate frontend-module -------------------------------

router.post("/:id",async(req,res) => {
    try {
        const id = req.params.id;        
        Student.findOne({certificate_id:id }).populate("expert_id").then((data)=>{   
            console.log(data);
            if(!data){
                res.send('error');
            }else{
                res.send(data)
            }
        }).catch(error=>console.log(error));
    } catch (error) {
        res.status(400).json('notfound');
    }
})

//------------------------------------------------------------------------------


// ------------------------admin panel routers----------------------------------

// Here using auth as middleware so if admin is logged in then, no one can directly access the routers from any 
// third-party application

// -----------------------------------------------------------------------------

// get students router
router.get("/getstudents",async(req,res) => {
    try {            
        const result = await Student.count();
        if(result)
            res.status(200).json(result);
        else
            res.status(200).json(false);
    } catch (error) {
        console.log(error);
    }
})

// add student with certificate
router.post("/",auth,async(req,res) => {
    try {        
        // individual entry
        const {certificate_id,student_fullname,c_date,industry_expert,course_name,expert_id} = req.body;
    
        const qr_String = "https://alchemial.com/certificates/" + certificate_id;  
        const certificate_qrcode = await QRCode.toDataURL(qr_String); // converting qr_code to string
        const completion_date = new Date(c_date).toISOString(); 
        const details = new Student({certificate_id,student_fullname,course_name,certificate_qrcode,completion_date,industry_expert,expert_id});         
        // date format : 12-02-2022
        const des = await details.save()
        if(des)
            res.status(200).json(true);
        else
            res.status(200).json(false);

        // accept array as an input

        // const js = req.body;        
        // let des = true;
        // for (var i=0; i < js.length; i++) {              
        //     const {certificate_id,student_fullname,c_date,industry_expert,course_name,expert_id} = js[i];            
        //     const completion_date = new Date(c_date).toISOString();
        //     const certificate_qrcode = await QRCode.toDataURL(js[i].certificate_id);            
        //     const details = new Student({certificate_id,student_fullname,course_name,certificate_qrcode,completion_date,industry_expert,expert_id}); 
        //     const des1 = await details.save();
        //     if(des1 == false)
        //         des = false;
        //  }
        //     if(des)
        //         res.status(200).json('Successfull');
        //     else
        //         res.status(200).json('Unsuccessfull');        
    } catch (error) {
        console.log(error);
        res.send(error);
    }
})


// ----------------Expert routers ------------

// gets experts
router.get("/getexperts",async(req,res) => {
    try {            
        const result = await Expert.find().exec();
        if(result)
        res.status(200).json(result);
        else
        res.status(200).json(false);
    } catch (error) {
        console.log(error);
    }
})

// adds experts
router.post("/addexpert",auth,async(req,res) => {
    try {        
        const expert_name = req.body.user.exp_name;
        const expert_sign = req.body.user.course_name;

        const details = new Expert({expert_name,expert_sign});
        const des = await details.save();
        if(des)
            res.status(200).json(true);
        else
            res.status(200).json(false);
    } catch (error) {
        res.status(400).json('notfound');
    }
});

// deletes experts
router.post("/deleteExpert/:id",auth,async(req,res) => {
    try {            
        const _id = req.params.id;
        const result = await Expert.findByIdAndDelete({_id}).exec();
        if(result)
        res.status(200).json(true);
        else
        res.status(200).json(false);
    } catch (error) {
        console.log(error);
    }
})

// --------------------------------------------

// ---------------Courses routers -------------

// gets course
router.get("/getcourses",async(req,res) => {
    try {            
        const result = await Course.find().exec();
        if(result)
        res.status(200).json(result);
        else
            res.status(200).json(false);
        } catch (error) {
            console.log(error);
    }
})

// add course
router.post("/addcourse",auth,async(req,res) => {
    try {
        // console.log(req.body)
        const course_name = req.body.user.course_name;        
        const details = new Course({course_name});
        const des = await details.save();
        if(des)
            res.status(200).json(true);
        else
        res.status(200).json(false);
    } catch (error) {
        res.status(400).json('notfound');
    }
});

// deletes the course using id in the parameters
router.post("/deleteCourse/:id",auth,async(req,res) => {
    try {            
        const _id = req.params.id;
        const result = await Course.findByIdAndDelete({_id}).exec();
        if(result)
            res.status(200).json(true);
        else
            res.status(200).json(false);
    } catch (error) {
        console.log(error);
    }
})

//---------------------------------------

// router.post("/this/addcourse",async(req,res) => {
//     try {
//         const {course_name,expertId} = req.body;
//         const webinar_date = new Date();
//         const details = new Course({course_name,expertId,webinar_date});        
//         const res = await details.save();
//         if(res)
//             res.status(200).json('successfull');
//         else
//             res.status(200).json('Unsuccessfull');
//     } catch (error) {
    //         res.status(400).json('notfound');
    //     }
    // })
    
// updates the experts
router.patch("/updateexpert/:id",auth,async(req,res)=>{
    try {                
        const {expert_name,expert_sign} = req.body;
        const des = await Expert.findByIdAndUpdate({_id:req.params.id},{
            $set:{
                expert_name:expert_name,
                expert_sign:expert_sign
            }
        });
        if(des){
            res.status(200).json(true)
        }else res.status(200).json(false);
    } catch (error) {
        console.log(error);
    }
})


    // ----------------------update the student (not using this routers) ----------------
router.patch("/updatemember/",auth,async (req,res)=>{
    try{                                
        const js = req.body;        
        console.log(js)
        let des = true;
        for (var i=0; i < js.length; i++) {   
            const qr_String = "https://alchemial.com/certificates/" + js[i].certificate_id;           
            const certificate_qrcode = await QRCode.toDataURL(qr_String);                    
            const des1 = await Student.findOneAndUpdate({certificate_id:js[i].certificate_id},{$set:{certificate_qrcode : certificate_qrcode}});            
            if(des1 == false)
                des = false;
        }
        if(!des)
            res.send("Error");
        else res.send(des);                                                                         
    }catch (error){
        console.log(error)
    }
});

router.patch("/updatecoursename/",auth,async (req,res)=>{
    try{                                        
        const js1 = req.body.course_name;
        const js2 = req.body.new_course_name;        
        const des = await Student.updateMany({course_name:js1},{$set:{course_name : js2}}, {"multi": true});             
        if(!des)
            res.send("Error");
        else res.send(des);
    }catch (error){
        console.log(error)
    }
});

module.exports = router;