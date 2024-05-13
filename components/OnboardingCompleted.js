import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegSun, FaMoon } from "react-icons/fa";
import { useTheme } from "./ThemeContext";

const OnboardingCompleted = () => {
  const [showLoader, setShowLoader] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState("dark");
  const navigate = useNavigate();
  const location = useLocation();

  // Extracting username and profileImage from location state
  const { username, profileImage } = location.state || {};

  // Logging username and profileImage
  console.log("Username:", username);
  console.log("Profile Image:", profileImage);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };
  useEffect(() => {
    // Your effect logic here
  }, [username, profileImage]);

  const hideLoader = () => {
    setShowLoader(false);
    document.body.style.overflow = "visible";
  };

  const showLoaderAndDisableScroll = () => {
    setShowLoader(true);
    document.body.style.overflow = "hidden";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/home", { state: { username, profileImage } });
  };
  //Coindiary logo
  const darkModeImageUrl =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/7007929039544c69e909f8a315469bc846aacc21cd343515a109541435b3dbc1?";
  const lightModeImageUrl =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/6b45459d3eb4a6f5da2c42cb6110951cf7098ab23e531ff8827700ffa01b2697?apiKey=a428c5db03d046848dd140902f0be6ff&";

  //box-lineshade
  const lineShadeUrlDark =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/417a461d305adbc5898edce41e1bd7814aa99c36faede765e8cb5a107a773765?";
  const lineShadeUrlLight =
    "https://cdn.builder.io/api/v1/image/assets/TEMP/ccb253bd13271cdc34d1e2c099bff70b5600893f6562d026a323027cbce2e590?apiKey=a428c5db03d046848dd140902f0be6ff&";

  const backgroundColorClass = theme === "dark" ? "bg-black" : "bg-white";
  const textColorClass = theme === "dark" ? "text-white" : "text-black";
  const borderClass = theme === "light" ? "border-2 border-red-900" : "";
  const buttonColorClass = theme === "dark" ? "bg-rose-600" : "bg-red-900";
  const buttonGoogle = theme === "dark" ? "bg-neutral-900" : "bg-neutral-9000";
  const loginButton = theme === "dark" ? "text-white" : "text-blue-900";

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
      <div className="flex-col stroke-[0.706px] stroke-white stroke-opacity-40 overflow-hidden relative flex aspect-[0.4612676056338028] w-full pt-3 px-5">
        {/* <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/417a461d305adbc5898edce41e1bd7814aa99c36faede765e8cb5a107a773765?"
          className="absolute h-full w-full object-cover object-center inset-0"
        /> */}
        <img
          loading="lazy"
          src={theme === "dark" ? lineShadeUrlDark : lineShadeUrlLight}
          className="absolute h-full w-full object-cover object-center inset-0"
        />
        <div className="relative self-center flex items-start justify-between gap-2">
          <div className=" self-stretch flex w-[124px] shrink-0 h-[35px] flex-col rounded-2xl" />
        </div>

        {/* <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7007929039544c69e909f8a315469bc846aacc21cd343515a109541435b3dbc1?"
          className="aspect-[0.91] object-contain object-center w-[83px] overflow-hidden self-center max-w-full mt-48"
        /> */}
        <img
          loading="lazy"
          src={theme === "dark" ? darkModeImageUrl : lightModeImageUrl}
          className="aspect-[0.91] object-contain object-center w-[120px] overflow-hidden self-center max-w-full mt-48"
        />
        <div
          className={`relative text-black text-center text-xl  font-semibold self-center whitespace-nowrap mt-28 ${textColorClass}`}
        >
          Onboarding Successfully Completed
        </div>

        <div className="relative items-stretch self-center flex w-full max-w-[318px] flex-col  pt-0.5 pb-12 px-0.5">
          <div className="bg-rose-600 flex flex-col mt-20 justify-center items-stretch mb-24 p-px rounded">
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                className="text-white text-center ml-[22%] text-base font-semibold leading-5 whitespace-nowrap z-[1] justify-center items-center px-16 py-5 rounded"
              >
                Done
              </button>
            </form>
          </div>
        </div>
        <div className="flex-col relative overflow-hidden self-stretch flex aspect-[1.4290909090909092] w-full items-center pb-12 px-10">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f6cb4bd898fef79bbacccd1b7927270bcbee5d1b3991d9440b74fe6d17b32aa?"
            className="absolute h-full w-full object-cover object-center inset-0"
          />
        </div>
      </div>
    </div>
  );
};

export default OnboardingCompleted;
