import axios from "axios";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Gender = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [selectedGender, setSelectedGender] = useState("");
  const navigate = useNavigate();

  const hideLoader = () => {
    setShowLoader(false);
    document.body.style.overflow = "visible";
  };

  const showLoaderAndDisableScroll = () => {
    setShowLoader(true);
    document.body.style.overflow = "hidden";
  };
  const handleSubmitGender = async () => {
    if (!selectedGender) {
      toast.error("Please select a gender");
      return;
    }

    try {
      const token = localStorage.getItem("tkn");
      const response = await axios.put(
        "http://localhost:3000/editUser",
        { gender: selectedGender }, // Send the selected gender as part of the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Ensure correct Content-Type for JSON payload
          },
        }
      );

      if (response.data) {
        toast.success("Gender updated successfully");
        navigate("/profilepic"); // Navigate to the profile picture screen
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update gender.");
    }
  };

  return (
    <div>
      <div
        className={`bg-black flex max-w-[480px] w-full flex-col justify-center items-stretch mx-auto ${
          showLoader ? " h-screen overflow-hidden" : ""
        }`}
        style={{ position: "relative" }} // Ensure the border is visible by applying relative positioning
      >
        <div className="flex relative gap-5 mt-[-50px] justify-end self-stretch text-xs tracking-wider whitespace-nowrap text-neutral-400">
          <button className="justify-center mr-4 mt-2 px-10 py-3 bg-black rounded-lg border border-solid border-neutral-400">
            Skip
          </button>
        </div>
        <div className="flex overflow-hidden relative flex-col items-center self-stretch px-5 pt-5 pb-20 mt-2 w-full text-base font-semibold text-white aspect-[0.76] stroke-[0.706px] stroke-white stroke-opacity-40">
          {/* <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/10cbed160434bcd06395a89c6e92d255abad9f02b94e6ca5ffc045180666a2c0?apiKey=a428c5db03d046848dd140902f0be6ff&"
            className="object-cover absolute inset-0 size-full"
          /> */}

          <div className="relative text-white mt-[55px] text-2xl text-center">
            Gender
          </div>
          <div className="relative mt-5 text-sm text-center text-zinc-500">
            Select Your Gender
          </div>
          <div
            onClick={() => setSelectedGender("Male")}
            className={`rounded-lg text-center w-[50%] h-[30%] mt-[55px] cursor-pointer ${
              selectedGender === "Male" ? "bg-blue-500" : "bg-yellow-200"
            }`}
          >
            <h1 className="mt-5 text-black">Male</h1>
          </div>
          <div
            onClick={() => setSelectedGender("Female")}
            className={`rounded-lg text-center w-[50%] h-[30%] mt-[55px] cursor-pointer ${
              selectedGender === "Female" ? "bg-blue-500" : "bg-yellow-200"
            }`}
          >
            <h1 className="mt-5 text-black">Female</h1>
          </div>
          <div
            onClick={() => setSelectedGender("Others")}
            className={`rounded-lg text-center w-[50%] h-[30%] mt-[55px] cursor-pointer ${
              selectedGender === "Others" ? "bg-blue-500" : "bg-yellow-200"
            }`}
          >
            <h1 className="mt-5 text-black">Others</h1>
          </div>
        </div>
        <button
          onClick={handleSubmitGender}
          className="ml-16 px-12 py-5 mt-18 w-full text-base font-semibold tracking-wide leading-6 text-center text-white bg-rose-600 whitespace-nowrap rounded-xl max-w-[345px]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Gender;
