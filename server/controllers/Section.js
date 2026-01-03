const Section = require('../models/Section');
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, courseId } = req.body;

    //data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'missing properties',
      });
    }
    console.log("course id ", courseId);
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "there is is some error in course id",
      })
    }
    //create section
    const newSection = await Section.create({ sectionName });

    //update course with section
    const updatedCoursedetails = await Course.findByIdAndUpdate(courseId,
      {
        $push: {
          courseContent: newSection._id,
        }

      },
      { new: true },)
      .populate({
        path: 'courseContent',
        model: 'Section',
        populate: {
          path: 'subSection',
          model: 'SubSection',
        },
      });


    console.log("update course details", updatedCoursedetails);

    ///how can i populate both section and subsection 
    //return res
    return res.status(200).json({
      success: true,
      message: "section created succesfully",
      data: updatedCoursedetails
    })
  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "section does not  created succesfully",

    })
  }
}
//update section
exports.updateSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, sectionId, courseId } = req.body;
    console.log(sectionId);
    console.log(sectionName);
    //data validation
    if (!sectionName || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: 'missing properties',
      });
    }
    console.log(sectionId, sectionName, courseId);
    //data update 
    const updatedSection = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });
    console.log(updatedSection);

    const updatedCourse = await Course.findById(courseId).populate({
      path: 'courseContent',
      model: 'Section',
      populate: { path: 'subSection', model: 'SubSection' },
    });

    console.log("Updated course:", updatedCourse);
    //return res

    return res.status(200).json({
      success: true,
      message: "section updated succesfully",
      updatedCourse,
    });

  }
  catch (error) {
    return res.status(500).json({
      success: false,
      message: "section not updated succesfully",
    });

  }
}



// delete section 


// exports.deleteSection=async(req,res)=>{
//   try{

//     //getid
// const{sectionId,courseId}=req.params;
// //find byid nad delete
//   const section =await Section.findByIdAndDelete(sectionId);
// //do we need to delete data from the section
//   if (!section) {
//       return res.status(404).json({
//         success: false,
//         message: "Section not found",
//       });
//     }

// const deletelistcontnent=  await Course.findByIdAndUpdate(courseId, {
//       $pull: { courseContent: sectionId },
//     });

//    const deleteSection= await Section.findByIdAndDelete(sectionId);
// //return res
// return res.status(200).json({
//     success:true,
//     message:'section deleted succesfully',
// })

//   }

//   catch(error){
//     return res.status(500).json({
//         success:false,
//         message:"unable to delete section please try again",
//         error:error.message,
//     })
//   }
//   }


exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    // 1️⃣ Pull sectionId from course.courseContent array
    await Course.findByIdAndUpdate(courseId, {
      $pull: { courseContent: sectionId },
    });

    // 2️⃣ Find the section to get all its subSections
    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }


    // 4️⃣ Delete the section itself
    await Section.findByIdAndDelete(sectionId);

    // 5️⃣ Return updated course
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete section",
      error: error.message,
    });
  }
};
