import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegSun, FaMoon } from "react-icons/fa";
import { useTheme } from "./ThemeContext";

const Verification = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [showLoader, setShowLoader] = useState(false);

  const [timer, setTimer] = useState(60);
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState("dark");
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state && location.state.emailOrPhone
      ? location.state.emailOrPhone
      : "";

  // console.log(email);

  // Create an array of refs
  const inputRefs = useRef([]);
  inputRefs.current = otp.map(
    (_, i) => inputRefs.current[i] ?? React.createRef()
  );
  const hideLoader = () => {
    setShowLoader(false);
    document.body.style.overflow = "visible";
  };
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };
  const showLoaderAndDisableScroll = () => {
    setShowLoader(true);
    document.body.style.overflow = "hidden";
  };

  // const handleChange = (index, value) => {
  //   const newOtp = [...otp];
  //   newOtp[index] = value;
  //   setOtp(newOtp);
  // };
  const handleChange = (index, value) => {
    // Update the value of the current OTP input
    const newOtp = [...otp];
    if (value === "" || (value.match(/[0-9]/) && value.length === 1)) {
      newOtp[index] = value;
      setOtp(newOtp);
    }

    // If the current input is filled and it's not the last input, move to the next one
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };
  const handleKeyDown = (e, index) => {
    // Check if backspace or delete was pressed
    if ((e.key === "Backspace" || e.key === "Delete") && index > 0) {
      if (!otp[index]) {
        // If current input is empty, move to and clear the previous one
        inputRefs.current[index - 1].current.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      } else {
        // If current input is not empty, just clear the current one (handled by onChange)
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        // Optionally, move back to the previous input if you want to mimic 'backspacing' through filled inputs
        inputRefs.current[index - 1].current.focus();
      }
    }
  };
  const handlePaste = (e) => {
    e.preventDefault(); // Prevent the default paste behavior
    const pasteData = e.clipboardData.getData("text").slice(0, otp.length); // Get the clipboard data and limit it to the OTP length
    const newOtp = pasteData.split("").slice(0, otp.length); // Split the pasted data into individual digits

    // If the pasted data has fewer digits than the number of OTP input boxes, fill the rest with empty strings
    if (newOtp.length < otp.length) {
      for (let i = newOtp.length; i < otp.length; i++) {
        newOtp.push("");
      }
    }

    setOtp(newOtp); // Update the OTP state with the new values

    // Focus the next input box after the last pasted digit, or the last input box if all were filled
    const nextIndex = newOtp.findIndex(
      (digit, index) => digit === "" && index < otp.length
    );
    if (nextIndex !== -1) {
      inputRefs.current[nextIndex].current.focus();
    } else {
      inputRefs.current[otp.length - 1].current.focus();
    }
  };

  const handleVerify = async () => {
    showLoaderAndDisableScroll();

    try {
      const verificationData = {
        email: location.state.emailOrPhone,

        passwordCode: parseInt(otp.join("")),
      };

      console.log("Verification Data:", verificationData);
      console.log("Location State:", location.state.emailOrPhone);

      const response = await axios.post(
        "http://localhost:3000/pwdCodeVerify",
        verificationData
      );

      console.log("Verification Response:", response.data);

      if ((response.code = 200)) {
        toast.success("OTP verified successfully");

        navigate("/verifyemailcreateaccount", {
          state: location.state.emailOrPhone,
        });
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Verification Error:", error);

      if (error.response) {
        console.error("Response Data:", error.response.data);
      } else {
        console.error("No response received");
      }

      toast.error("Error verifying OTP");
    } finally {
      hideLoader();
    }
  };
  const handleResendpwdOTP = async () => {
    try {
      const response = await axios.post("http://localhost:3000/resendPwdOtp", {
        email,
      });

      if (response.status === 200) {
        toast.success("OTP resent successfully!");
        setTimer(60); // Reset the timer
      } else {
        console.log("Resend OTP failed with status:", response.status);
        toast.error("Resend OTP failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Error resending OTP. Please try again.");
    }
  };
  useEffect(() => {
    const updateTimer = () => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    };
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, []);

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
      <div className="flex w-full flex-col items-stretch px-6">
        <div className="self-center flex items-center justify-between gap-2">
          <div className="bg-black self-stretch flex w-[124px] shrink-0 h-[35px] flex-col rounded-2xl" />
        </div>

        <div className="text-white text-3xl font-medium mt-11">
          Verification
        </div>
        <div className="text-white text-sm leading-5 mt-6">
          Enter the code we have sent you on your
          <br />
          mail id: <span style={{ fontWeight: "bold" }}>{email}</span>
        </div>
        <div className="text-white text-center text-sm leading-5 mt-16">
          Enter Verification Code
        </div>
        <div className="flex justify-center mt-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-12 h-12 bg-transparent text-gray-400 rounded-lg outline-none text-center mx-2 border border-gray-600"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={inputRefs.current[index]}
            />
          ))}
        </div>
        <div className="items-stretch flex justify-between gap-5 text-sm text-white text-center mt-3">
          <div className="leading-[154%">{timer}s</div>
          <button
            className={`leading-[154%] ${
              timer > 0 ? "text-gray-500" : "text-white underline"
            } cursor-${timer > 0 ? "default" : "pointer"}`}
            disabled={timer > 0}
            onClick={handleResendpwdOTP}
          >
            Resend OTP
          </button>
        </div>
        <div className="bg-rose-600 self-center flex w-full max-w-[315px] flex-col justify-center items-stretch mt-20 p-px rounded">
          <button
            className="text-white text-center text-base font-semibold leading-5 z-10 justify-center items-center px-16 py-4 rounded"
            onClick={handleVerify}
          >
            Verify
          </button>
        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/10ed462f95f4563af4793ed8638d1b4950c88a589cf696c69ac838eb088f390b?"
        className="aspect-[1.43] object-contain object-center w-full mt-16"
      />
    </div>
  );
};

export default Verification;
