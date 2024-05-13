import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PasswordChange = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  const location = useLocation();

  
  const email = location.state;
  console.log(email)
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = async () => {
    try {
      const response = await axios.post("http://localhost:3000/changePwd", {
        email, 
        password,
        confirmPassword,
      });
      toast.success("Password changed successfully");
      
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      
    }
  };

  return (
    <div className="bg-black flex max-w-[480px] w-full flex-col justify-center items-stretch mx-auto">
      <div className="flex flex-col pt-3 mx-auto w-full text-sm leading-5 text-white bg-black max-w-[480px]">
        <div className="flex flex-col px-6 w-full">
          <div className="self-start mt-12 ml-[55px] text-3xl font-medium">
            Create Your New Password
          </div>
          <div className="self-start mt-4  ml-[55px] text-center whitespace-nowrap">
            Let’s see whether you remember correctly
          </div>

          <div className="text-gray-400 text-left text-sm leading-5 ml-[55px] mt-10 relative">
            <label htmlFor="password">New Password</label>
            <div className="relative aspect-[6.63] aspect-h-1 rounded-md bg-black text-white border border-gray-700/90 focus:outline-none overflow-hidden self-center max-w-[345px] mt-3.5 pr-10">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-full bg-transparent text-gray-400 border-none outline-none pl-3 pr-10"
              />
              <div
                className="absolute top-0 right-0 h-full flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <div className="border-r border-gray-700 mr-4 h-10 mx-2"></div>
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="text-gray-500 text-base"
                />
              </div>
            </div>
          </div>

          <div className="text-gray-400 text-left text-sm leading-5 ml-[55px] mt-5 relative">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative aspect-[6.63] aspect-h-1 rounded-md bg-black text-white border border-gray-700/90 focus:outline-none overflow-hidden self-center max-w-[345px] mt-3.5 pr-10">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-full bg-transparent text-gray-400 border-none outline-none pl-3 pr-10"
              />
              <div
                className="absolute top-0 right-0 h-full flex items-center pr-3 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                <div className="border-r border-gray-700 mr-4 h-10 mx-2"></div>
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEye : faEyeSlash}
                  className="text-gray-500 text-base"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center self-center p-px mt-20 w-full text-base font-semibold leading-5 text-center text-white whitespace-nowrap bg-rose-600 rounded max-w-[315px]">
            <button
             onClick={handlePasswordChange}
              className="z-10 justify-center items-center px-16 py-4 rounded"
            >
              Change Password
            </button>
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5eecc7be4ab6411b6faa3396670924e4a47746e77a49835a032fa4f7f7a8a6a8?apiKey=a82e3ca82deb4f85a705f57690a42761&"
          className="mt-2.5 w-full aspect-[1.43]"
        />
      </div>
    </div>
  );
};

export default PasswordChange;