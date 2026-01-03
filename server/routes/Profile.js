const express=require('express')
const router=express.Router();
const{auth}=require("../middleware/auth");
const{
    deleteaccount,updateProfile,getuserdetails,getEnrolledCourses
}=require("../controllers/Profile");

//delete user account
router.delete("/deleteProfile",auth,deleteaccount);
router.put("/updateProfile",auth,updateProfile);
router.get("/getUserDetails",auth,getuserdetails);
router.get("/getEnrolledCourses",auth,getEnrolledCourses);
// router.put("/updatedDisplayPicture",auth,updateDisplayPicture);


module.exports=router;