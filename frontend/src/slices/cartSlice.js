// import { createSlice } from "@reduxjs/toolkit";
// import {toast} from 'react-hot-toast'

// // localstorage tab and browser still value sustained
// const initialState ={
//     totalItems: localStorage.getItem('totalItems')? JSON.parse(localStorage.getItem("totalItems")):0,
//    total:localStorage.getItem('total')? JSON.parse(localStorage.getItem("total")):0,
// cart:localStorage.getItem('cart')? JSON.parse(localStorage.getItem("cart")):0,
// };


// const cartSlice=createSlice({
//     name:"cart",
//     initialState:initialState ,
//     reducers:{
//         setTotalItems(state,action){
//             state.totalItems=action.payload;
//                   localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
//         },
//         addToCart(state,action){
//     state.cart.push(action.payload);
//     state.totalItems+=1;
//     localStorage.setItem("cart",JSON.stringify(state.cart));
//      localStorage.setItem("totalItems",JSON.stringify(state.totalItems));

//            toast.success("Item added to cart");
//         },
//             removeFromCart(state,action){
//  state.removeCart=state.cart.filter(item=>item._id !==action.payload);
//  state.totalItems=state.cart.length;
//  localStorage.setItems("cart",JSON.stringify(state.cart));
//  localStorage.setItems("totalItems",JSON.stringify(state.totalItems));
// toast.success("Item Remove from cart");       
// }


//     },

//       // ✅ RESET CART
//     resetCart(state) {
//       state.cart = [];
//       state.totalItems = 0;
//       state.total = 0;

//       localStorage.removeItem("cart");
//       localStorage.removeItem("totalItems");
//       localStorage.removeItem("total");

//       toast.success("Cart cleared");
//     },
// })

// export const{setTotalItems,addToCart,removeFromCart,resetCart}=cartSlice.actions;
//    export default cartSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,

  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,

  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],   // ✅ MUST BE ARRAY
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotalItems(state, action) {
      state.totalItems = action.payload;
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },

    addToCart(state, action) {
      state.cart.push(action.payload);
      state.totalItems += 1;

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      toast.success("Item added to cart");
    },

    removeFromCart(state, action) {
      state.cart = state.cart.filter(
        (item) => item._id !== action.payload
      );

      state.totalItems = state.cart.length;

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      toast.success("Item removed from cart");
    },

    resetCart(state) {
      state.cart = [];
      state.totalItems = 0;
      state.total = 0;

      localStorage.removeItem("cart");
      localStorage.removeItem("totalItems");
      localStorage.removeItem("total");

      toast.success("Cart cleared");
    },
  },
});

export const {
  setTotalItems,
  addToCart,
  removeFromCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
