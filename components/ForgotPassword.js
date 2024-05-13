import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaRegSun, FaMoon } from "react-icons/fa";
import { useTheme } from "./ThemeContext";

const ForgotPassword = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState("dark");
  const navigate = useNavigate();

  const handleNavigateToVerification = (emailOrPhone) => {
    navigate("/verification", { state: { emailOrPhone } });
  };
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  const hideLoader = () => {
    setShowLoader(false);
    document.body.style.overflow = "visible";
  };

  const showLoaderAndDisableScroll = () => {
    setShowLoader(true);
    document.body.style.overflow = "hidden";
  };

  const handleSendOtp = async () => {
    showLoaderAndDisableScroll();

    try {
      const response = await axios.post("http://localhost:3000/forgetPwd", {
        email: emailOrPhone,
      });
      console.log("Email to be passed:", emailOrPhone);

      console.log("Send OTP Response:", response.data);

      toast.success("OTP sent successfully");
      navigate("/verification", { state: { emailOrPhone } });
      handleNavigateToVerification(emailOrPhone);
    } catch (error) {
      console.error("Send OTP Error:", error.response.data);

      toast.error("Error sending OTP");
    } finally {
      hideLoader();
    }
  };
  const backgroundColorClass = theme === "dark" ? "bg-black" : "bg-white";
  const textColorClass = theme === "dark" ? "text-white" : "text-black";
  const textInputColorClass = theme === "dark" ? "text-gray-400" : "text-black";
  const inputBgcolor = theme === "dark" ? "bg-black" : "bg-gray-200";
  const borderClass = theme === "light" ? "border border-red-900" : "";
  const buttonColorClass = theme === "dark" ? "bg-rose-600" : "bg-red-900";

  return (
    <div
      className={`${backgroundColorClass} ${borderClass} flex max-w-[480px] w-full flex-col justify-center items-stretch mx-auto ${
        showLoader ? " h-screen overflow-hidden" : ""
      }`}
      style={{ position: "relative" }} // Ensure the border is visible by applying relative positioning
    >
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        {theme === "dark" ? (
          <FaRegSun color="#FFA500" size="24" />
        ) : (
          <FaMoon color="#000" size="24" />
        )}
      </button>
      <div className="flex w-full flex-col px-6">
        <div className="self-center flex items-start justify-between gap-2">
          <div className=" self-stretch flex w-[124px] shrink-0 h-[35px] flex-col rounded-2xl" />
        </div>

        <div
          className={`text-black text-3xl font-medium self-stretch ml-10 mt-11 ${textColorClass}`}
        >
          Forgot Password
        </div>
        <div
          className={`text-black text-sm leading-5 self-stretch ml-10 mt-3.5 ${textColorClass}`}
        >
          Confirm the email address you provided in your <br />
          security settings{" "}
        </div>

        <div
          className={`text-black text-left text-sm leading-5 ml-[40px] mt-20 relative ${textInputColorClass}`}
        >
          <label htmlFor="password">Email or Phone number</label>
          <div
            className={`relative aspect-[6.63] aspect-h-1 rounded-md bg-black text-white border border-gray-700/90 focus:outline-none overflow-hidden self-center max-w-[345px] mt-3.5 pr-10 ${borderClass} ${inputBgcolor} ${textColorClass}`}
          >
            <input
              id="password"
              type="email"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className={`w-full h-full  text-black border-none outline-none pl-3 pr-10 ${inputBgcolor} ${textInputColorClass}`}
            />
            <div className="absolute top-0 right-0 h-full flex items-center pr-3 cursor-pointer">
              <div className="border-r border-gray-700 mr-4 h-10 mx-2"></div>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-gray-500 text-base"
              />
            </div>
          </div>
        </div>

        <div className="bg-rose-600 ml-12 flex w-full max-w-[315px] flex-col justify-center items-stretch mt-28 p-px rounded">
          <button
            className="text-white text-center  text-base font-semibold leading-5 whitespace-nowrap z-[1] justify-center items-center px-16 py-5 rounded"
            onClick={handleSendOtp}
          >
            Send
          </button>
        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e39c87654077424b2b2ace69a4b945ed31e96fec8df8ed06386c507c627c1da?"
        className="aspect-[1.43] object-contain object-center w-full overflow-hidden mt-16"
      />
    </div>
  );
};

export default ForgotPassword;
