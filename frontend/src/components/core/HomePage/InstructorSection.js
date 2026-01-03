import React from 'react'
import Instructor from '../../../assets/Instructor.png'
import HighlightText from './HighlightText'
import CTABUTTON from './CTABUTTON'
export default function InstructorSection() {
  return (
    <div className="mt-[10px]">
      <div className=" w-11/12 flex flex-row items-center justify-center mx-auto">
<div className="w-[50%]">
 <img src={Instructor} alt="Instructor" className="fit-contain shadow-white" />
</div>

<div className='w-[60%] flex flex-col gap-10 '>
<div className="text-4xl font-semibold  text-white ">
    Become an <br/>
    <HighlightText text={"Instructor"}/>
</div>
<p className="font-medium text-[16px] w-[80%] text-richblack-300 ">
    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
</p>

<div className="w-fit">
    <CTABUTTON active={true} linkto={"/signup"}>
Start Teaching Today
</CTABUTTON>
</div>
</div>
      </div>
    </div>
  )
}
