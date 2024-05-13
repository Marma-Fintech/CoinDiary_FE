import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoaderCoindiary.css';

const LoaderCoindiary = () => {
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();

  // Function to hide the loader and enable scrolling
  const hideLoader = () => {
    setShowLoader(false);
    document.body.style.overflow = 'visible';
  };

  useEffect(() => {
    // Simulate loading animation with a delay
    const loadingTimeout = setTimeout(() => {
      // After the delay, hide the loader and navigate to Walkthrough1
      hideLoader();
      navigate('walkthrough1'); // Replace '/walkthrough1' with the actual route of your Walkthrough1 screen
    }, 2000); // Adjust the delay time (in milliseconds) as needed

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(loadingTimeout);
  }, [navigate]);

  return (
    <div
      className={`bg-black flex max-w-[480px] w-full flex-col justify-center items-stretch mx-auto ${
        showLoader ? ' h-screen overflow-hidden' : ''
      }`}
    >
      <div className="flex-col stroke-[0.706px] stroke-white stroke-opacity-40 overflow-hidden relative flex aspect-[0.4612676056338028] w-full justify-center items-center px-16 py-12">
        {/* Replace the loading animation styles with your own */}
       
        <div className="loading-rectangle">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f99a7586c30d8e58585b8faa48d8458d733cc53feb6281f40d109478bf34872?"
          className="absolute h-full w-full object-cover object-center inset-0"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/63fbe72e43a261684fa368a75ca72335402f462798fcfbe651ac35c2a65c1923?"
          className="aspect-[1.39] object-contain object-center w-[163px] overflow-hidden max-w-full mt-80 mb-60"
        />
        {showLoader && (
          <div className="loading-bar"></div>
        )}
        </div>
      </div>
    </div>
  );
};

export default LoaderCoindiary;
