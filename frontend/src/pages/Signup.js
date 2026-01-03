// import React from 'react'
// import signup from '../assets/signup.webp'
// import {useState} from 'react'
// import HighlightText from '../components/core/HomePage/HighlightText';
// import CTABUTTON from '../components/core/HomePage/CTABUTTON';
// import { useDispatch ,useSelector} from 'react-redux';
// import {toast} from  'react-hot-toast'
// import { setSignupData } from '../slices/authSlice';
// import { sendOtp } from "../services/authAPI";

// import {useNavigate} from 'react-router-dom'
// import { AiOutlineEyeInvisible,AiOutlineEye } from "react-icons/ai";
// export default function Signup() {
//     const[formdata,setformdata]=useState({firstname:"",lastname:"",email:"",password:"",confirmpassword:"",accountType:""});
//     // const signupData = useSelector((state) => state.auth.signupData);
//    console.log("this is form data",formdata);
//  const navigate=useNavigate();
//  const dispatch=useDispatch();
//     const[showpassword,setshowpassword]=useState(false);
//  const[showconfirmpassword,setshowconfirmpassword]=useState();
//      function changehandler(event){
//         const {name,value}=event.target
//         setformdata((prev)=>({
//             ...prev,
//             [name]:value

//         }))

//     }
//       function submithandler(event){
//       event.preventDefault();
//  dispatch(setSignupData(formdata));


//   // call backend to send otp
//   dispatch(sendOtp(formdata.email, navigate));
//       toast.success("otp sent successfully");
//     navigate("/verify-email");
//   }
//   return (
//     <div className="flex flex-row w-full mx-auto h-[100vh] bg-black">
      

//       <div className="flex flex-col w-[50%] justify-center items-center text-white">
//         <h1>
//             Join the millions learning to code with StudyNotion for free
//         </h1>

//         <p>Build skills for today, tomorrow, and beyond.
//             <HighlightText text={" Education to future-proof your career."}/>

//         </p>
// {/* 
//         /buttons
// <div className="flex text-white gap-[10px]  " >
//  <button type="button" onClick={()=>setformdata((prev)=>({...prev,accountType:"Student"}))} className={`rounded-md w-[100px] px-3 py-2 ${formdata.accountType=="Student"?"bg-yellow-500 text-black":"bg-gray-600 text-white"}`}>
// Student
//  </button>
//   <button type="button" onClick={()=>setformdata((prev)=>({...prev,accountType:"Instructor"}))} className={`rounded-md w-[100px] px-3 py-3 ${formdata.accountType=="Instructor"?"bg-yellow-500 text-black":"bg-grau-600 text-white"}`}>
// Instructor
//   </button>
// </div> */}

// <form onSubmit={submithandler}>

//     <div className="flex text-white gap-[10px]">
//   <button
//     type="button"
//     onClick={() => setformdata((prev) => ({ ...prev, accountType: "Student" }))}
//     className={`rounded-md w-[100px] px-3 py-2 ${
//       formdata.accountType === "Student" ? "bg-yellow text-black" : "bg-gray-600 text-white"
//     }`}
//   >
//     Student
//   </button>

//   <button
//     type="button"
//     onClick={() => setformdata((prev) => ({ ...prev, accountType: "Instructor" }))}
//     className={`rounded-md w-[100px] px-3 py-2 ${
//       formdata.accountType === "Instructor" ? "bg-yellow text-black" : "bg-gray-600 text-white"
//     }`}
//   >
//     Instructor
//   </button>
// </div>

//  <div className="flex gap-[9px] " >
//        <label>
//         <h1>First Name<sup>*</sup></h1>
//         <input type="text" placeholder='Enter the FirstName '  name="firstname" value={formdata.firstname} onChange={changehandler} className="text-black"/>
//     </label>
//         <label>
//         <h1>Last Name<sup>*</sup></h1>
//         <input type="text"  placeholder='Enter the LastName' name="lastname" value={formdata.lastname} onChange={changehandler} className="text-black"/>
//     </label>
//  </div>

