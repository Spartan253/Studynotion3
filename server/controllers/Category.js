const Category=require("../models/Category");
// const getAverageRating = require('../controllers/RatingAndReview/getAverageRating');


//create tag api handler function

exports.createCategory=async(req,res)=>{
    try{
    const {name,description}=req.body;

    if(!name || !description){
        return res.status(400).json({
            success:false,
            message:"fill all the details",
        })
    }

    //create entry in db
      const Categorydetails=await Category.create({
        name:name,
        description:description,
      });
      console.log(Categorydetails);

      return res.status(200).json({
        success:true,
        message:'category created succesfuly',
      })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"category was not created succesfully",
        })
    }
}


//get all tags
exports.showallCategory=async(req,res)=>{
    try{
     

      if (!req.user || req.user.accountType !== "Instructor") {
        return res.status(403).json({
            success: false,
            message: "Only admins can access this",
        });
    }

    const allCategory=await Category.find({},{
      name:true,
      description:true,
    });
      res.status(200).json({
        success:true,
        message:"all category returend succesfully",
        allCategory,
      })
    }
    catch(error){
        return res.status(500).json({
          success: false,
      message: "Failed to return categories",
      error: error.message,
        })  
    }
}


//category pahge details 
exports.categorypagedetails=async(req,res)=>{
  try{
    //get data 
     const {categoryId}=req.body;

     //get courses for specified id 
     const selectedcategory=await Category.findById(categoryId)
                                    .populate("courses")
                                    .exec();

    //  validation
    if(!selectedcategory){
      return res.status(404).json({
        success:false,
        message:"data not found ",
      })
    }
    //get courses for different category
    const differentCategory=await Category.find({
      _id:{$ne:categoryId},
})
.populate("courses")
.exec();   
    //get top selling couses
   
    const topcourses=await Course.find({})
    .sort({Averagerating:-1})
    .limit(5);
//return response 
  return res.status(200).json({
    success:true,
    data:{
      selectedcategory,
      differentCategory,
    }
  })
  }
  catch(error){
console.log(error);
return res.status(500).json({
success:false,
message:error.message,
})
  }
}