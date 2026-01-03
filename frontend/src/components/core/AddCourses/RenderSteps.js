// import React from 'react'
// import {useSelector} from 'react-redux'
// import CourseInformation from './CourseInformation'
// import CourseBuilder from  './CourseBuilder'
// import CoursePublished from './CoursePublished'
// import { FaCheck } from "react-icons/fa";
//  export default function RenderSteps(){
//     const{step}=useSelector((state)=>state.course)
//     const steps=[
//         {
//             id:1,
//             title:"course Information"
//         },
//            {
//             id:2,
//             title:"course Builder"
//         },
//               {
//             id:3,
//             title:"Publish"
//         }

//     ]
//     return (
//          <div className="text-white bg-black ">
//         <div>
// {
//     steps.map((item)=>(

//         <div className={`${step===item.id?"bg-black border-yellow-500":"border-gray-700 bg-black  text-white"}`}>
// {
//     step>item.id?(<FaCheck/>):(item.id)
// }

//             </div>
//     ))
// }
//         </div>

// {/* // add dasheses between code */}
       
//        <div>
//         {
//             steps.map((item,index)=>(
//                 <>
//                 <div className='text-black' key={index}>
//                     <p>{item.title}</p>
//                 </div>
                
//                 </>
//             ))
//         }
//        </div>


//         {
//         step===1  && <CourseInformation/>
//        }
//        {
//         step===2 && <CourseBuilder/>
//        }
//        {
//         step===3 && <CoursePublished/>
//        }
//         </div>
//     )
// }

// import React from "react";
// import { useSelector } from "react-redux";
// import { FaCheck } from "react-icons/fa";

// import CourseInformation from "./CourseInformation";
// import CourseBuilder from "./CourseBuilder";
// import CoursePublished from "./CoursePublished";

// export default function RenderSteps() {
//   const { step } = useSelector((state) => state.course);

//   const steps = [
//     { id: 1, title: "Course Information" },
//     { id: 2, title: "Course Builder" },
//     { id: 3, title: "Publish" },
//   ];

//   return (
//     <div className="w-full bg-black text-white px-4 sm:px-8 py-6 space-y-10">
      
//       {/* ================= STEPPER ================= */}
//       <div className="flex items-center w-[1080px]  justify-center mx-auto">
//         {steps.map((item, index) => (
//           <React.Fragment key={item.id}>
            
//             {/* STEP */}
//             <div className="flex items-center gap-2 min-w-fit">
//               <div
//                 className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium
//                   ${
//                     step > item.id
//                       ? "bg-yellow-400 border-yellow-400 text-black"
//                       : step === item.id
//                       ? "border-yellow-400 text-yellow-400"
//                       : "border-gray-600 text-gray-400"
//                   }`}
//               >
//                 {step > item.id ? <FaCheck /> : item.id}
//               </div>

//               {/* STEP TITLE */}
//               <p
//                 className={`text-sm hidden sm:block
//                   ${
//                     step === item.id
//                       ? "text-yellow-400"
//                       : "text-gray-400"
//                   }`}
//               >
//                 {item.title}
//               </p>
//             </div>

//             {/* CONNECTING LINE */}
//             {index !== steps.length - 1 && (
//               <div className="flex-1 mx-4 border-t border-dashed border-gray-600"></div>
//             )}
//           </React.Fragment>
//         ))}
//       </div>

//       {/* ================= STEP CONTENT ================= */}
//       <div className="w-full">
//         {step === 1 && <CourseInformation />}
//         {step === 2 && <CourseBuilder />}
//         {step === 3 && <CoursePublished />}
//       </div>
//     </div>
//   );
// }


import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";

import CourseInformation from "./CourseInformation";
import CourseBuilder from "./CourseBuilder";
import CoursePublished from "./CoursePublished";

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  return (
    <div className="w-full bg-black text-white px-4 sm:px-8 py-6 space-y-10 overflow-x-hidden">

      {/* ================= STEPPER ================= */}
      <div className="w-full overflow-x-auto">
        <div className="
          flex items-center justify-between
          min-w-[600px] sm:min-w-full
          mx-auto
        ">
          {steps.map((item, index) => (
            <React.Fragment key={item.id}>

              {/* STEP */}
              <div className="flex items-center gap-2 min-w-fit">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium
                    ${
                      step > item.id
                        ? "bg-yellow-400 border-yellow-400 text-black"
                        : step === item.id
                        ? "border-yellow-400 text-yellow-400"
                        : "border-gray-600 text-gray-400"
                    }`}
                >
                  {step > item.id ? <FaCheck /> : item.id}
                </div>

                {/* STEP TITLE (hidden on very small screens) */}
                <p
                  className={`text-sm hidden sm:block
                    ${
                      step === item.id
                        ? "text-yellow-400"
                        : "text-gray-400"
                    }`}
                >
                  {item.title}
                </p>
              </div>

              {/* CONNECTING LINE */}
              {index !== steps.length - 1 && (
                <div className="flex-1 mx-4 border-t border-dashed border-gray-600"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ================= STEP CONTENT ================= */}
      <div className="w-full">
        {step === 1 && <CourseInformation />}
        {step === 2 && <CourseBuilder />}
        {step === 3 && <CoursePublished />}
      </div>
    </div>
  );
}
