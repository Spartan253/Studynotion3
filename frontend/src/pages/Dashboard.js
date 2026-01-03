// import React from 'react'
// import {useSelector} from 'react-redux'
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/core/DashBoard/Sidebar';
// import MyProfile from '../components/core/DashBoard/MyProfile';
// //outlet 
// const Dashboard=()=>{
//  const {loading:authloading}=useSelector((state)=>state.auth);
// const {loading:profileloading}=useSelector((state)=>state.profile);
// const{user}=useSelector((state)=>state.profile);

// if(user==null){
//     return(
//         <div>
//             User is null
//         </div>
//     )
// }
// if(authloading || profileloading){
//     return (
//         <div>
//             loading...
//         </div>
//     )

// }
// return(
//     <div className="relative flex min-h-[calc(100vh-3.5rem)] bg-black">
// <Sidebar/>

// <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
    
//     <div className="mx-auto w-11/12 max-w-[1000px] py-10">
//         <Outlet/>
//     </div>
// </div>
//     </div>
// )
// }
// export default Dashboard;


import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/DashBoard/Sidebar";

const Dashboard = () => {
  const { loading: authloading } = useSelector((state) => state.auth);
  const { loading: profileloading, user } = useSelector(
    (state) => state.profile
  );

  if (!user) {
    return <div className="text-white p-6">User is null</div>;
  }

  if (authloading || profileloading) {
    return <div className="text-white p-6">Loading...</div>;
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] w-full bg-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto">
        {/* 🔥 FULL WIDTH CONTENT */}
        <div className="w-full px-4 sm:px-8 py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
