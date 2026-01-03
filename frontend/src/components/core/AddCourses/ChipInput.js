import React from 'react'

export default function({label,name,placeholder,register,error,setValue,getValues}){
    
    function handlechange(e){
       setValue(name, e.target.value);
    }
    return(
        <div>
         <div>
            <label className="text-white">
                {label}<sup>*</sup>
            </label>
            <div>
        <input type="text"  id={name} placeholder={placeholder}  {...register(name,{required:true} )
                } className="w-full text-black"   onChange={handlechange}
                 />

                 {error?.[name] &&( 
                        <span>
                            course title is required
                        </span>
                 )
                 }
                
            </div>
         </div>
        </div>
    )
}