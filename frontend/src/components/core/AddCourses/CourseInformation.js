import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { MdCurrencyRupee } from "react-icons/md";
import { fetchCourseCategories, editCourseDetails, addCourseDetails } from "../../../services/courseDetailAPI";
import RequirementField from "./RequirementField";
import ChipInput from "./ChipInput";
import Upload from "./Upload";
import { toast } from "react-hot-toast";
import IconBtn from "../../Comman/IconBtn";
import { setStep, setcourse, setEditCourse } from "../../../slices/courseSlice";

const CourseInformation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories(token);
      if (categories?.length) setCourseCategories(categories);
      setLoading(false);
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatyouwilllearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirement", course.instructions);
    }

    getCategories();
  }, [editCourse, course, setValue, token]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatyouwilllearn", data.courseBenefits);
    formData.append("category", data.courseCategory);
    formData.append("instruction", JSON.stringify(data.courseRequirement));
    if (data.thumbnail) formData.append("thumbnailImage", data.thumbnail);

    setLoading(true);
    const result = editCourse
      ? await editCourseDetails(formData, token)
      : await addCourseDetails(token, formData);

    if (result) {
      dispatch(setStep(2));
      dispatch(setcourse(result));
      dispatch(setEditCourse(true));
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl mx-auto bg-gray-900 text-white
                 border border-gray-700 rounded-xl p-4 sm:p-6 space-y-6"
    >
      {/* COURSE TITLE */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Course Title <sup className="text-red-400">*</sup>
        </label>
        <input
          {...register("courseTitle", { required: true })}
          placeholder="Enter course title"
          className="w-full rounded-lg bg-gray-800 px-4 py-2
                     focus:ring-2 focus:ring-yellow-400 outline-none"
        />
        {errors.courseTitle && (
          <p className="text-red-400 text-xs mt-1">Title is required</p>
        )}
      </div>

      {/* SHORT DESCRIPTION */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Short Description <sup className="text-red-400">*</sup>
        </label>
        <textarea
          {...register("courseShortDesc", { required: true })}
          className="w-full min-h-[120px] rounded-lg bg-gray-800 px-4 py-2"
        />
        {errors.courseShortDesc && (
          <p className="text-red-400 text-xs mt-1">Description is required</p>
        )}
      </div>

      {/* PRICE */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Price <sup className="text-red-400">*</sup>
        </label>
        <div className="relative">
          <MdCurrencyRupee className="absolute left-3 top-3 text-gray-400" />
          <input
            type="number"
            {...register("coursePrice", { required: true })}
            className="w-full pl-9 rounded-lg bg-gray-800 px-4 py-2"
          />
        </div>
      </div>

      {/* CATEGORY */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Category <sup className="text-red-400">*</sup>
        </label>
        <select
          {...register("courseCategory", { required: true })}
          className="w-full rounded-lg bg-gray-800 px-4 py-2"
        >
          <option value="">Choose category</option>
          {courseCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* TAGS */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Press Enter to add tags"
        register={register}
        errors={errors}
        setValue={setValue}
        getValue={getValues}
      />

      {/* THUMBNAIL */}
      <Upload
        name="thumbnail"
        label="Thumbnail Image"
        setValue={setValue}
        register={register}
        error={errors}
        accept="image/*"
      />

      {/* BENEFITS */}
      <div>
        <label className="block text-sm text-gray-300 mb-1">
          Benefits <sup className="text-red-400">*</sup>
        </label>
        <textarea
          {...register("courseBenefits", { required: true })}
          className="w-full min-h-[120px] rounded-lg bg-gray-800 px-4 py-2"
        />
      </div>

      {/* REQUIREMENTS */}
      <RequirementField
        name="courseRequirement"
        label="Requirements / Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValue={getValues}
      />

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        {editCourse && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
          >
            Continue without saving
          </button>
        )}

        <IconBtn
          text={editCourse ? "Save Changes" : "Next"}
          onClick={handleSubmit(onSubmit)}
          className="bg-yellow-400 text-black px-6 py-2 rounded-lg"
        />
      </div>
    </form>
  );
};

export default CourseInformation;
