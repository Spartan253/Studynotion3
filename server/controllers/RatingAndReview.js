const RatingAndReview=require("../models/RatingAndReview");
const Course=require("../models/Course");

exports.createrating=async(req,res)=>{
try{
    //get user id
      const userId=req.user.id;

         //fetchdata from req.body
         const{courseId,rating,review}=req.body;


         // check if user is enrolled or not
         const coursedetails=await Course.findOne({_id:courseId,
            studentsEnrolled:{$elemMatch:{$eq:userId}},

         },);

         if(!coursedetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrooled in the course ",
            })
         }
         // check if user  already  reviwed the course


         const alreadyreviewed=await RatingAndReview.findOne({
            user:userId,
            course:courseId,});

              if(alreadyreviewed){
                return res.status(403).json({
                    success:false,
                    message:'course is alreday reviewed by the user',

                })
              }
         //create revies rating 
         const ratingreview=await RatingAndReview.create({
            rating,review,
            course:courseId,
            user:userId,

         })
         //update rating review
  const updatedcoursedetail= await Course.findByIdAndUpdate({_id:courseId},
                  {
                    $push:{
                    ratingandreviews:ratingreview._id,
                  }},
                  {new:true},
)
console.log(updatedcoursedetail);

        //  return response
           return res.status(200).json({
            succes:true,
            message:'rating and review succesfuly',
           ratingreview})


    }
catch(error){
 console.log(error);
 return res.status(500).json({
    success:false,
    message:error.message,

 })
}

}



//get average rating

exports.getAverageRating=async(req,res)=>{
   try{
//get course id
const courseId=req.body.courseid;

//calculate avg rating
const result=await RatingAndReview.aggregate([
   {
      $match:{
         course:new mongoose.Types.objectId(courseId),

      },
},
{
   $group:{
      _id:null,
      averageRating:{ $avg:"$rating"},
   }
}
])
//return rating
     if(result.length>0){
      return res.status(200).json({
         success:true,
         averageRating:result[0].averageRating,
      })
     }

     //if no rating review is passed 
     return res.status(200).json({
      success:true,
      message:"average rating 0, no rating is given till now ",
      averageRating:0,
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


//getallratingreview   
//hw corresponding to courseid 
exports.getAllRatingAndreview=async(req,res)=>{
   try{
      const allreview=await RatingAndReview.find({})
                                              .sort({rating:"desc"})
                                              .populate({
                                                path:"user",
                                                select:"firstName lastname email image "
                                              })
                                              .populate({
                                                path:"course",
                                                select:"courseName",
                                              })
                                             .exec();
             return res.status(200).json({
               success:true,
               message:"All reviews fetched succesfully",
                data:allreview,

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
















//average rating



//getall rating
