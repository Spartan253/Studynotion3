// import React from 'react'
// import HighlightText from './HighlightText'
// import know_your_progress from '../../../assets/Know_your_progress.png'
// import Plan_your_lessons from '../../../assets/Plan_your_lessons.svg'
// import Compare_with_others from '../../../assets/Compare_with_others.svg'
// import CTABUTTON from './CTABUTTON'
// export default function LearningLanguageSection() {
//   return (
//     <div className="mt-[100px]">
//       <div className="flex flex-col gap-5 bg-white items-center ">

// <div className="text-4xl font-semobold text-center text-black">
//     Your Swiss Knife For
//     <HighlightText text={" Learning any Language"}/>
// </div>

// <div className='text-center text-black mx-auto text-base font-md text-gray-700'>
//     With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, 
//     including hands-on projects, quizzes, and personalized feedback from instructors.
// </div>

// <div className='flex flex-row items-center justify-center mt-5'>
// <img src={know_your_progress} alt="knowyourprogress" className="object-contain -mr-32"/>
// <img src={Compare_with_others} alt="Comparewithothers" className="object-contain"/>
// <img src={Plan_your_lessons} alt="Planyourlessons" className="object-contain -ml-36"/>

// </div>

// <div className="w-fit ">
//     <CTABUTTON active={true} linkto={"/signup"}>
//        <div>
//         Learn More
//        </div>
//     </CTABUTTON>
// </div>
//       </div>
//     </div>
//   )
// }


import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from '../../../assets/Know_your_progress.png'
import Plan_your_lessons from '../../../assets/Plan_your_lessons.svg'
import Compare_with_others from '../../../assets/Compare_with_others.svg'
import CTABUTTON from './CTABUTTON'

export default function LearningLanguageSection() {
  return (
    <div className="mt-16 md:mt-[100px] px-4">
      <div className="flex flex-col gap-6 bg-white items-center">

        {/* Heading */}
        <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-black">
          Your Swiss Knife For{" "}
          <HighlightText text={"Learning any Language"} />
        </div>

        {/* Description */}
        <div className="text-center max-w-3xl text-sm sm:text-base text-gray-700">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to hands-on projects, quizzes,
          and personalized feedback from instructors.
        </div>

        {/* Images */}
        <div className="flex flex-col sm:flex-row items-center justify-center mt-6 gap-6 sm:gap-0">
          <img
            src={know_your_progress}
            alt="Know your progress"
            className="object-contain w-48 sm:w-56 md:-mr-32"
          />

          <img
            src={Compare_with_others}
            alt="Compare with others"
            className="object-contain w-48 sm:w-56"
          />

          <img
            src={Plan_your_lessons}
            alt="Plan your lessons"
            className="object-contain w-48 sm:w-56 md:-ml-36"
          />
        </div>

        {/* CTA */}
        <div className="w-fit mt-4">
          <CTABUTTON active={true} linkto={"/signup"}>
            <div>Learn More</div>
          </CTABUTTON>
        </div>

      </div>
    </div>
  )
}
