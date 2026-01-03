const {instance}=require("../config/razorpay");

const User=require("../models/User");
const mailsender=require("../utils/mailsennder");
const {courseEnrollementemail}=require("../mail/templates/courseenrollementemail");




// exports.capturePayment = async (req, res) => {
//   const { courses } = req.body;
//   const userId = req.user.id;

//   if (courses.length === 0) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide Course Id",
//     });
//   }

//   let totalAmount = 0;

//   for (const course_Id of courses) {
//     let course;
//     try {
//       course = await Course.findById(course_Id);
//       if (!course) {
//         return res.status(400).json({
//           success: false,
//           message: `Could not find the course with id ${course_Id}`,
//         });
//       }
//       const mongoose = require("mongoose");

//       if (course.studentsEnrolled.includes(uid)) {
//         return res.status(200).json({
//           success: false,
//           message: `Student is already enrolled`,
//         });
//       }

//       totalAmount += course.price;
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }
//   }

//   const options = {
//     amount: totalAmount * 100,
//     currency: "INR",
//     receipt: Math.random(Date.now()).toString(),
//   };

//   try {
//     const paymentResponse = await instance.orders.create(options);
//     return res.status(200).json({
//       success: true,
//       message: paymentResponse,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Could not initiate order",
//     });
//   }
// };


//verify payment

const mongoose = require("mongoose");
const Course = require("../models/Course");


exports.capturePayment = async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;

    // ✅ Validation
    if (!courses || courses.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one course ID",
      });
    }

    let totalAmount = 0;
    const uid = new mongoose.Types.ObjectId(userId);

    // ✅ Calculate total price & validate enrollment
    for (const courseId of courses) {
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: `Course not found: ${courseId}`,
        });
      }

      if (course.studentsEnrolled.includes(uid)) {
        return res.status(400).json({
          success: false,
          message: "You are already enrolled in this course",
        });
      }

      totalAmount += course.price;
    }

    // ✅ Razorpay order options
    const options = {
      amount: totalAmount * 100, // INR → paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    // ✅ Create Razorpay order
    const paymentResponse = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      data: paymentResponse, // 🔥 frontend expects `data`
    });

  } catch (error) {
    console.error("CAPTURE PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Could not initiate payment",
      error: error.message,
    });
  }
};




exports.verifyPayment=async(req,res)=>{
    //get payment details from request body
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature,courses}=req.body;
    const userId=req.user.id;
  
  
  if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature){
    return res.status(400).json({
        success:false,
        message:"missing payment details",
    })
  }

  let body=razorpay_order_id+"|"+razorpay_payment_id;
  const crypto=require("crypto");
  const expectedSignature=crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
  .update(body.toString())
  .digest("hex");

  if(expectedSignature===razorpay_signature){
    await enrollStudents(courses,userId);

    return res.status(200).json({
        success:true,
        message:"payment verified and students enrolled successfully",
    })
     
  }
  return res.status(400).json({
    success:false,
    message:"invalid payment details",
  })
}


const enrollStudents=async(courses,userId)=>{
  if(!courses || userId){
    return res.status(400).json({
        success:false,
        message:"invalid data provided for enrollment",
    })
  }
  for(const courseId of courses){
   try{
const enrolledCourse=await Course.findOneAndUpdate(
    {_id:courseId},
    {$push:{studentsEnrolled:userId}},
    {new:true},
   );

if(!enrolledCourse){
    return res.status(500).json({
        success:false,
        message:"could not enroll student in course",
    })
  }
      const enrolledStudent=await User.findOneAndUpdate(
        {_id:userId},
        {$push:{courses:courseId}},
        {new:true},
       ); 
        console.log(enrolledStudent);
        //send mail to student
        const emailResponse=await mailsender(
            enrolledStudent.email,
            "congratulations from codehelp",
            courseEnrollementemail(`${enrolledStudent.firstName}`,enrolledCourse.courseName),
        );
        console.log("email response",emailResponse);

      
  }
    catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"internal server error during enrollment",
        error:error.message,
       }
    )


  }
  }


  
}
    

exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id; // ✅ from auth middleware

    if (!orderId || !paymentId || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided for sending email",
      });
    }

    const enrolledStudent = await User.findById(userId);

    if (!enrolledStudent) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await mailsender(
      enrolledStudent.email,
      "Payment Successful",
      `Congratulations ${enrolledStudent.firstName},
      
Payment successful!

Payment ID: ${paymentId}
Order ID: ${orderId}
Amount: ${amount / 100} INR

Happy Learning!`
    );

    return res.status(200).json({
      success: true,
      message: "Payment success email sent",
    });

  } catch (error) {
    console.log("Error sending payment success email:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while sending payment success email",
    });
  }
};



