// register,
// handleSubmit,
// watch,
// setValue,
// getValues,
// reset,
// trigger,
// setError,
// clearErrors,
// formState

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { GrAddCircle } from "react-icons/gr";
import { BiRightArrow } from "react-icons/bi";
import { toast } from "react-hot-toast";

import IconBtn from "../../Comman/IconBtn";
import NestedView from "./NestedView";
import { setStep, setcourse, setEditCourse } from "../../../slices/courseSlice";
import { createSection, updateSection } from "../../../services/courseDetailAPI";

export default function CourseBuilder() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    if (result) {
      dispatch(setcourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (!course?.courseContent?.length) {
      toast.error("Please add at least one section");
      return;
    }

    const emptySection = course.courseContent.find(
      (section) => !section.subSection || section.subSection.length === 0
    );

    if (emptySection) {
      toast.error(`Add at least one lecture to "${emptySection.sectionName}"`);
      return;
    }

    dispatch(setStep(3));
  };

  const handleChnagedEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-gray-900 text-white rounded-xl p-4 sm:p-6 space-y-6">
      
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400">
        Course Builder
      </h2>

      {/* ================= FORM ================= */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Section Name <sup className="text-red-400">*</sup>
          </label>

          <input
            id="sectionName"
            placeholder="Add section name"
            {...register("sectionName", { required: true })}
            className="w-full rounded-lg bg-gray-800 px-4 py-2
                       border border-gray-700 focus:ring-2
                       focus:ring-yellow-400 outline-none"
          />

          {errors.sectionName && (
            <p className="text-xs text-red-400 mt-1">
              Section name is required
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <IconBtn
            type="submit"
            text={editSectionName ? "Update Section" : "Create Section"}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg"
          >
            <GrAddCircle />
          </IconBtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-gray-300 underline hover:text-white"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      {/* ================= SECTIONS ================= */}
      {course?.courseContent?.length > 0 && (
        <NestedView
          handleChnagedEditSectionName={handleChnagedEditSectionName}
        />
      )}

      {/* ================= NAVIGATION ================= */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
        <button
          onClick={goBack}
          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
        >
          Back
        </button>

        <button
          onClick={goToNext}
          className="flex items-center justify-center gap-2
                     px-4 py-2 rounded-lg
                     bg-yellow-400 text-black hover:bg-yellow-300"
        >
          Next <BiRightArrow />
        </button>
      </div>
    </div>
  );
}
