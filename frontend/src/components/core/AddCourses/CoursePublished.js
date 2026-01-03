// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useSelector, useDispatch } from "react-redux";
// import { resetCourseState, setStep } from "../../../slices/courseSlice";
// import { editCourseDetails } from "../../../services/courseDetailAPI";

// const COURSE_STATUS = {
//   DRAFT: "Draft",
//   PUBLISHED: "Published",
// };

// export default function CoursePublished() {
//   const { register, handleSubmit, getValues } = useForm();
//   const { course } = useSelector((state) => state.course);
//   const dispatch = useDispatch();
//   const { token } = useSelector((state) => state.auth);

//   const [loading, setLoading] = useState(false);

//   const goBack = () => {
//     dispatch(setStep(2));
//   };

//   const goToCourse = () => {
//     dispatch(resetCourseState());
//     // navigate("/dashboard/my-courses");
//   };

//   const handleCoursePublish = async () => {
//     const isPublic = getValues("public");

//     if (
//       (course?.status === COURSE_STATUS.PUBLISHED && isPublic) ||
//       (course?.status === COURSE_STATUS.DRAFT && !isPublic)
//     ) {
//       goToCourse();
//       return;
//     }

//     const formData = new FormData();
//     formData.append("courseId", course._id);
//     formData.append(
//       "status",
//       isPublic ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
//     );

//     try {
//       setLoading(true);
//       const result = await editCourseDetails(token, formData);
//       if (result) {
//         goToCourse();
//       }
//     } catch (error) {
//       console.error("Publish error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-black w-full p-4">
//       <p className="text-white text-lg mb-4">Publish Course</p>

//       <form
//         onSubmit={handleSubmit(handleCoursePublish)}
//         className="flex flex-col gap-y-4"
//       >
//         <label htmlFor="public" className="text-white flex items-center">
//           <input
//             type="checkbox"
//             id="public"
//             {...register("public")}
//             className="rounded h-4 w-4"
//           />
//           <span className="ml-3">Make This Course Public</span>
//         </label>

//         <div className="flex gap-x-3">
//           <button
//             type="button"
//             onClick={goBack}
//             disabled={loading}
//             className="px-4 py-2 bg-gray-600 text-black rounded-md"
//           >
//             Back
//           </button>

//           <button
//             type="submit"
//             disabled={loading}
//             className="px-4 py-2 bg-yellow-400 text-black rounded-md"
//           >
//             {loading ? "Loading..." : "Save Changes"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }



import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { resetCourseState, setStep } from "../../../slices/courseSlice";
import { editCourseDetails } from "../../../services/courseDetailAPI";

const COURSE_STATUS = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
};

export default function CoursePublished() {
  const { register, handleSubmit, getValues } = useForm();
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourse = () => {
    dispatch(resetCourseState());
    // navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    const isPublic = getValues("public");

    if (
      (course?.status === COURSE_STATUS.PUBLISHED && isPublic) ||
      (course?.status === COURSE_STATUS.DRAFT && !isPublic)
    ) {
      goToCourse();
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);
    formData.append(
      "status",
      isPublic ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    );

    try {
      setLoading(true);
      const result = await editCourseDetails(token, formData);
      if (result) {
        goToCourse();
      }
    } catch (error) {
      console.error("Publish error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black w-full p-4 sm:p-6 max-w-3xl mx-auto overflow-x-hidden">
      <p className="text-white text-lg sm:text-xl mb-4">
        Publish Course
      </p>

      <form
        onSubmit={handleSubmit(handleCoursePublish)}
        className="flex flex-col gap-y-4"
      >
        {/* Checkbox */}
        <label
          htmlFor="public"
          className="text-white flex items-center gap-3"
        >
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="rounded h-4 w-4"
          />
          <span>Make This Course Public</span>
        </label>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={goBack}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2
                       bg-gray-600 text-black rounded-md"
          >
            Back
          </button>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2
                       bg-yellow-400 text-black rounded-md"
          >
            {loading ? "Loading..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
