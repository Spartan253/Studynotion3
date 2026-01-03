import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import {useState} from 'react'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEditNote } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import {setcourse} from '../../../slices/courseSlice'
import SubSectionModel from './SubSectionModel'
import {deleteSection,deleteSubSection} from '../../../services/courseDetailAPI'
import ConfirmationModel from '../../Comman/ConfirmationModel'
export default function NestedView({handleChnagedEditSectionName,section,sectionName}) {

    const{course}=useSelector((state)=>state.course);
    const{token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
 // 🧩 Add logs here
  console.log("Course from Redux:", course);
  console.log("Course content array:", course?.courseContent);
    const[addSubSection,setAddSubSection]=useState(null);
     const[viewSubSection,setViewSubSection]=useState(null);
      const[editSubSection,setEditSubSection]=useState(null);
      const[confirmationModel,setConfirmationModel]=useState(null);

     const handleDeleteSection = async (sectionId) => {
  const result = await deleteSection({
    sectionId,
    courseId: course._id,
    token,
  });

  if (result) {
    // ✅ result is full updated course
    dispatch(setcourse(result));
  }

  setConfirmationModel(null);
};


        const handleDeleteSubSection=async(subSectionId, sectionId)=>{
        const result=await deleteSubSection({subSectionId, sectionId,token});
        if(result){
  const updatedCourseContent=course.courseContent.map((section)=>
     section._id===sectionId?result :section
  );

   const updatedCourse={
    ...course,
    courseContent:updatedCourseContent
   }
           dispatch(setcourse(updatedCourse));
        }
              setConfirmationModel(null);
      }

  return (
    <div>


      <div className="mt-10 rounded bg-gray-700">
        
        {
        course?.courseContent?.map((section)=>(
          <details key={section._id}  >
<summary className="flex items-center justify-between gap-x-3 border-b-2 ">
      <div className="flex items-center gap-x-3">
        <RxDropdownMenu/>
        <p>{section.sectionName}</p>
        
      </div>
      <div>
   
      <button onClick={() => handleChnagedEditSectionName(section._id, section.sectionName)}>
                  <MdEditNote />
                </button>
        <button onClick={()=>{setConfirmationModel(
        {
          text1:"Delete the section",
          text2:"All the lecture in the section",
          btn1Text:"Delete",
          btn2Text:"Cancel",
          btn1Handler:()=>handleDeleteSection(section._id),
          btn2Handler:()=>setConfirmationModel(null),

        }
        )}}>
          <MdDeleteOutline />
        </button>
      </div>

</summary>


<div>
  {
    section.subSection?.map((data)=>(
      <div key={data?._id}
      onClick={()=>setViewSubSection(data)}
      className="flex items-center justify-between gap-x-3 border-b-2 text-black">
        <div>
          <RxDropdownMenu />
        <p>{data.title}</p>
          </div>

          <div className='flex items-center'>
            <button onClick={()=>setEditSubSection({...data,sectionId:section._id})}>
               <MdEditNote  className="text-black "/>
            </button>
         <button onClick={()=>setConfirmationModel(
    {
          text1:"Delete the  sub section",
          text2:"selected lecture will be deleted ",
          btn1Text:"Delete",
          btn2Text:"Cancel",
          btn1Handler:()=>handleDeleteSubSection(data._id,section._id),
          btn2Handler:()=>setConfirmationModel(null),

        }
         )
    
        }>
          <MdDeleteOutline />
        </button>

        
            </div>
        </div>
        
    ))
  }
  <button onClick={()=>setAddSubSection({
      sectionId: section._id,   // ✅ Correct key name
      sectionName: section.sectionName,
    })}
  className="mt-4 flex items-center gap-x-2 text-yellow-500">
<FaPlus />
<p>Add Lecture </p>
  </button>
</div>
          </details>
        ))}
      </div>


    <>
  {addSubSection ? (
    <SubSectionModel
      modalData={addSubSection}
      setModalData={setAddSubSection}
      add={true}
    />
  ) : viewSubSection ? (
    <SubSectionModel
      modalData={viewSubSection}
      setModalData={setViewSubSection}
      view={true}
    />
  ) : editSubSection ? (
    <SubSectionModel
      modalData={editSubSection}
      setModalData={setEditSubSection}
      edit={true}
    />
  ) : (
    <div></div>
  )}

  {confirmationModel ? (
    <ConfirmationModel modalData={confirmationModel} />
  ) : (
    <div></div>
  )}
</>


    </div>
  )
}
