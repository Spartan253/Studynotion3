// import  react from 'react'
// import { useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import { useSelector,useDispatch } from 'react-redux';
// import { buyCourse } from '../services/StudentfeaturesAPI';
// export default function CourseDetails(){


//     const {user}=useSelector((state)=>state.profile);
//     const {token}=useSelector((state)=>state.auth);
//       const dispatch=useDispatch();
//     const navigate=useNavigate();
//     const courseId=useParams();
     

//     const handleBuyCourse=()=>{
//         //logic to buy course
//         console.log("Buy course clicked");
//         if(token){
//             //redirect to payment gateway
//            buyCourse(token, user, courses, navigate, dispatch);
//            return;
           

//         }
//     }
// return(
//     <div>
//     <h1>Course Details Page</h1>
//     <button className="bg-yellow-500 p-2 rounded-md text-black"  onClick={()=>handleBuyCourse()}>
//         Buy Course
//     </button>
//     </div>
// )


// }


import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { buyCourse } from '../services/StudentfeaturesAPI';

export default function CourseDetails() {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const handleBuyCourse = () => {
    if (!token) {
      navigate("/login");
      return;
    }

    buyCourse(
      token,
      user,
      [courseId],   // ✅ defined here
      navigate,
      dispatch
    );
  };

  return (
    <div>
      <h1>Course Details Page</h1>
      <button
        className="bg-yellow-500 p-2 rounded-md text-black"
        onClick={handleBuyCourse}
      >
        Buy Course
      </button>
    </div>
  );
}
