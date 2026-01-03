// import React from 'react'
// import Logo1 from '../../../assets/Logo1.svg'
// import Logo2 from '../../../assets/Logo2.svg'
// import Logo3 from '../../../assets/Logo3.svg'
// import Logo4 from '../../../assets/Logo4.svg'
// import TimelineImage from '../../../assets/TimelineImage.png'
// const timeline=[
//     {
//         logo:Logo1,
//         heading:"leadership",
//         description:"Fully committed to succesful company",
//     },
//       {
//         logo:Logo2,
//         heading:"Responsibility",
//         description:"Students will always be our top priority",
//     },
//   {
//         logo:Logo3,
//         heading:"Flexibility",
//         description:"The ability to switch is an important skills",
//     },
//       {
//         logo:Logo4,
//         heading:"Solve the problem",
//         description:"Code your way to a solution",
//     }
// ]
// export default function TimeLineSection() {
//   return (
//     <div className="w-11/12 bg-black">
//       <div className="flex flex-row gap-15 items-center">
//         <div className="w-[45%] flex flex-col gap-5 h-[450px]">
//             {
//                 timeline.map((element,index)=>(
//                     <div key={index} className="flex flex-row gap-[10px]">
//                    <img src={element.logo}/>
//                    <div>
//                     <h1>{element.heading}</h1>
//                     <p>{element.description}</p>
//                     </div>
//                         </div>
//                 ))
//             }
//         </div>

//         <div className="relative shadow-blue-200">

// <img src={TimelineImage} alt="timelineimg"
// className='shadow-white object-cover h-fit '/>

// <div className="absolute bg-green-800 flex flex-row text-white uppercase py-10 left-[50%] translate-x-[-50%] translate-y-[-50%] ">
//     <div className="flex flex-row gap-5 items-center border-r border-green-300 px-7">
//         <p className="text-3xl font-bold">10</p>
//         <p className="text-green-400 text-sm">Years of Experience</p>
//     </div>

//    <div className="flex gap-5 items-center px-7 ">
//  <p className="text-3xl font-bold">250</p>
//         <p className="text-green-400 text-sm">Type Of courses</p>
//    </div>
// </div>
//         </div>
//       </div>
//     </div>
//   )
// }



import React from 'react'
import Logo1 from '../../../assets/Logo1.svg'
import Logo2 from '../../../assets/Logo2.svg'
import Logo3 from '../../../assets/Logo3.svg'
import Logo4 from '../../../assets/Logo4.svg'
import TimelineImage from '../../../assets/TimelineImage.png'

const timeline = [
  {
    logo: Logo1,
    heading: "Leadership",
    description: "Fully committed to successful company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skill",
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
]

export default function TimeLineSection() {
  return (
    <div className="w-11/12 mx-auto bg-black py-12 px-4">
      <div className="flex flex-col md:flex-row gap-10 items-center">

        {/* Timeline Content */}
        <div className="w-full md:w-[45%] flex flex-col gap-6">
          {timeline.map((element, index) => (
            <div key={index} className="flex gap-4 items-start">
              <img src={element.logo} alt={element.heading} className="w-10 h-10" />
              <div>
                <h1 className="text-white text-lg font-semibold">
                  {element.heading}
                </h1>
                <p className="text-gray-400 text-sm">
                  {element.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Image */}
        <div className="relative w-full md:w-[55%] flex justify-center">
          <img
            src={TimelineImage}
            alt="Timeline"
            className="object-contain w-full max-w-md md:max-w-full"
          />

          {/* Stats Box */}
          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 bg-green-800 text-white uppercase flex flex-col sm:flex-row shadow-lg">
            
            <div className="flex gap-4 items-center border-b sm:border-b-0 sm:border-r border-green-300 px-6 py-4">
              <p className="text-3xl font-bold">10</p>
              <p className="text-green-300 text-xs">
                Years of Experience
              </p>
            </div>

            <div className="flex gap-4 items-center px-6 py-4">
              <p className="text-3xl font-bold">250</p>
              <p className="text-green-300 text-xs">
                Types of Courses
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
