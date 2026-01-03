// import React from 'react'
// import IconBtn from './IconBtn'

// export default function ConfirmationModel({modelData}){
//     return(
//         <div>
//             <div>
//                 <p>{modelData.text1}</p>
//                 <p>{modelData.text2}</p>
//             </div>
//             <div>
//                 <IconBtn onclick={modelData?.btnHandler} text={modelData?.btnText}/>
//             <button onClick={modelData?.btnHandler}>
//                 {modelData?.btn1text}
//          {modelData?.btn2text}
//             </button>
//             </div>
//         </div>
//     )
// }


import React from "react";
import IconBtn from "./IconBtn";

export default function ConfirmationModel({ modalData }) {
  if (!modalData) return null; // ✅ prevents crash

  return (
    <div className="bg-black  w-[350px] h-[300px] flex flex-col justify-center items-center z-50">
      <div>
        <p>{modalData.text1}</p>
        <p>{modalData.text2}</p>
      </div>

      <div className=" flex gap-[10px]">
        <IconBtn
          onClick={modalData?.btn1Handler}
          text={modalData?.btn1Text} 
      
        />

        <button onClick={modalData?.btn2Handler} className="hover:bg-yellow-500 hover:text-black">
          {modalData?.btn2Text}
          
        </button>
      </div>
    </div>
  );
}
