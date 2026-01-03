import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../services/authAPI";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-md rounded-xl shadow-xl p-6 sm:p-8 text-white">
        
        {/* Title */}
        <h1 className="text-2xl font-bold mb-2 text-yellow-400">
          {!emailSent ? "Reset your password" : "Check your email"}
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-300 mb-6">
          {!emailSent
            ? "No worries! We'll send you instructions to reset your password. If you no longer have access to your email, we can help you recover your account."
            : `We have sent a password reset link to ${email}`}
        </p>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="space-y-4">
          {!emailSent && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-gray-900 border border-gray-700
                           px-4 py-2 text-white placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-300
                       text-black font-semibold py-2 rounded-lg
                       transition disabled:opacity-50"
          >
            {loading
              ? "Sending..."
              : !emailSent
              ? "Reset Password"
              : "Resend Email"}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm text-gray-400 hover:text-yellow-400 transition"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
