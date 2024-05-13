import React, { useState } from "react";
import { FaRegSun, FaMoon } from "react-icons/fa";
import { useTheme } from "./ThemeContext";
import { text } from "@fortawesome/fontawesome-svg-core";

const GetStarted = () => {
  const [showLoader, setShowLoader] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState("dark");

  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:3000/auth?provider=google";
  };

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
  const backgroundColorClass = theme === "dark" ? "bg-black" : "bg-white";
  const textColorClass = theme === "dark" ? "text-white" : "text-black";
  const borderClass = theme === "light" ? "border-2 border-red-900" : "";
  const buttonColorClass = theme === "dark" ? "bg-rose-600" : "bg-red-900";
  const buttonGoogle = theme === "dark" ? "bg-neutral-900" : "bg-neutral-9000";
  const loginButton = theme === "dark" ? "text-white" : "text-blue-900";

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

      <div
        className={`flex-col stroke-[0.706px] stroke-white stroke-opacity-40 overflow-hidden relative flex aspect-[0.4612676056338028] w-full pt-3 px-5`}
      >
        {/* <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/417a461d305adbc5898edce41e1bd7814aa99c36faede765e8cb5a107a773765?"
          className="absolute h-full w-full object-cover object-center inset-0"
        /> */}
        {/* <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccb253bd13271cdc34d1e2c099bff70b5600893f6562d026a323027cbce2e590?apiKey=a428c5db03d046848dd140902f0be6ff&"
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

        <img
          loading="lazy"
          src={theme === "dark" ? darkModeImageUrl : lightModeImageUrl}
          className="aspect-[0.91] object-contain object-center w-[83px] overflow-hidden self-center max-w-full mt-48"
        />
        {/* Your other component content */}

        <div
          className={`relative text-black text-center text-2xl font-semibold self-center whitespace-nowrap mt-7$ ${textColorClass}`}
        >
          Welcome to CoinDiary
        </div>
        <div
          className={`relative text-black text-center text-sm leading-5 mt-1.5 ${textColorClass}`}
        >
          Get fast and accurate NEWS on every update.
        </div>
        <div className="relative items-stretch self-center flex w-full max-w-[318px] flex-col mt-16 pt-0.5 pb-12 px-0.5">
          <div
            className={`bg-rose-600 flex flex-col justify-center items-stretch mb-24 p-px rounded ${buttonColorClass}`}
          >
            <a
              href="/createaccount"
              className={`text-white text-center text-base font-semibold leading-5 whitespace-nowrap z-[1] justify-center items-center px-16 py-5 rounded ${textColorClass}`}
            >
              Create Account
            </a>
          </div>
        </div>
        <div className="flex-col relative overflow-hidden self-stretch flex aspect-[1.4290909090909092] w-full items-center pb-12 px-10">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f6cb4bd898fef79bbacccd1b7927270bcbee5d1b3991d9440b74fe6d17b32aa?"
            className="absolute h-full w-full object-cover object-center inset-0"
          />
          <div
            className={`relative bg-neutral-900 bg-opacity-80 self-stretch flex items-stretch  gap-5 px-5 py-3.5 rounded-lg ${buttonGoogle} `}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/96fc959e569930b8009f9b93c995be461cfb7d080c0e9933d6b5503f528de275?"
              className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
            />
            <button
              onClick={handleGoogleAuth}
              className={`text-white  text-base ml-10 font-semibold leading-5 my-auto`}
            >
              Continue with Google
            </button>
          </div>
          <div
            className={`relative bg-neutral-900 bg-opacity-80 self-stretch flex items-stretch  gap-5 mt-4 px-5 py-3.5 rounded-lg ${buttonGoogle}`}
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9c50cf1ed70f0454514a1adc96269766da691a2dd7ca4073ce4e956597a94f5a?"
              className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
            />
            <button className="text-white ml-10 text-base font-semibold leading-5 my-auto">
              Continue with Apple
            </button>
          </div>
          <a
            href="/login"
            className={`relative text-black  text-center text-base font-black leading-5 whitespace-nowrap mt-4 mb-11 ${loginButton}`}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
