import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useState} from 'react'
import {Link} from "react-router-dom"
import { resetPassword } from '../services/authAPI'
import { useLocation } from 'react-router-dom';
import { AiOutlineEyeInvisible,AiOutlineEye } from "react-icons/ai";
const UpdatePassword=()=>{
    const[formdata,setformdata]=useState({password:"",confirmPassword:""})
    const{loading}=useSelector((state)=>state.auth);
    const[showpassword,setshowpassword]=useState(false);
    const{password,confirmPassword}=formdata;
    const[showconfirmpassword,setshowconfirmpassword]=useState(false);
     const dispatch=useDispatch();
     const location=useLocation();
      function handleonchange(event){
    setformdata((prev)=>({
        ...prev,
        [event.target.name]:event.target.value
    }))

  }
  function handleOnSubmit(e){
    e.preventDefault();
    const token=location.pathname.split('/').at(-1);
dispatch(resetPassword(password,confirmPassword,token))
  }

    return(
        <div>
            {
 loading ?(<div>loading ..</div>)
            :(
                <div>
                 <h1> Choose new Password</h1>
                 <p>almost doen Enter your new password and your all set</p>  

                 <form onSubmit={handleOnSubmit}>
                    <label>
                        <p>New Password <sup>*</sup>
                        <input required type={showpassword?"text":"password"} placeholder="password" name="password" value={password} onChange={handleonchange}/></p>
                           <span onClick={()=>setshowpassword((prev)=>!prev)}>
                        {
                            showpassword?(<AiOutlineEyeInvisible />): (<AiOutlineEye />)
                        }
                       </span>
                    </label>
                                   <label>
                        <p> connfirm New Password <sup>*</sup>
                        <input required type={showconfirmpassword?"text":"password"}placeholder="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleonchange}/></p>
                       <span onClick={()=>setshowconfirmpassword((prev)=>!prev)}>
                        {
                            showconfirmpassword?(<AiOutlineEyeInvisible />): (<AiOutlineEye />)
                        }
                       </span>
                    </label>

                    <button type='submit'>
                         Reset password
                    </button>

                    </form> 

                    <div>
                        <Link to="/login">
                        <p>Back to login</p>
                        </Link>
                        </div>
                </div>
            )


            }
           
        </div>
    )
}









export default UpdatePassword