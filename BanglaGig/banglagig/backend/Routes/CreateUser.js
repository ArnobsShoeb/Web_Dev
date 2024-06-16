const express =require('express')
const router = express.Router()
const User = require("../models/User")

router.post("/createuser",async(req,res)=>{
     try {
      await  User.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:req.body.password,
            usertype:req.body.usertype

        })
     res.json({success:true});
    } catch (error) {
        console.log(error)
        res.json({success:false});
    }

})
module.exports = router;