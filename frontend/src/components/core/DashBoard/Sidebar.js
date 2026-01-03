import React from  'react'
import { sidebarLinks } from '../../data/dashboard-links';
import {logout} from '../../../services/authAPI'
import { IoIosLogOut } from "react-icons/io";
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import{useState} from 'react';
import ConfirmationModel from '../../Comman/ConfirmationModel';
const Sidebar=()=>{
    const{user,loading:profileloading}=useSelector((state)=>state.profile);
    const{loading:authloading}=useSelector((state)=>state.auth);
     const dispatch=useDispatch();
     const navigate=useNavigate();
     const[confirmationModel,setconfirmationModel]=useState(null);
    if(profileloading ||authloading){
        return(
            <div className="mt-18">
                loading ..
            </div>
        )
    }
    return(
        <div className="text-white bg-black">
      <div className="flex min-w-[222px] flex-col border-r-[1px] boorder-r-black-700 h-[calc(100vh-3.5rem)] bg-grey-800 py-18">
  <div>
    {
        sidebarLinks.map((link,index)=>{

            if(link.type && user?.accountType!==link.type) return null;
            return(
                <SidebarLink  key={link.id} link={link} iconName={link.icon} />
        )
            
})
    }
  </div>
  <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-grey-600'>

<div>
    <SidebarLink 
    link={{name:"Settings",path:"dashboard/settings"}}
    iconName="VscSettingsGear"/>
    
    
    <button onClick={()=>setconfirmationModel({
        text1:"Are You Sure",
        text2:"you will beLogged out of your account",
        btn1Text:"Logout",
        btn2Text:"Cancel",
        btn1Handler:()=>dispatch(logout(navigate)),
        btn2handller:()=> setconfirmationModel(null),
    })}
    className="text-sm font-medium  text-gray-600"
    >
<div className="flex items-center gap-x-2">
    
<IoIosLogOut />

</div>
    </button>
</div>
  </div>
      </div>
      {confirmationModel && <ConfirmationModel modelData={confirmationModel}/>}
        </div>
    )
}

export default  Sidebar;