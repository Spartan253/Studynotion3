import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Comman/IconBtn";
import Sidebar from "../DashBoard/Sidebar";

const MyProfile = () => {
  const user = useSelector((state) => state.profile.user);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 sm:p-8  w-[1080px] justify-center mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-yellow-400">
        My Profile
      </h1>

      {/* ===== Profile Card ===== */}
      <div className="bg-gray-800/70 backdrop-blur-md rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="w-20 h-20 rounded-full object-cover border-2 border-yellow-400"
          />

          <div>
            <p className="text-lg font-semibold">
              {user?.firstname} {user?.lastname}
            </p>
            <p className="text-gray-300 text-sm">{user?.email}</p>
          </div>
        </div>

        <IconBtn
          text="Edit"
          onClick={() => navigate("/dashboard/settings")}
        />
      </div>

      {/* ===== About Section ===== */}
      <div className="mt-6 bg-gray-800/70 rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <p className="text-lg font-semibold">About</p>
          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
          />
        </div>

        <p className="text-gray-300 text-sm">
          {user?.additionaldetails?.about ||
            "Write something about yourself"}
        </p>
      </div>

      {/* ===== Personal Details ===== */}
      <div className="mt-6 bg-gray-800/70 rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-semibold">Personal Details</p>
          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <Detail label="First Name" value={user?.firstname} />
          <Detail label="Email" value={user?.email} />
          <Detail
            label="Gender"
            value={user?.additionaldetails?.gender || "Not specified"}
          />
          <Detail
            label="Phone Number"
            value={
              user?.additionaldetails?.contactNumber ||
              "Add Contact Number"
            }
          />
          <Detail
            label="Date of Birth"
            value={
              user?.additionaldetails?.dateofBirth ||
              "Add Date of Birth"
            }
          />
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-gray-400">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default MyProfile;