// exports.sendPaymentSuccessEmail=async(reqt,res)=>{
  
      
//       const{orderId,paymentId,amount}=req.body;
//     const userId=paymentDetails.notes.userId;
//         const user=await User.findById(userId);
//      if(!orderId || !paymentId || !amount || !user){
//       return res.status(400).json({
//         success:false,
//         message:"invalid data provided for sending email",
//       })
//      }
//   try{
//     // student ko shundo 
//   const enrolledStudent=await User.findById(userId);
//   await mailsender(
//     enrolledStudent.email,
//     "payment successfull from codehelp",
//     `congratulations ${enrolledStudent.firstName},payment successful. Payment ID: ${paymentId}, Order ID: ${orderId}, Amount: ${amount/100} INR. Happy Learning!`,
//   )
//   }
//       catch(error){
//         console.log("error occurred while sending payment success email",error);
//      return res.status(500).json({

//         success:false,
//         message:"internal server error while sending payment success email",
//         error:error.message,
//      })
//       }

//     }
//capture the payment and initiate the razorpay order

// exports.capturePayment=async(req,res)=>{
    
//      //get courseid and userid 
//       const {course_id}=req.body;
//       const userId=req.user.id;
//      //valiadtion

//      //valid courseId;
//      if(!course_id){
//         return res.json({
//             success:false,
//             message:"please provide course id ",
//         })
//      };
//      //valid coursedetails
//      let course;
// try{
//     course=await Course.findById(course_id);
//     if(!course){
//         return res.json({
//             success:false,
//             message:"could not find the course",
//         });
//     }
//  //check whether the user is already payed for specific course or not 
//  const uid=new mongoose.Types.ObjectId(userId);    ///convert from user id to object id 


//  if(course.studentEnrolled.includes(uid)){
//     return res.status(200).json({
//         success:false,
//         message:"student is already enrolled",
//     });
//  }

// }


// catch(error){
// console.log(error);
// return res.status(500).json({
//     success:false,
//     message:error.message,
// })

// }
    
// //------------------------------------------
//      //order create an return response
//   const amount=course.price;
//   const currency="INR";

//   const options={
//     amount:amount*100,
//     currency,
//     receipt:Math.random(Date.now()).toString(),
//     notes:{
//         courseId:course_id,
//         userId,
//     }
//   };
// //-------------------------------------------
//   try{
//       //intiate the payment using razorpay
//       const PaymentResponse=await instance.orders.create(options);
//       console.log(PaymentResponse);
//       //return response
//       return res.status(200).json({
//         success:true,
//         courseName:course.courseName,
//         courseDescription:course.courseDescription,
//         thumbnail:course.thumbnail,
//         orderId:PaymentResponse.id,
//         currency:PaymentResponse.currency,
//         amount:PaymentResponse.amount,
//       })
//   }
//   catch(error){
//    console.log(error);
//    res.json({
//     success:false,
//     message:'could not initiate order',
//    })

//   }
    
    
// }



// //verify signature of razor pay server

// exports.verifysignature=async(req,res)=>{
//     //secret key matching
// const webhooksecret="12345678";

// const signature=req.header["x-razorpay-signature"];
// const shasum= crypto.createHmac("sha256",webhooksecret);
// shasum.update(JSON.stringify(req.body));
// const digest=shasum.digest("hex");

// if(signature==digest){
//     console.log("payment is authorized ");
     
//     const {courseId,userId}=req.body.payload.payment.entity.notes;

//     try{
//       //fulfill
//       //find the course and enrolled the student
//       const enrolledcourse=await Course.findOneAndUpdate({_id:courseId},
//         {$push:{studentsEnrolled:userId}},
//         {new:true},
//       )

//       if(!enrolledcourse){
//         return res.status(500).json({
//             success:false,
//             message:"course not found ",
//         })
//       }
//       //  find the student and add the course to their list of enrolled courses 
//       const enrolledStudent=await User.findOneAndUpdate({_id:userid},
//         {$push:{courses:courseId}},
//         {new:true},
//       )
//       console.log(enrolledStudent);

//       //mail  send kardo
//       const emailresponse=await mailsender(
//         enrolledStudent.email,
//         "congratulation from codehelp",
//         "congratulation ,you are onboarded into new codehelp course ",


//       );
//       console.log(emailresponse);
//       return res.status(200).json({
//         success:true,
//         message:"signature verified and course added",
//           })

//     }
//     catch(error){
//       console.log(error);
//       return res.status(500).json({
//         success:false,
//         message:error.message,
//       })
//     }
// }
// else{
//     return res.status(400).json({
//         success:false,
//         message:"invalid request",
//     })
// }

// }
