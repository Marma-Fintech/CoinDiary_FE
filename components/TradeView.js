// import React, { useState } from "react";

// const TradeView = () => {
//   const [showLoader, setShowLoader] = useState(true);

//   const hideLoader = () => {
//     setShowLoader(false);
//     document.body.style.overflow = "visible";
//   };
//   const showLoaderAndDisableScroll = () => {
//     setShowLoader(true);
//     document.body.style.overflow = "hidden";
//   };
//   return (
//     <div>
//       <div
//         className={`bg-black flex max-w-[480px] w-full  justify-center items-stretch mx-auto ${
//           showLoader ? " h-screen overflow-hidden" : ""
//         }`}
//       ></div>
//     </div>
//   );
// };

// export default TradeView;

import React, { useState, useEffect } from "react";

const TradeView = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setShowLoader(false);
    document.body.style.overflow = "visible";
  }, []);

  return (
    <div className="bg-black flex  justify-center items-center mx-auto h-screen">
      {!showLoader ? (
        <iframe
          src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_12e5d&symbol=BINANCE:solUSDT&interval=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=MA%40tv-basicstudies&theme=light&style=1&timezone=Etc/UTC&withdateranges=1&hide_side_toolbar=0&hide_top_toolbar=0&show_popup_button=1&popup_width=1000&popup_height=650&locale=en&utm_source=www.tradingview.com&utm_medium=widget_new&utm_campaign=chart&utm_term=BINANCE:BTCUSDT/"
          style={{ width: "100%", height: "100%" }}
        ></iframe>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TradeView;
