const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const auth = require('../middleware/user');
require('dotenv').config();

router.post('/register',async(req,res)=>{
    try {
       const user =  await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
        await user.save();
        const token = await user.generateAuthToken()
        res.status(200).json({noError:true,user:user,token:token});
    } catch (error) {
        res.status(200).json({noError:false});
    }
})

router.post('/login',async(req,res)=>{    
    const {email,password} = req.body;
    try {     
        const user = await User.findByCredentials(email,password);
        // const user = await User.findOne({        
            //     email:req.body.email,
            //     password:req.body.password
            // });
            if(user){
                const token = await user.generateAuthToken();
            // const token = jwt.sign({            
            //     name:user.name,
            //     email:user.email,            
            // },process.env.SECRET_KEY) 
                // console.log(token);
                return res.status(200).json({noError:true,token:token});
            }
            else{
                return res.status(400).json({message:"user not found",noError:false});
            }
    } catch (e) {
        res.status(400).json({message:e.message,noError:false});
    }
})


router.post('/logout',auth, async (req, res) => {
    try {        
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router;