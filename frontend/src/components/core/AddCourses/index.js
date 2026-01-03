import React from 'react'
import RenderSteps from "./RenderSteps";


export default function AddCourses(){
    return (
        <div className="text-black ">
            <div>
                <h1>Add Course</h1>
                <div>
                    <RenderSteps/>
                </div>
            </div>
            <div>
                <p>Course Upload tips</p>
                <ul>
          <li> set the course price option or make it freee</li>
           <li> Standard size for the course thumbnail is 1024*576</li>
            <li>video section control the course overview video </li>
             <li> Set the course Price option or make it free </li>
             <li> Standard size for the course thumbnail is 1024*576</li>
            <li>video section control the course overview video </li>
            
                </ul>
            </div>
        </div>
    )
}