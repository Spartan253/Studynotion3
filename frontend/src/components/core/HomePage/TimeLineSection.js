import React from 'react'
import Logo1 from '../../../assets/Logo1.svg'
import Logo2 from '../../../assets/Logo2.svg'
import Logo3 from '../../../assets/Logo3.svg'
import Logo4 from '../../../assets/Logo4.svg'
import TimelineImage from '../../../assets/TimelineImage.png'
const timeline=[
    {
        logo:Logo1,
        heading:"leadership",
        description:"Fully committed to succesful company",
    },
      {
        logo:Logo2,
        heading:"Responsibility",
        description:"Students will always be our top priority",
    },
  {
        logo:Logo3,
        heading:"Flexibility",
        description:"The ability to switch is an important skills",
    },
      {
        logo:Logo4,
        heading:"Solve the problem",
        description:"Code your way to a solution",
    }
]
export default function TimeLineSection() {
  return (
    <div className="w-11/12 bg-black">
      <div className="flex flex-row gap-15 items-center">
        <div className="w-[45%] flex flex-col gap-5 h-[450px]">
            {
                timeline.map((element,index)=>(
                    <div key={index} className="flex flex-row gap-[10px]">
                   <img src={element.logo}/>
                   <div>
                    <h1>{element.heading}</h1>
                    <p>{element.description}</p>
                    </div>
                        </div>
                ))
            }
        </div>

        <div className="relative shadow-blue-200">

<img src={TimelineImage} alt="timelineimg"
className='shadow-white object-cover h-fit '/>

<div className="absolute bg-green-800 flex flex-row text-white uppercase py-10 left-[50%] translate-x-[-50%] translate-y-[-50%] ">
    <div className="flex flex-row gap-5 items-center border-r border-green-300 px-7">
        <p className="text-3xl font-bold">10</p>
        <p className="text-green-400 text-sm">Years of Experience</p>
    </div>

   <div className="flex gap-5 items-center px-7 ">
 <p className="text-3xl font-bold">250</p>
        <p className="text-green-400 text-sm">Type Of courses</p>
   </div>
</div>
        </div>
      </div>
    </div>
  )
}
