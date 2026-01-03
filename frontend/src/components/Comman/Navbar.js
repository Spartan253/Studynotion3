import React from 'react'
import Logo from "../../assets/Studynotionlogo.png"
import {Link } from 'react-router-dom'
import {NavbarLinks} from '../data/navbar-links'
import {useLocation,matchPath } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaShoppingCart } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import {categories} from '../../services/apis'
import {useState,useEffect} from 'react'
import { apiConnector } from '../../services/apiconnector'
export default function Navbar() {

  const {token}=useSelector((state)=>state.auth);
    const{user}=useSelector((state)=>state.profile);
  const { totalItems } = useSelector((state) => state.cart); 

    const location=useLocation();

    const subLinks=[
      {
   title:"python",
   link:'/catalog/python'
      },
            {
   title:"Webdevelopement",
   link:'/catalog/Webdevelopement'
      }
    ];

    // const {subLinks,setSubLinks}=useState([]);
   
//       const fetchSublinks=async()=>{
//       try{
//    const result=apiConnector("GET",categories.CATEGORIES_API);
//    console.log("printing sublink result");
//    setSubLinks(result.data.data)
//       }
//       catch(err){
//       console.log("could not fetch category list")
//       }
//      }
//      useEffect(()=>{
// fetchSublinks();
//      },[])
  
    const matchroute=(route)=>{
    return matchPath({path:route},location.pathname)
    }
  return (
    <div className="flex h-14 items-center justify-center bg-black text-white  border-b-[1px] border-b-gray-600">  
       <div className="flex w-11/12 max-w-maxContent items-center justify-between ">
       {/* Image */}
       <Link to="/">
       <img src={Logo} width={160} height={42} loading='lazy'alt="Website Logo"/>
       </Link>


<nav>
    <ul className="flex gap-x-6 text-white ">
      {
        NavbarLinks.map((link,index)=>(
          
                <li key={index}>
      {
        link.title==="Catalog"?(<div className='relative flex flex-row justify-center items-center gap-2 group'>
          <p>{link.title}</p>
           <FaAngleDown className="text-white" />

           <div className='w-[150px] translate-x-[-50%] translate-y-[10%]  invisible absolute left-[50%] top-[50%] flex flex-col rounded-md bg-white p-4 text-black-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg-w-[300px] '>
    <div className="absolute translate-y-[-30%] translate-x-[50%] left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-white"> 

           </div>

                    {
            subLinks.length?(
   
      subLinks?.map((sublink,index)=>(
      <div key={index}>
        <Link to={sublink.link}>
        <p className="text-black">{sublink.title}</p>
        </Link>
        </div>

      ))
   
            ):(<div></div>)
           }
           </div>
  
       
        </div>):(
            <Link to={link?.path}>
                <p className={`${matchroute(link?.path)?"text-yellow-500":"text-white"}`}>
                    {link.title}
                </p>
            </Link>
        )
      }
                </li>

            
        ))
      }
    </ul>
</nav>


<div className="flex gap-x-4 items-center">

  {
    user && user?.accountType !== "Instructor" &&(
      <Link to="/dashboard/cart" className="relative">
<FaShoppingCart />
{
  totalItems>0 &&(
    <span>
      {totalItems}
    </span>
  )
}
      </Link>
    )
  }


{/* 
  <Link to="/signup" >
<button className="text-white ">
  Sign up
</button>
  </Link>

  <Link to="/login"  className="text-white  bg-gray-800">
<button>
  Login
</button>
  </Link> */}


  {
    token === null &&(
      <Link to="/login">
        <button className="border border-black bg-gray-800 px-[12px] py-[8px] text-white rounded-md">
          Log in
        </button>
      </Link>
    )
    
  }
    {
    token === null &&(
      <Link to="/signup" className="border border-black bg-gray-800 px-[12px] py-[8px] text-white rounded-md">
        <button>
           Signup
        </button>
      </Link>
    )
    
  } 
   {
    token !== null && <ProfileDropDown/>
  }

</div>
        </div> 
    </div>
  )
}
