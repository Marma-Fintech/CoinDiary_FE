import React, { useState } from "react";

const Interest = () => {
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
        className={`bg-black flex max-w-[480px] w-full flex-col justify-center items-stretch mx-auto ${
          showLoader ? " h-screen overflow-hidden" : ""
        }`}
      >
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4f4fa5d8ec5fdf7548f4dd4227d99275d19d4d5ed5026ed9a6d4620d5f6d9e23?apiKey=a428c5db03d046848dd140902f0be6ff&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f4fa5d8ec5fdf7548f4dd4227d99275d19d4d5ed5026ed9a6d4620d5f6d9e23?apiKey=a428c5db03d046848dd140902f0be6ff&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f4fa5d8ec5fdf7548f4dd4227d99275d19d4d5ed5026ed9a6d4620d5f6d9e23?apiKey=a428c5db03d046848dd140902f0be6ff&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f4fa5d8ec5fdf7548f4dd4227d99275d19d4d5ed5026ed9a6d4620d5f6d9e23?apiKey=a428c5db03d046848dd140902f0be6ff&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f4fa5d8ec5fdf7548f4dd4227d99275d19d4d5ed5026ed9a6d4620d5f6d9e23?apiKey=a428c5db03d046848dd140902f0be6ff&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f4fa5d8ec5fdf7548f4dd4227d99275d19d4d5ed5026ed9a6d4620d5f6d9e23?apiKey=a428c5db03d046848dd140902f0be6ff&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f4fa5d8ec5fdf7548f4dd4227d99275d19d4d5ed5026ed9a6d4620d5f6d9e23?apiKey=a428c5db03d046848dd140902f0be6ff&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4f4fa5d8ec5fdf7548f4dd4227d99275d19d4d5ed5026ed9a6d4620d5f6d9e23?apiKey=a428c5db03d046848dd140902f0be6ff&"
          className="self-stretch w-full aspect-[0.92] stroke-[0.706px] stroke-black stroke-opacity-60"
        />
        <div className="flex z-10 gap-5 justify-between mt-6 w-full text-xs font-semibold tracking-wider text-center text-white uppercase max-w-[345px]">
          <div className="flex flex-col ml-7 px-20 py-7 bg-black rounded-xl border-solid border-[3px] border-zinc-800">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f1cfe818960313d5b299d48e567a0e1076fa797ce3ab6329b4b6bf2cf1f2bc7?apiKey=a428c5db03d046848dd140902f0be6ff&"
              className="self-center aspect-[0.79] w-[37px]"
            />
            <div className="mt-1.5 ">REAL ESTATE</div>
          </div>
          <div className="flex flex-col  px-8 py-7 bg-black rounded-xl border-solid border-[3px] border-zinc-800">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/edfa86d6f16921691509a1436cf33f11cb2b46237887d341bd690885cd758383?apiKey=a428c5db03d046848dd140902f0be6ff&"
              className="self-center aspect-square w-[45px]"
            />
            <div className="mt-1.5">GENERATIVE AI</div>
          </div>
        </div>

        <div className="flex gap-5 justify-between mt-3"></div>
        <div className="bg-rose-600 flex flex-col w-[80%] ml-10 mt-[120px]  justify-center items-stretch mb-24 p-px rounded">
          <a
            href="/periodslider"
            type="submit"
            className="text-white text-center text-base font-semibold leading-5 whitespace-nowrap z-[1] justify-center items-center px-16 py-5 rounded"
          >
            Next
          </a>
        </div>
      </div>
    </div>
  );
};

export default Interest;