//    <label >
//         <h1>Email<sup>*</sup></h1>
//         <input type="Email"  name="email" value={formdata.email} onChange={changehandler} className="w-[400px] text-black"/>
//     </label>


// <div className="flex gap-[9px] ">
//   <label>
//         <h1>password<sup>*</sup></h1>
//         <input type={showpassword?("text"):("password")}  name="password" value={formdata.password} onChange={changehandler} className="text-black"/>
//         <span onClick={()=>setshowpassword((prev)=>!prev)}>
//                            {
//                                showpassword?(<AiOutlineEyeInvisible />): (<AiOutlineEye />)
//                            }
//                           </span>
//     </label>

//        <label>
//         <h1>confirmPassword<sup>*</sup></h1>
//         <input type={showconfirmpassword?("text"):("password")}  name="confirmpassword" value={formdata.confirmpassword} onChange={changehandler} className="text-black"/>
//      <span onClick={()=>setshowconfirmpassword((prev)=>!prev)}>
//                             {
//                                 showconfirmpassword?(<AiOutlineEyeInvisible />): (<AiOutlineEye />)
//                             }
//                            </span>
//     </label>
// </div>
 

// <button type="submit" className="text-white">
//     Create Account
// </button>

// </form>


//       </div>

//       <div className=" w-[40%]flex justify-center items-center">
// <img src={signup} alt=" sign up page image"/>
//       </div>
//     </div>
//   )
// }



import React, { useState } from "react";
import signupImg from "../assets/signup.webp";
import HighlightText from "../components/core/HomePage/HighlightText";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setSignupData } from "../slices/authSlice";
import { sendOtp } from "../services/authAPI";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Signup() {
  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    accountType: "Student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  }

  function submitHandler(e) {
    e.preventDefault();
    dispatch(setSignupData(formdata));
    dispatch(sendOtp(formdata.email, navigate));
    toast.success("OTP sent successfully");
    navigate("/verify-email");
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-10 items-center">

        {/* LEFT SIGNUP CARD */}
        <div className="w-full lg:w-1/2 bg-[#111827] rounded-xl p-8 sm:p-10 shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-semibold text-white">
            Join the millions learning to code with StudyNotion
          </h1>

          <p className="mt-2 text-gray-400 text-sm sm:text-base">
            Build skills for today, tomorrow, and beyond
            <br />
            <HighlightText text=" Education to future-proof your career." />
          </p>

          {/* ACCOUNT TYPE */}
          <div className="flex gap-3 mt-6">
            {["Student", "Instructor"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  setFormdata((prev) => ({ ...prev, accountType: type }))
                }
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  formdata.accountType === type
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-700 text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* FORM */}
          <form onSubmit={submitHandler} className="mt-6 space-y-4">

            {/* NAME */}
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formdata.firstname}
                onChange={changeHandler}
                className="w-full rounded-md bg-[#020617] border border-gray-700 px-3 py-2 text-white outline-none"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formdata.lastname}
                onChange={changeHandler}
                className="w-full rounded-md bg-[#020617] border border-gray-700 px-3 py-2 text-white outline-none"
              />
            </div>

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formdata.email}
              onChange={changeHandler}
              className="w-full rounded-md bg-[#020617] border border-gray-700 px-3 py-2 text-white outline-none"
            />

            {/* PASSWORDS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formdata.password}
                  onChange={changeHandler}
                  className="w-full rounded-md bg-[#020617] border border-gray-700 px-3 py-2 text-white outline-none"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              <div className="relative w-full">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  value={formdata.confirmpassword}
                  onChange={changeHandler}
                  className="w-full rounded-md bg-[#020617] border border-gray-700 px-3 py-2 text-white outline-none"
                />
                <span
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full mt-4 rounded-md bg-yellow-400 py-2.5 font-semibold text-black hover:bg-yellow-300 transition"
            >
              Create Account
            </button>
          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:flex w-1/2 justify-center">
          <img
            src={signupImg}
            alt="Signup"
            className="rounded-xl max-w-md"
          />
        </div>
      </div>
    </div>
  );
}
