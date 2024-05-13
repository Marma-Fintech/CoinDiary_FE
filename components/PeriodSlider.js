import React, { useState } from "react";

const PeriodSlider = () => {
  const [showLoader, setShowLoader] = useState(true);
  const hideLoader = () => {
    setShowLoader(false);
    document.body.style.overflow = "visible";
  };
  const showLoaderAndDisableScroll = () => {
    setShowLoader(true);
    document.body.style.overflow = "hidden";
  };
  return (
    <div>
      <div
        className={`bg-black flex max-w-[480px] w-full  justify-center items-stretch mx-auto ${
          showLoader ? " h-screen overflow-hidden" : ""
        }`}
      >
        <div className="flex flex-col items-center pt-3 mx-auto w-full font-semibold text-center text-white   max-w-[480px]">
          <div className="flex gap-2 justify-between items-center px-5 text-lg tracking-tight leading-5">
            <div className="self-stretch  rounded-2xl h-[35px] w-[124px]" />
          </div>
          <div className="flex gap-5 justify-between pr-5 mt-3 w-full text-sm leading-5 max-w-[336px] text-neutral-600">
            <button className={` text-gray-600 ml-[100%]  `}>Skip</button>
          </div>
          <div className={` text-white mt-10 text-2xl `}>
            How long have been in the market?
          </div>
          <div className={`mt-3.5 text-xl text-zinc-500 `}>
            1 year -5+ years
          </div>
          <div className="flex flex-col justify-center text-xs mt-20 leading-5 text-white ">
            <div className="flex gap-1.5 items-start px-10 py-4 shadow backdrop-blur-[4.900000095367432px] bg-neutral-900 rounded-[52px]">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/06a1b719b85f046cc9d62a9e619d0abf5cdaa2d3238eb4da4dd02296f426b111?apiKey=a428c5db03d046848dd140902f0be6ff&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/06a1b719b85f046cc9d62a9e619d0abf5cdaa2d3238eb4da4dd02296f426b111?apiKey=a428c5db03d046848dd140902f0be6ff&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/06a1b719b85f046cc9d62a9e619d0abf5cdaa2d3238eb4da4dd02296f426b111?apiKey=a428c5db03d046848dd140902f0be6ff&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/06a1b719b85f046cc9d62a9e619d0abf5cdaa2d3238eb4da4dd02296f426b111?apiKey=a428c5db03d046848dd140902f0be6ff&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/06a1b719b85f046cc9d62a9e619d0abf5cdaa2d3238eb4da4dd02296f426b111?apiKey=a428c5db03d046848dd140902f0be6ff&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/06a1b719b85f046cc9d62a9e619d0abf5cdaa2d3238eb4da4dd02296f426b111?apiKey=a428c5db03d046848dd140902f0be6ff&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/06a1b719b85f046cc9d62a9e619d0abf5cdaa2d3238eb4da4dd02296f426b111?apiKey=a428c5db03d046848dd140902f0be6ff&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/06a1b719b85f046cc9d62a9e619d0abf5cdaa2d3238eb4da4dd02296f426b111?apiKey=a428c5db03d046848dd140902f0be6ff&"
                className="shrink-0 self-start w-8 shadow-sm aspect-square"
              />
              <div className="my-auto text-lg">Newbie </div>
            </div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/207f9fdd31f26ab179bb00746711b36516eeb57895a360a23d79f0951f91f8b3?apiKey=a428c5db03d046848dd140902f0be6ff&"
            className="w-full mt-10 shadow-sm aspect-[1.54] backdrop-blur-[4.900000095367432px] fill-[radial-gradient(638.9%_89.91%_at_51.82%_38.19%,#ED213A_0%,#D33F51_100%)] max-w-[40px]"
          />
        </div>
      </div>
    </div>
  );
};

export default PeriodSlider;
