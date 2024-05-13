import React, { useEffect, useState } from "react";
import gifFile from "../videos/order-copy.gif";
import { useTheme } from "./ThemeContext";
import { FaRegSun, FaMoon } from "react-icons/fa";

const Walkthrough3 = () => {
  const [showLoader, setShowLoader] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState("dark");
  const hideLoader = () => {
    setShowLoader(false);
    document.body.style.overflow = "visible";
  };

  const showLoaderAndDisableScroll = () => {
    setShowLoader(true);
    document.body.style.overflow = "hidden";
  };
  // const toggleTheme = () => {
  //   setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  //   document.body.style.overflow = theme === "dark" ? "visible" : "hidden";
  // };
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const gifImage = new Image();
    gifImage.src = gifFile;
    const iframeCode =
      '<iframe src="https://my.spline.design/ordercopy-41853970f3678c1b8cfa781c427e89fa/" width="350%" height="600px" frameborder="0" allowfullscreen loading="lazy"></iframe>';
    document.getElementById("splineContainer").innerHTML = iframeCode;
  }, []);

  const backgroundColorClass = theme === "dark" ? "bg-black" : "bg-white";
  const textColorClass = theme === "dark" ? "text-white" : "text-black";
  const borderClass = theme === "light" ? "border-2 border-red-900" : "";
  const buttonColorClass = theme === "dark" ? "bg-rose-600" : "bg-red-700";
  const skipColorClass = theme === "dark" ? "text-neutral-500" : "text-red-700";

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
        className={`flex-col overflow-hidden relative flex aspect-[0.9825] w-full items-stretch mt-1 pl-14 pr-9 pt-2 pb-12`}
      >
        <span className="relative flex items-start justify-between gap-2 mb-60">
          <div
            id="splineContainer"
            style={{ marginLeft: "-335px", marginTop: "-20px" }}
          />

          <div
            className={`self-stretch flex w-[124px] shrink-0 h-[35px] flex-col rounded-2xl  ${
              theme === "dark"
            }`}
          />
        </span>
      </div>

      <span className={`flex w-full flex-col mt-16 px-9 ${textColorClass}`}>
        <div className="justify-center text-3xl self-stretch">
          Let's tailor Coindiary <br />
          to your liking{" "}
        </div>
        <div className="text-base leading-5 self-stretch mt-2.5">
          Tell us your interests in cryptocurrencies and investment styles for a
          personalized CoinDiary experience."
        </div>
        <div className="justify-center items-stretch flex w-[55px] max-w-full gap-3.5 mt-16 self-start ml-4">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b79a25e57fb7835fbe556ff0a12a4c1ad1d22ae12abf847a7d34d368a83a019?"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b79a25e57fb7835fbe556ff0a12a4c1ad1d22ae12abf847a7d34d368a83a019?"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b79a25e57fb7835fbe556ff0a12a4c1ad1d22ae12abf847a7d34d368a83a019?"
          />
          <div className="backdrop-blur-[2px] flex shrink-0 h-[9px] flex-col flex-1 rounded-[50%]" />
          <div className="backdrop-blur-[2px] flex shrink-0 h-[9px] flex-col flex-1 rounded-[50%]" />
        </div>
        <div
          className={`bg-rose-600 self-stretch flex flex-col justify-center items-stretch mt-10 p-px rounded ${buttonColorClass}`}
        >
          <div className="z-[1] flex flex-col justify-center items-center px-16 py-3.5 rounded">
            <span className="flex w-[61px] max-w-full items-center gap-2 px-px">
              <div>
                <a
                  href="/getstarted"
                  className="text-white text-center text-base font-semibold  leading-5 my-auto"
                >
                  Next
                </a>
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e912e328f79bf11c206610024f6c466b35a66380a935e36e6986b8b6663593e8?"
                className="aspect-square object-contain object-center w-full overflow-hidden shrink-0 flex-1"
              />
            </span>
          </div>
        </div>
        <div
          className={`text-neutral-500  text-center text-sm mr-5 leading-5 self-center whitespace-nowrap mt-4 mb-3 ${skipColorClass}`}
        >
          <a href="/getstarted">Skip</a>
        </div>
      </span>
    </div>
  );
};

export default Walkthrough3;
