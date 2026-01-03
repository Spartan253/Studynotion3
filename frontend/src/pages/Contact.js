// import { toast } from "react-hot-toast";
// import { apiConnector } from "../services/apiconnector";
// import { auth } from "../services/apis";

// import { setLoading } from "../slices/authSlice";

// // CONTACT US
// import React, { useState } from "react";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Contact } from "../services/authAPI";

// export default function ContactUs() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formdata, setFormdata] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     message: "",
//   });

//   const [phone, setPhone] = useState("");

//   function changehandler(e) {
//     const { name, value } = e.target;
//     setFormdata((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   }

//   function submithandler(e) {
//     e.preventDefault();

//     dispatch(
//       Contact(
//         formdata.firstname,
//         formdata.lastname,
//         formdata.email,
//         phone,
//         formdata.message,
//         navigate
//       )
//     );
//   }

//   return (
//     <section className="min-h-screen flex items-center justify-center bg-black">
//       <form
//         onSubmit={submithandler}
//         className="w-full max-w-md bg-white/5 p-6 rounded-xl text-white flex flex-col gap-4"
//       >
//         <input
//           type="text"
//           name="firstname"
//           placeholder="First Name"
//           value={formdata.firstname}
//           onChange={changehandler}
//           className="p-2 bg-black/40 rounded"
//         />

//         <input
//           type="text"
//           name="lastname"
//           placeholder="Last Name"
//           value={formdata.lastname}
//           onChange={changehandler}
//           className="p-2 bg-black/40 rounded"
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formdata.email}
//           onChange={changehandler}
//           className="p-2 bg-black/40 rounded"
//         />

//         <PhoneInput
//           country="in"
//           value={phone}
//           onChange={(value) => setPhone(value)}
//           inputClass="!w-full !bg-black/40 !text-white"
//         />

//         <textarea
//           name="message"
//           rows="3"
//           placeholder="Your message..."
//           value={formdata.message}
//           onChange={changehandler}
//           className="p-2 bg-black/40 rounded resize-none"
//         />

//         <button
//           type="submit"
//           className="bg-emerald-500 text-black py-2 rounded font-semibold"
//         >
//           Submit
//         </button>
//       </form>
//     </section>
//   );
// }


import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Contact } from "../services/authAPI";

export default function ContactUs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });

  const [phone, setPhone] = useState("");

  function changehandler(e) {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function submithandler(e) {
    e.preventDefault();
    dispatch(
      Contact(
        formdata.firstname,
        formdata.lastname,
        formdata.email,
        phone,
        formdata.message,
        navigate
      )
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Get in 
            <span className="text-yellow-400"> Touch </span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            We’d love to hear from you. Fill out the form below.
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={submithandler}
          className="backdrop-blur-xl bg-white/5 border border-white/10
                     rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl"
        >
          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formdata.firstname}
              onChange={changehandler}
              className="input-style"
            />

            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formdata.lastname}
              onChange={changehandler}
              className="input-style"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formdata.email}
            onChange={changehandler}
            className="input-style"
          />

          {/* Phone */}
          <div className="phone-input-wrapper">
            <PhoneInput
              country="in"
              value={phone}
              onChange={setPhone}
              inputClass="!w-full !bg-black/40 !border !border-white/10 
                          !text-white !rounded-lg !py-3 !pl-12
                          focus:!border-emerald-400"
              buttonClass="!bg-black/40 !border-white/10"
            />
          </div>

          {/* Message */}
          <textarea
            name="message"
            rows="4"
            placeholder="Tell us how we can help you..."
            value={formdata.message}
            onChange={changehandler}
            className="input-style resize-none"
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full  bg-yellow-400
                       text-black font-semibold py-3 rounded-xl
                       hover:opacity-90 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Tailwind reusable styles */}
      <style>{`
        .input-style {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          outline: none;
          transition: border 0.2s ease;
        }
        .input-style::placeholder {
          color: #9ca3af;
        }
        .input-style:focus {
          border-color: #34d399;
        }
      `}</style>
    </section>
  );
}
