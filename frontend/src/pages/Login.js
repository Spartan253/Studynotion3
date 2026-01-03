import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../services/authAPI";
import loginImg from "../assets/login.webp";
import HighlightText from "../components/core/HomePage/HighlightText";

export default function Login() {
  const [formdata, setFormdata] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function changeHandler(e) {
    setFormdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();
    dispatch(login(formdata.email, formdata.password, navigate));
    toast.success("Logged in");
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* ================= LEFT FORM ================= */}
        <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-6 sm:p-10 text-white shadow-xl">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-300 mb-1">
            Build skills for today, tomorrow, and beyond
          </p>
          <HighlightText text="Education to future-proof your career." />

          <form onSubmit={submitHandler} className="mt-6 space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Email Address <sup>*</sup>
              </label>
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={changeHandler}
                placeholder="Enter your email"
                required
                className="w-full rounded-lg bg-gray-900 border border-gray-700
                           px-4 py-2 text-white placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm text-gray-400 mb-1">
                Password <sup>*</sup>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formdata.password}
                onChange={changeHandler}
                placeholder="Enter your password"
                required
                className="w-full rounded-lg bg-gray-900 border border-gray-700
                           px-4 py-2 pr-10 text-white placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] text-gray-400 cursor-pointer"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            {/* Forget Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => navigate("/forget-password")}
                className="text-sm text-yellow-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300
                         text-black font-semibold py-2 rounded-lg
                         transition"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* ================= RIGHT IMAGE ================= */}
        <div className="hidden lg:flex justify-center">
          <img
            src={loginImg}
            alt="Login"
            className="w-[420px] rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
