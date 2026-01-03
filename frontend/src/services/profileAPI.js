import {toast} from "react-hot-toast"
import { setLoading,setToken,setLoggedin } from "../slices/authSlice";
import{setUser} from '../slices/profileSlice'
import {apiConnector} from './apiconnector'
import {profile} from "./apis"


export async function getEnrolledCourses(token) {
  const toastId = toast.loading("Loading enrolled courses...");
  let result = [];

  try {
    const res = await apiConnector(
      "GET",
      profile.ENROLLED_COURSES_API, 
          null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!res.data.success) {
      throw new Error(res.data.message);
    }

    // Ensure we always return an array
    result = res.data.data;
  } catch (error) {
    console.log("Error fetching enrolled courses:", error);
    toast.error("Could not get enrolled courses");
    result = [];
  }

  toast.dismiss(toastId);
  return result;
}
