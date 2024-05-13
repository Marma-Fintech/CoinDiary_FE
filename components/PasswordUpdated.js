import React, { useState } from "react";

const PasswordUpdated = () => {
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
    <div
      className={`bg-black flex max-w-[480px] w-full flex-col justify-center items-stretch mx-auto ${
        showLoader ? " h-screen overflow-hidden" : ""
      }`}
    >
      <div className="flex-col stroke-[0.706px] stroke-white stroke-opacity-40 overflow-hidden relative flex aspect-[0.4612676056338028] w-full pt-3 px-5">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/417a461d305adbc5898edce41e1bd7814aa99c36faede765e8cb5a107a773765?"
          className="absolute h-full w-full object-cover object-center inset-0"
        />
        <div className="relative self-center flex items-start justify-between gap-2">
          <div className="bg-black self-stretch flex w-[124px] shrink-0 h-[35px] flex-col rounded-2xl" />
        </div>

        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7007929039544c69e909f8a315469bc846aacc21cd343515a109541435b3dbc1?"
          className="aspect-[0.91] object-contain object-center w-[83px] overflow-hidden self-center max-w-full mt-48"
        />
        <div className="relative text-white text-center text-xl  font-semibold self-center whitespace-nowrap mt-28">
          Successfully Updated Your Password
        </div>

        <div className="relative items-stretch self-center flex w-full max-w-[318px] flex-col  pt-0.5 pb-12 px-0.5">
          <div className="bg-rose-600 flex flex-col mt-20 justify-center items-stretch mb-24 p-px rounded">
            <a
              href="/login"
              className="text-white text-center text-base font-semibold leading-5 whitespace-nowrap z-[1] justify-center items-center px-16 py-5 rounded"
            >
              Login
            </a>
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

export default PasswordUpdated;
