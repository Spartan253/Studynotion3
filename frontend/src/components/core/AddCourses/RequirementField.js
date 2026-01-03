import React from 'react'
import {useState,useEffect} from 'react'

const RequirementField =({name,label,register,errors,setValue,getValue})=>{
    const[requirement,setRequirement]=useState("");

    const[requirementList,setRequirementList]=useState([]);


    useEffect(()=>{
        register(name,{
            required:true,
            validate:(value)=>value.length>0
        })
    }, [name, register])

    useEffect(()=>{
setValue(name,requirementList)
    },[requirementList])
 const handleAddRequirement = () => {
  if(requirement.trim() !== ""){
    setRequirementList([...requirementList, requirement.trim()]);
    setRequirement("");
  }
};

    const  handleRemoveRequirement=(index)=>{
       const updateRequirementList=[...requirementList]
       updateRequirementList.splice(index,1);
       setRequirementList(updateRequirementList);
    }
  return(
    <div htmlFor={name}>
    <label>{label}<sup>*</sup></label>
    <div>
        <input type="text" id={name} value={requirement} onChange={(e)=>setRequirement(e.target.value)} className="w-full text-black"
        />

        <button type="button" onClick={handleAddRequirement} className="font-semibold text-yellow-500">
          Add  
        </button>
    </div>
    {
        requirementList.length>0 &&(
            <ul>
                {

                    requirementList.map((requirement,index)=>(
                        <li key={index} className='flex items-center bg-black text-yellow-500'>
                            <span >{requirement}</span>
                            <button
                            type='button' onClick={()=>handleRemoveRequirement(index)} className="text-xs text-pure-greys-300">
                             clear
                            </button>
                        </li>
                    )
                    )

                }

            </ul>
        )
    }
    {
        errors[name] &&(
            <span>
                {label} is required
            </span>
        )
    }
    </div>
  )
}
export default  RequirementField