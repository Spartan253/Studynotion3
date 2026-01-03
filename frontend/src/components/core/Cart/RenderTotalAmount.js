import React from 'react'
import { useSelector } from 'react-redux';
import IconBtn from '../../Comman/IconBtn';
export default function RendertotalAmount(){
    const{total,cart}=useSelector((state)=>state.cart);
   function handleBuyCourse(){
      const courses=cart.map((course)=>course._id);
      console.log("bought the course",courses);
    //   payement gateway
   }
return (
    <div>
        <p>Total:</p>
         <p>Rs {total}</p>

         <IconBtn text="buy Now" onClick={handleBuyCourse}
         customeClasses={"w-full justify-center"}/>
    </div>
)
}