// import React from 'react'
// import { useSelector } from 'react-redux'
// import { RiStarSFill } from "react-icons/ri";
// import { RiStarSLine } from "react-icons/ri";
// import { MdDelete } from "react-icons/md";
// import { useDispatch } from "react-redux";
// import ReactStars from "react-rating-stars-component";
//  // or your ReactStars path

// export default function RenderCartCourses(){
//     const{cart,removeFromCart}=useSelector((state)=>state.cart);
//     const dispatch=useDispatch();
//     return(
//         <div>
//             {
//                 cart.map((course,index)=>(
//                     <div key={index}>
//                         <div>
//                             <img src={course?.thumbnail}/>
//                             <div>
//                                 <p>{course?.courseName}</p>
//                                   <p>{course?.category?.name}</p>
//                             <div>

//                                 <span>4.8</span>
//                                 <ReactStars
//                                 count={5}
//                                 size={20}
//                                 edit={false}
//                                 activeColor='#ffd700'
//                                 emptyIcon={<RiStarSLine />}
//                                 fullIcon={<RiStarSFill />}/>
//                                 <span>{course?.ratingAndReview?.length}Ratings</span>
//                                 </div>
//                             </div>
//                        </div>


//                        <div>
//                         <button onClick={()=>dispatch(removeFromCart(course._id))}>
//                      <MdDelete />
//                      <span>Remove</span>
//                         </button>
//                         <p>Rs {course?.price}</p>
                       
//                         </div>
//                         </div>
//                 ))
//             }
//         </div>
//     )
// }

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RiStarSFill, RiStarSLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../../slices/cartSlice";

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col gap-6">
      {cart.map((course) => (
        <div
          key={course._id}
          className="flex flex-col lg:flex-row gap-6 bg-gray-900 border border-gray-800
                     rounded-2xl p-5 hover:border-gray-700 transition"
        >
          {/* Thumbnail */}
          <img
            src={course?.thumbnail}
            alt={course?.courseName}
            className="w-full lg:w-48 h-40 object-cover rounded-xl"
          />

          {/* Course Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {course?.courseName}
              </h2>

              <p className="text-sm text-gray-400 mt-1">
                {course?.category?.name}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <span className="text-yellow-400 font-semibold">4.8</span>

                <div className="flex gap-1 text-yellow-400">
                  {[...Array(5)].map((_, i) =>
                    i < (course?.rating || 4) ? (
                      <RiStarSFill key={i} />
                    ) : (
                      <RiStarSLine key={i} />
                    )
                  )}
                </div>

                <span className="text-sm text-gray-400">
                  ({course?.ratingAndReview?.length || 0} Ratings)
                </span>
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6">
              <p className="text-xl font-bold text-yellow-400">
                ₹ {course?.price}
              </p>

              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center gap-2 text-red-400
                           hover:text-red-300 transition mt-3 sm:mt-0"
              >
                <MdDelete size={20} />
                <span className="font-medium">Remove</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

