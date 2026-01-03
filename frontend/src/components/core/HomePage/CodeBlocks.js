import React from 'react'
import CTABUTTON from './CTABUTTON'
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';
export default function CodeBlocks({
    position,heading,subheading,ctabtn1,ctabtn2,codeblock,backgroundgradient,codecolor
}) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 `}>
      
      
 <div className="w-[50%]">
        {heading}
        <div className="tetx-black font-bold">
            {subheading}
        </div>

              <div className="flex gap-7 mt-7">
<CTABUTTON active={ctabtn1.active} linkto={ctabtn1.linkto}>
    <div className='flex gap-2 items-center'>
 {ctabtn1.btnText}
   < FaArrowRight/>
    </div>
</CTABUTTON>

<CTABUTTON active={ctabtn2.active} linkto={ctabtn2.linkto}>
    <div className='flex gap-2 items-center'>
 {ctabtn2.btnText}
   < FaArrowRight/>
    </div>
</CTABUTTON>
      </div>
      </div>

      
     

<div className="flex flex-row w-[50%]">
<div className='text-center flex flex-col w-[10%] text-white  font-inter font-bold'>
        <p>1</p>
          <p>2</p>
           <p>3</p>
            <p>4</p>
              <p>5</p>
                <p>6</p>
                  <p>7</p>
                    <p>8</p>  
                      <p>9</p>
                        <p>10</p>
                        <p>11</p>

      </div>

      <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono text-yellow-500  pr-2`}>
<TypeAnimation
sequence={[codeblock,10000,""]}
repeat={Infinity}
cursor={true}
style={{
  whiteSpace:"pre-line",
  display:"block"
}}/>
      </div>
</div>
      



    </div>



  )
}
