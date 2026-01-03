import React from 'react'
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import HighlightText from '../components/core/HomePage/HighlightText'
import CTABUTTON from '../components/core/HomePage/CTABUTTON.js';
import Banner from '../assets/Banner.mp4'
import CodeBlock from '../components/core/HomePage/CodeBlocks.js'
import TimeLineSection from '../components/core/HomePage/TimeLineSection.js';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection.js';
import InstructorSection from '../components/core/HomePage/InstructorSection.js'
export default function Home() {
  return (
    <div className="bg-black">
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">  
      <Link to={"/signup"}>
      <div className="mx-auto rounded-full bg-gray-800 font-bold text transition-all duration-200 hover:scale-95 w-[250px]">
        <div className="flex flex-row mt-[50px]">
            <p className="pl-[10px]">Become An Instructor </p>
            <FaArrowRight className="pt-[7px] text-[23px]"/>

        </div>
  </div>
      </Link>

      <div className="text-white ">
            <h1 className="text-[25px]">Empower Your Future with
                <HighlightText text={"Coding Skills"}/>
            </h1>
            <p >With our online coding courses, you can learn at your own pace, from anywhere in the <br/> world, and get access to a wealth of resources, including hands-on projects, quizzes, and <br/> personalized feedback from instructors.</p>
        </div>

       <div>
            <CTABUTTON active={true} linkto={"/signup"}>
         Learn More
            </CTABUTTON>
                   <CTABUTTON active={false} linkto={"/login"}>
                Book Demo
            </CTABUTTON>
        </div>

        <div className="shadow-blue-200 w-[1080px]">
   <video 
   muted
   loop
   autoPlay>
<source src={Banner} type="video/mp4"/>
   </video>
        </div>

        {/* code section */}
<div>
  <CodeBlock 
  position={"lg:flex-row"}
  heading={
    <div className={`text-4xl font-semibold`}>
      Unlock your
      <HighlightText text={"coding potential"}/>
      with our online courses.
      </div>
  }
  subheading={
    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."

  }
  ctabtn1={
    {
      btnText:"try it yourself",
      linkto:"/signup",
      active:true,
    }
  }

   ctabtn2={
    {
      btnText:"Learn More",
      linkto:"/login",
      active:false,
    }
  }

codeblock={
`<!Doctype Html>\n
<html>
<head>
<title>welcome<title/>
</head>
<body>
<h1> welcome to study notion/>
</body>
</html>

`
}

  />
</div>

{/* Section-2 */}

<div>
  <CodeBlock 
  position={"lg:flex-row-reverse"}
  heading={
    <div className={`text-4xl font-semibold`}>
      Unlock your
      <HighlightText text={"coding potential"}/>
      with our online courses.
      </div>
  }
  subheading={
    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."

  }
  ctabtn1={
    {
      btnText:"try it yourself",
      linkto:"/signup",
      active:true,
    }
  }

   ctabtn2={
    {
      btnText:"Learn More",
      linkto:"/login",
      active:false,
    }
  }

codeblock={
`<!Doctype Html>\n
<html>
<head>
<title>welcome<title/>
</head>
<body>
<h1> welcome to study notion/>
</body>
</html>

`
}

  />
</div>


<div className="bg-white text-black ">
<div className="Homepage_bg h-[310px]" >
 <div className="w-11/12  flex flex-cols  justify-center items-center gap-5 mx-auto">
<div className="h-[250px]"></div>
<div className='flex flex-row gap-7 text-white '>
<CTABUTTON active={true} linkto={"/signup"}>
<div className="flex flex-row items-center gap-3  ">
  Explore Full Catalog
  <FaArrowRight/>
</div>
</CTABUTTON>

<CTABUTTON active={false} linkto={"/signup"}>
<div className="flex flex-row items-center gap-3  ">
Learn More
  <FaArrowRight/>
</div>
</CTABUTTON>
</div>
 </div>
</div>

<div className="mx-auto w-11/12 max-w-maxContent flex flex-cols items-center justify-between gap-5 mx-auto">
<div className="flex flex-row gap-5 mb-[50px] mt-[50px]">
<div className="text-4xl font-semibold w-[45%]">
  Get the skills you need for a  
  <HighlightText text={" job that is in demand"}/>
</div>

<div className="flex flex-col gap-10 w-[40%] items-start">
<p className="text-[16px]">
  The modern StudyNotion is the dictates its own terms. Today, to be a competitive 
  specialist requires more than professional skills.
</p>
    <CTABUTTON active={true} linkto={"/signup"}>
    <div>
           Learn More
    </div>
            </CTABUTTON>
</div>

</div>
</div>
</div>

<TimeLineSection/>
<LearningLanguageSection/>
      </div>

      {/* section 3 */}

      <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-black text-white  ">
      <InstructorSection/>

      <h2 className="text-center text-4xl font-semibold mt-10 ">Review from other learners </h2>
          {/* Review slider */}
          
      </div>
    </div>
  )
}


