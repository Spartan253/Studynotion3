// import { createSlice } from "@reduxjs/toolkit";


// const initialState={
//     step:1,
//     course:null,
//      courses: [], 
//     editCourse:false,
//     paymentloading:false,
// }

// const courseSlice=createSlice({
//     name:"course",
//     initialState,
//     reducers:{
//         setStep(state,action){
//             state.step=action.payload
//         },
//         setcourse(state,action){
//             state.course=action.payload
//         },

//            setCourses(state, action) {          // ✅ NEW
//       state.courses = action.payload;
//     },
//         setEditCourse(state,action){
// state.editCourse=action.payload
//         },
//         setPaymentLoading(state,action){
//             state.paymentloading=action.payload;
//         },
//         resetCourseState(state){
// state.step=1;
// state.course=null;
// state.editCourse=false;
//         }
//     }
// })

// export const {setStep,setcourse,setEditCourse,setPaymentLoading,resetCourseState,setCourses}=courseSlice.actions;
//  export default courseSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  course: null,
  courses: [],
  editCourse: false,
  paymentloading: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep(state, action) {
      state.step = action.payload;
    },

    setcourse(state, action) {
      state.course = action.payload;
    },

    setCourses(state, action) {
      state.courses = action.payload;
    },

    // ✅ DELETE COURSE (NEW)
    deleteCourse(state, action) {
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },

    setEditCourse(state, action) {
      state.editCourse = action.payload;
    },

    setPaymentLoading(state, action) {
      state.paymentloading = action.payload;
    },

    resetCourseState(state) {
      state.step = 1;
      state.course = null;
      state.editCourse = false;
    },
  },
});

export const {
  setStep,
  setcourse,
  setCourses,
  deleteCourse, // ✅ export this
  setEditCourse,
  setPaymentLoading,
  resetCourseState,
} = courseSlice.actions;

export default courseSlice.reducer;
