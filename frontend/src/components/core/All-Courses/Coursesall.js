
// import react from "react";
// import {useState,useEffect} from "react";
// import { getAllCourses } from "../../../services/courseDetailAPI";
// import { useSelector,useDispatch } from "react-redux";
// import { setCourse } from "../../../slices/courseSlice";
// export default function Coursesall(){


//     const dispatch=useDispatch();
//     const {token}=useSelector((state)=>state.auth);
//     const courses=useSelector((state)=>state.course);    
// useEffect(()=>{

// const fetchallcourses=async()=>{
//     const courses=await getAllCourses(token);

//     setCourse(courses);
//     console.log("all courses",courses);

// }
// fetchallcourses();
// },[token])

//     return(
//         <div>
//             <h1>All Courses Page</h1>
//              {
//                 courses.length===0?(
//                     <p>No courses available</p>
//                 ):(
//                     <div>
//                         {
//               courses.map((course,index)=>(
//                         <div key={index}>
//                             <img src={course.thumbnail}/>
//                             <p>{course.courseName}</p>
//                             <p>{course.courseDescription}</p>
//                             <p>Rs {course.price}</p>
//                         </div>
//                     ))
//                         }
                



//                         </div>
//                 )
//              }

//         </div>
//     )
// }


// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getAllCourses } from "../../../services/courseDetailAPI";
// import { buyCourse } from "../../../services/StudentfeaturesAPI";

// export default function Coursesall() {
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);

//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       const data = await getAllCourses(token);
//       setCourses(Array.isArray(data) ? data : []);
//     };
//     fetchCourses();
//   }, [token]);

//   const handleBuyNow = (courseId) => {
//     if (!token) {
//       alert("Please login to buy course");
//       return;
//     }

//     buyCourse(token, user, [courseId], null, dispatch);
//   };

//   return (
//     <div className="w-full min-h-screen bg-black px-4 sm:px-8 py-6 text-white">
      
//       {/* Title */}
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400">
//         All Courses
//       </h1>

//       {/* Empty State */}
//       {courses.length === 0 ? (
//         <p className="text-gray-400">No courses available</p>
//       ) : (
//         <div className="flex flex-col gap-4">
//           {courses.map((course, index) => (
//             <div
//               key={course._id}
//               className="flex flex-col sm:flex-row items-start sm:items-center gap-4
//                          bg-gray-900/70 border border-gray-800 rounded-xl p-4
//                          hover:bg-gray-800 transition"
//             >
//               {/* Index */}
//               <span className="hidden sm:block text-gray-500 font-semibold">
//                 {index + 1}
//               </span>

//               {/* Thumbnail */}
//               <img
//                 src={course.thumbnail || "/placeholder.png"}
//                 alt={course.courseName}
//                 className="w-full sm:w-40 h-40 sm:h-24 rounded-lg object-cover"
//               />

//               {/* Course Info */}
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold">
//                   {course.courseName}
//                 </h3>

//                 <p className="text-sm text-gray-400 line-clamp-2 mt-1">
//                   {course.courseDescription}
//                 </p>

//                 <p className="text-yellow-400 font-bold mt-2">
//                   ₹ {course.price}
//                 </p>
//               </div>

//               {/* Buy Button */}
//               <button
//                 onClick={() => handleBuyNow(course._id)}
//                 className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300
//                            text-black font-semibold px-5 py-2 rounded-lg
//                            transition"
//               >
//                 Buy Now
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCourses } from "../../../services/courseDetailAPI";
import { buyCourse } from "../../../services/StudentfeaturesAPI";
import { addToCart } from "../../../slices/cartSlice";

export default function Coursesall() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getAllCourses(token);
      setCourses(Array.isArray(data) ? data : []);
    };
    fetchCourses();
  }, [token]);

  const handleBuyNow = (courseId) => {
    if (!token) {
      alert("Please login to buy course");
      return;
    }
    buyCourse(token, user, [courseId], null, dispatch);
  };

  const handleAddToCart = (course) => {
    if (!token) {
      alert("Please login to add course to cart");
      return;
    }

    const alreadyInCart = cart.find((item) => item._id === course._id);
    if (alreadyInCart) {
      alert("Course already in cart");
      return;
    }

    dispatch(addToCart(course));
  };

  return (
    <div className="w-full min-h-screen bg-black px-4 sm:px-8 py-6 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400">
        All Courses
      </h1>

      {courses.length === 0 ? (
        <p className="text-gray-400">No courses available</p>
      ) : (
        <div className="flex flex-col gap-4">
          {courses.map((course, index) => (
            <div
              key={course._id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4
                         bg-gray-900/70 border border-gray-800 rounded-xl p-4
                         hover:bg-gray-800 transition"
            >
              <span className="hidden sm:block text-gray-500 font-semibold">
                {index + 1}
              </span>

              <img
                src={course.thumbnail || "/placeholder.png"}
                alt={course.courseName}
                className="w-full sm:w-40 h-40 sm:h-24 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {course.courseName}
                </h3>
                <p className="text-sm text-white mt-1">
                  {course.courseDescription || "No description available"}
                </p>
                <p className="text-yellow-400 font-bold mt-2">
                  ₹ {course.price}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleAddToCart(course)}
                  className="bg-blue-500 hover:bg-blue-400 text-white
                             font-semibold px-5 py-2 rounded-lg transition"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => handleBuyNow(course._id)}
                  className="bg-yellow-400 hover:bg-yellow-300 text-black
                             font-semibold px-5 py-2 rounded-lg transition"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
