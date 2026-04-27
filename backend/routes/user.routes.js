const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.post("/register", async(req,res)=>{
 try{
   const user = await User.create(req.body);
   res.json(user);
 }catch(err){
   res.status(500).json({
    message: err.message
   });
 }
});

module.exports = router;