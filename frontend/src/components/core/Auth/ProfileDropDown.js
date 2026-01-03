// import React from 'react'
// import { useSelector } from 'react-redux';
// import { IoIosArrowDown } from "react-icons/io";
// import { useNavigate } from 'react-router-dom';
// const ProfileDropDown=()=>{
//      const user=useSelector((state)=>state.profile.user);
//      const navigate=useNavigate();
//     return(
//         <div onClick={()=>(<div>
//          <button onClick={()=>navigate("/dashboard/my-profile")}>Dashboard</button>
//                   <button onClick={()=>navigate("/login")}>logout</button>
//             </div>)}> 
//     <img src={user?.image} alt={`profile-${user?.firstName}`} className="w-[50px] h-[50px] rounded-full"/>
//     <IoIosArrowDown />
//         </div>
//     )
// }

// export default ProfileDropDown;



import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../services/authAPI';
const ProfileDropDown = () => {
  const user = useSelector((state) => state.profile.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);  
  const dispatch=useDispatch();

  return (
    <div className="relative">
      {/* Profile button */}
      <div 
        onClick={() => setOpen((prev) => !prev)} 
        className="flex items-center gap-2 cursor-pointer"
      >
        <img 
          src={user?.image} 
          alt={`profile-${user?.firstName}`} 
          className="w-[50px] h-[50px] rounded-full"
        />
        <IoIosArrowDown />
      </div>

      {/* Dropdown menu */}
     {
        open &&(
            <div className=" flex flex-col bg-gray-800 text-white rounded-md">
                <button onClick={()=>navigate("/dashboard/my-profile")}>
                  Dashboard
                </button>
                 <button onClick={()=>dispatch(logout(navigate))}>
                  Logout
                </button>
                </div>
        )
     }
    </div>
  )
}

export default ProfileDropDown;
