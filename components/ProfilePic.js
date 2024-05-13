import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaRegSun, FaMoon } from "react-icons/fa";
import { useTheme } from "./ThemeContext";
import male1 from "../assets/male 1 (1).png";
import male2 from "../assets/male 1.png";
import male3 from "../assets/Web3 Avatar (1).png";
import male4 from "../assets/Web3 Avatar (2).png";
import female1 from "../assets/Web3 Avatar (3).png";
import female2 from "../assets/Web3 Avatar (4).png";
import female3 from "../assets/Web3 Avatar (5).png";
import female4 from "../assets/Web3 Avatar.png";
import male5 from "../assets/male 1 (1).png";
import male6 from "../assets/male 1.png";
import male7 from "../assets/Web3 Avatar (1).png";
import male8 from "../assets/Web3 Avatar (2).png";
import female5 from "../assets/Web3 Avatar (3).png";
import female6 from "../assets/Web3 Avatar (4).png";
import female7 from "../assets/Web3 Avatar (5).png";
import female8 from "../assets/Web3 Avatar.png";

const ProfilePic = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState("dark");
  const navigate = useNavigate();

  const avatars = [
    male1,
    male2,
    male3,
    male4,
    female1,
    female2,
    female3,
    female4,
    male5,
    male6,
    male7,
    male8,
    female5,
    female6,
    female7,
    female8,
  ];

  const hideLoader = () => {
    setShowLoader(false);
    document.body.style.overflow = "visible";
  };
  const showLoaderAndDisableScroll = () => {
    setShowLoader(true);
    document.body.style.overflow = "hidden";
  };
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };
  // Simplifying the functions for brevity
  const handleProfileImageClick = () => {
    // Directly use the file input reference
    document.getElementById("profileImageInput").click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Directly use the base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (avatarId) => {
    setProfileImage(avatarId); // Store the identifier/path
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const formData = new FormData();
  //     const fileInput = document.getElementById("profileImageInput");
  //     if (fileInput && fileInput.files[0]) {
  //       formData.append("image", fileInput.files[0]);
  //     }

  //     // // Check if profileImage is a File object (uploaded image) or a string (selected avatar)
  //     // if (profileImage instanceof File) {
  //     //   formData.append("image", profileImage);
  //     // } else if (typeof profileImage === "string") {
  //     //   // For a selected avatar, you might need to adjust your backend to handle a URL or path
  //     //   formData.append("avatar", profileImage);
  //     // }

  //     try {
  //       const token = localStorage.getItem("tkn");
  //       const response = await axios.put(
  //         "http://localhost:3000/editUser",
  //         formData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       if (response.status === 200) {
  //         toast.success("Profile updated successfully");
  //         navigate("/nextPage");
  //       } else {
  //         toast.error("Failed to update profile");
  //       }
  //     } catch (error) {
  //       console.error("Error updating user:", error);
  //       toast.error("Failed to update profile. Please try again.");
  //     }
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Determine whether profileImage is a path/identifier or a File object
    if (typeof profileImage === "string") {
      formData.append("image", profileImage);
    } else if (profileImage instanceof File) {
      formData.append("image", profileImage, profileImage.name);
    }

    try {
      const token = localStorage.getItem("tkn");
      const response = await axios.put(
        "http://localhost:3000/editUser",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully");
        navigate("/interest");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const backgroundColorClass = theme === "dark" ? "bg-black" : "bg-white";
  const textColorClass = theme === "dark" ? "text-white" : "text-black";
  const textInputColorClass = theme === "dark" ? "text-gray-400" : "text-black";
  const inputBgcolor = theme === "dark" ? "bg-black" : "bg-gray-200";
  const borderClass = theme === "light" ? "border border-red-900" : "";
  const borderClassProfile = theme === "dark" ? "border border-red-900" : "";
  const buttonColorClass = theme === "dark" ? "bg-rose-600" : "bg-red-800";

  return (
    <div
      className={`${backgroundColorClass} ${borderClass}  flex max-w-[480px] w-full flex-col justify-center items-stretch mx-auto ${
        showLoader ? " h-screen overflow-hidden" : ""
      }`}
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
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center pt-3 mx-auto w-full font-semibold text-center text-white   max-w-[480px]">
          <div className="flex gap-2 justify-between items-center px-5 text-lg tracking-tight leading-5">
            <div className="self-stretch  rounded-2xl h-[35px] w-[124px]" />
          </div>
          <div className="flex gap-5 justify-between pr-5 mt-3 w-full text-sm leading-5 max-w-[336px] text-neutral-600">
            <button
              className={` text-gray-600 ml-[100%] mt-12 ${textColorClass}`}
            >
              Skip
            </button>
          </div>
          <div className={` text-black mt-36 text-2xl ${textColorClass}`}>
            Add Profile Photo
          </div>
          <div className={`mt-3.5 text-xs text-zinc-500 ${textColorClass}`}>
            Add a profile photo so that your friends know it’s you.
          </div>
          <div className="self-stretch  mt-9 w-full aspect-[0.61] stroke-[0.706px] stroke-white stroke-opacity-40">
            <div className="self-stretch ml-[187px]   ">
              <input
                type="file"
                id="profileImageInput"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />

              <div
                className={`border h-28 mt-[10px] rounded-full shadow aspect-[0.94] backdrop-blur-[4.900000095367432px] max-w-[106px] w-[106px] ${borderClassProfile}`}
              >
                {profileImage && (
                  <img
                    src={profileImage}
                    className="w-full h-full object-cover rounded-full"
                    alt="Profile"
                    // onChange={handleImageChange}
                  />
                )}
              </div>
              <div
                className={` ${textColorClass}   flex gap-2 ml-[-29px] mt-[-12px] mr-[50%] px-4 py-1.5 text-sm font-medium leading-5 text-black whitespace-nowrap rounded-lg border border-yellow-500  shadow-md backdrop-blur-[10px] border-[color:var(--Dark-Mode-Container-Border,rgba(255,255,255,0.07))]`}
              >
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6dfe2c01ce69d73e1b4e694da81d0222d00b162d7d8057de55a6c90bbbc3334f?apiKey=a428c5db03d046848dd140902f0be6ff&"
                  className={`my-auto  w-4 aspect-square   `}
                />
                <button
                  onClick={handleProfileImageClick}
                  type="button"
                  className="ml-2"
                >
                  Add Photo
                </button>
              </div>
            </div>
            <div className="mt-5">
              <p>(Or)</p>
              <h1 className="mt-2">Select Avatar</h1>
              <div className="grid grid-cols-4 gap-4 mt-4">
                {avatars.map((avatar, index) => (
                  <div
                    key={index}
                    className="avatar-wrapper cursor-pointer"
                    onClick={() => handleAvatarSelect(avatar)}
                  >
                    <img
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className="ml-5"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`text-black text-left text-sm leading-5 ml-[68px] mt-16 relative ${textInputColorClass}`}
            ></div>
            <div className="relative items-stretch ml-[16%]  self-center flex w-full max-w-[318px] flex-col  pt-0.5 pb-12 px-0.5"></div>
            <div className="flex-col relative overflow-hidden self-stretch flex aspect-[1.4290909090909092] w-full items-center pb-12 px-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f6cb4bd898fef79bbacccd1b7927270bcbee5d1b3991d9440b74fe6d17b32aa?"
                className="absolute h-full w-full object-cover object-center inset-0 mt-32 "
              />
              <div className="bg-rose-600 flex flex-col w-[80%]  justify-center items-stretch mb-24 p-px rounded">
                <button
                  type="submit"
                  className="text-white text-center text-base font-semibold leading-5 whitespace-nowrap z-[1] justify-center items-center px-16 py-5 rounded"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePic;
