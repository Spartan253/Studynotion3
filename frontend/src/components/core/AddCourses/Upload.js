// import React from 'react'

// export default function Upload({label,name,placeholder,register,error,setValue,getValues}){
//     function handlechange(e){
// const file=e.target.files[0]; 
// if(file){
//   console.log("Selected file:", file); 
//      setValue(name,file, { shouldValidate: true });
// }

//     }
//     return (
//         <div>
//           <label>
//            {label} <sup>*</sup>
//           </label>
//             <div>
//                 <input type="file" name="videofile"   id={name}  accept="video/*"  placeholder={placeholder}   onChange={handlechange}   className="text-black bg-gray-800"/>
//             </div>
//          {
//             error?.[name] &&(
//                 <span>"Enter the correct thumbnail image"</span>
//             )
//          }
//         </div>

//     )
// // }

// import React, { forwardRef } from "react";

// const Upload = forwardRef(({ label, name, placeholder, error, setValue, accept, ...props }, ref) => {
//   function handleChange(e) {
//     const file = e.target.files[0];
//     if (file) {
//       console.log(`Selected file for ${name}:`, file);
//       setValue(name, file, { shouldValidate: true });
//     }
//   }

//   return (
//     <div>
//       <label className="text-black font-semibold">
//         {label} <sup>*</sup>
//       </label>
//       <div>
//         <input
//           type="file"
//           name={name}
//           id={name}
//           accept={accept || "image/*"|| "video/*"}   // ✅ dynamic accept type
//           placeholder={placeholder}
//           onChange={handleChange}
//           ref={ref}
//           className="text-black bg-gray-800"
//           {...props}
//         />
//       </div>
//       {error?.[name] && (
//         <span className="text-red-500 text-sm">File is required</span>
//       )}
//     </div>
//   );
// });

// export default Upload;

import React, { useEffect, useState } from "react";

const Upload = ({
  label,
  name,
  error,
  setValue,
  accept = "image/*,video/*",
}) => {
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState(null); // image | video

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // store file in react-hook-form
    setValue(name, file, { shouldValidate: true });

    // detect type
    if (file.type.startsWith("image")) {
      setFileType("image");
    } else if (file.type.startsWith("video")) {
      setFileType("video");
    } else {
      setFileType(null);
    }

    // preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
  };

  // cleanup
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="space-y-2">
      {/* LABEL */}
      <label className="block text-sm font-semibold text-gray-300">
        {label} <sup className="text-red-400">*</sup>
      </label>

      {/* PREVIEW */}
      {preview && (
        <div className="w-full max-w-sm">
          {fileType === "image" && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg border border-gray-700"
            />
          )}

          {fileType === "video" && (
            <video
              src={preview}
              controls
              className="w-full h-48 rounded-lg border border-gray-700"
            />
          )}
        </div>
      )}

      {/* FILE INPUT */}
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className="block w-full text-sm text-gray-400
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-lg file:border-0
                   file:text-sm file:font-semibold
                   file:bg-yellow-400 file:text-black
                   hover:file:bg-yellow-300
                   bg-gray-800 rounded-lg"
      />

      {/* ERROR */}
      {error?.[name] && (
        <p className="text-xs text-red-400">File is required</p>
      )}
    </div>
  );
};

export default Upload;
