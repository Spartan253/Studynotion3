const User=require("../models/User");
const mailsender=require('../utils/mailsennder');
const crypto = require("crypto");
const bcrypt=require('bcrypt');



//reset passwordd token mail send
exports.resetpasswordToken=async(req,res)=>{
    try{ //email
        const {email}=req.body
         //check usre for email
          console.log("user",email);
         const user = await User.findOne({ email });
        
     if(!user){
         return res.status(404).json({
             success:false,
             message:"user not register exist ",
         });
     }
     //generate token 
     const token=crypto.randomUUID();
     console.log(token);
     //update user by adding token and expiration time 
       const updatedetails=await User.findOneAndUpdate(
         {email:email},
         {
             token:token,
             resetpasswordexpires:Date.now() +5*60*1000,
             },
             {new:true}
       );
     //create url send maill
     const url=`http://localhost:3000/update-password/${token}`;
     
     await mailsender(email,"password reset link",
               `password reset link:${url}`
     );
     return res.status(200).json({
         success:true,
         message:"email send succesfully please check emaila nd password",
        updatedetails
        })
     }
     catch(error){
  console.log(error);
  return res.status(500).json({
    success:false,
    message:"something went wrong "
  })
    }
}


//resetpassword in db

exports.resetpassword=async(req,res)=>{
    try{
   //data fetch 
const {password,confirmPassword,token}=req.body;

   //validation 
if(password !==confirmPassword){
    return res.status(400).json({
        success:false,
        message:"password not matchoing",
    })
}
   //getuserdetails 
 const userdetails=await User.findOne({token});

   // if entry not exxist 
if(!userdetails){
    return res.status(400).json({
        success:false,
        message:"token invalid ",
    })
}
   //token time expire 
if(userdetails.resetpasswordexpires< Date.now()){
    return res.status(400).json({
        success:false,
        message:"token expired ",
    })
}
   //hash password 
   const hashpassword=await bcrypt.hash(password,10);

   //update password 
   await User.findOneAndUpdate(
    {  token: token },
    {
        password: hashpassword,
        token: null,
        resetpasswordexpires: null
    },
    { new: true }
);

   return res.status(200).json({
    success:true,
    message:"succesfull reset"
   })
    }
    catch(error){
  console.log(error);
  return res.status(500).json({
    success:false,
  message:'Not created succesfully',
  })
    }
}

