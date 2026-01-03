import React  from 'react'

const IconBtn=({
    text,
    onClick,
    children,
    disabled,
    outline=false,
    customClasses="", type = "button" 
})=>{
    return (
       <button disabled={disabled} onClick={onClick} type={type} className={customClasses}>
        {
            children?(<div>
                <span>{text}</span>
                 {children}
            </div>):(text)
        }
       </button>
    )
}

export default IconBtn