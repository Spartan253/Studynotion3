import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react'
import { createSubsection, updatesubsection } from '../../../services/courseDetailAPI';
import { setcourse } from '../../../slices/courseSlice'
import { RxCross2 } from "react-icons/rx";
import IconBtn from '../../Comman/IconBtn'
import { toast } from 'react-hot-toast'
import Upload from './Upload'

import { useForm } from 'react-hook-form'

const SubSectionModel = ({
    modalData, setModalData, add = false, view = false, edit = false }) => {
    const { register, handleSubmit, setValue,
        formState: { errors }, getValues
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);


    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);

            setValue("lectureVideo", modalData.videofile);
        }
    }, [])

    const isFormUpdated = () => {
        const currentValue = getValues();

        if (currentValue.lectureTitle !== modalData.title ||
            currentValue.lectureDesc !== modalData.description ||
            currentValue.lectureVideo !== modalData.videofile
        ) {
            return true;
        }
        else {
            return false;
        }
    }
    const handleEditSubSection = async () => {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle)
        }

        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc)
        }
        if (currentValues.lectureVideo !== modalData.videofile) {
            formData.append("videofile", currentValues.lectureVideo)
        }
        if (!isFormUpdated()) {
            toast.error("No changes made to the form");
            return;
        }
        setLoading(true);
        const result = await updatesubsection(formData, token);
        if (result) {

            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData.sectionId ? result : section
            );

            const updatedCourse = {
                ...course, courseContent: updatedCourseContent
            }
            dispatch(setcourse(updatedCourse));

        }
        setModalData(null);
        setLoading(false);
    }
    const onSubmit = async (data) => {
        if (view)
            return;
        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made to the form ")
            }
            else {
                //
                handleEditSubSection();
            }
            return;
        }
        const formdata = new FormData();
        formdata.append("sectionId", modalData.sectionId);

        formdata.append("title", data.lectureTitle);
        formdata.append("description", data.lectureDesc);
        // Ensure we append an actual File object for the video
        let videoFile = getValues("lectureVideo");
        // If the stored value is a URL string (from viewing), try to skip file append
        if (videoFile && typeof videoFile === 'object' && (videoFile instanceof File || videoFile.name)) {
            formdata.append("videofile", videoFile);
        } else {
            // try to read from the file input DOM as a fallback
            const inputEl = document.getElementById("lectureVideo");
            if (inputEl && inputEl.files && inputEl.files[0]) {
                formdata.append("videofile", inputEl.files[0]);
                videoFile = inputEl.files[0];
            } else {
                console.warn("No video file found to upload. videoFile:", videoFile);
            }
        }
        formdata.append("courseId", course._id);


        console.log("FormData entries:", [...formdata.entries()]);

        setLoading(true);
        // Api Call wrapped in try/catch to handle server errors
        try {
            const result = await createSubsection(formdata, token);
            if (result) {
                console.log("✅ Updated course received from backend:", result);
                dispatch(setcourse(result)); // result = updated course object
                setModalData(null);
                toast.success("Lecture added successfully 🎉");
            }
        } catch (err) {
            console.error('createSubsection failed:', err);
            // Log detailed axios response if available
            if (err?.response) {
                console.error('Server response status:', err.response.status);
                console.error('Server response data:', err.response.data);
            }
            const serverMsg = err?.response?.data?.message || err?.message || 'Failed to upload subsection';
            toast.error(serverMsg);
        } finally {
            setModalData(null);
            setLoading(false);
        }
    }

    return (
        <div className="">
            <div>
                <div>
                    <p className='text-black'>
                        {view && "viewing"} {add && "Adding"} {edit && "Editing"} Lecture </p>
                    <button onClick={() => (!loading ? setModalData(null) : {})}>
                        <RxCross2 />
                    </button>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* ✅ Upload field now works for video */}
                        <Upload
                            name="lectureVideo"
                            label="Lecture Video"
                            setValue={setValue}
                            error={errors}
                            accept="video/*"
                            {...register("lectureVideo", { required: true })}
                        />

                        <div>
                            <label>Lecture Title</label>
                            <input
                                id="lectureTitle"
                                placeholder="enter Lecture "
                                {...register("lectureTitle", { required: true })}
                                className="w-full bg-gray-800 text-black " />
                            {
                                errors.lectureTitle && (
                                    <span className="text-black">
                                        Lecture  title is required
                                    </span>
                                )
                            }
                        </div>
                        <div>
                            <label>
                                Lecture Description  </label>
                            <textarea id="lectureDesc" placeholder="enter Lecture Desciption" {
                                ...register("lectureDesc", { required: true })} className='w-full min-h-[130px] text-black bg-gray-800' />
                            {
                                errors.lectureDesc && (
                                    <span>
                                        Lecture Description is required

                                    </span>
                                )
                            }


                        </div>
                        {
                            !view && (
                                <div>
                                    {/* <IconBtn text={loading ? "loading" : edit ? "save changes" : "save"} type="submit"  /> */}
                                    <button className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 disabled:cursor-not-allowed disabled:bg-gray-500 flex items-center gap-2" type="submit" disabled={loading}>
                                        {loading ? "loading" : edit ? "save changes" : "save"}
                                    </button>

                                </div>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SubSectionModel