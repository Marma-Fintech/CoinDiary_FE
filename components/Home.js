// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const Home = () => {
//   const [showLoader, setShowLoader] = useState(true);

//   // const location = useLocation();
//   const navigate = useNavigate();
//   // Destructure state from location
//   // const { state } = location;

//   // Check if location is defined
//   // if (!location || !location.state) {
//   //   return <div>No user information available</div>;
//   // }

//   // if (!state || !state.username || !state.profileImage) {
//   //   return <div>No user information available</div>;
//   // }
//   // const { username, profileImage } = state;

//   const hideLoader = () => {
//     setShowLoader(false);
//     document.body.style.overflow = "visible";
//   };

//   const showLoaderAndDisableScroll = () => {
//     setShowLoader(true);
//     document.body.style.overflow = "hidden";
//   };
//   // Handle sign out
//   const handleSignOut = () => {
//     // Assuming you have a function to clear user session or token
//     // For example, you can clear localStorage or sessionStorage
//     // localStorage.removeItem("token");

//     // Redirect to login page
//     navigate("/login");
//   };

//   const createPost = () => {
//     navigate("/createpost");
//   };

//   return (
//     <div
//       className={`bg-black flex max-w-[480px]  w-full flex-col justify-center items-stretch mx-auto ${
//         showLoader ? " h-screen overflow-hidden" : ""
//       }`}
//     >
//       <div className="flex gap-2 justify-between mt-4 items-center px-12 py-3 text-lg font-semibold tracking-tight leading-5 text-center text-white whitespace-nowrap bg-black">
//         <div className="self-stretch bg-black rounded-2xl h-[35px] w-[124px]" />
//       </div>
//       <div className="flex gap-5 justify-between items-start px-7 py-2 w-full bg-black">
//         <div className="justify-center items-center px-2 text-lg font-semibold leading-6 text-rose-100 capitalize whitespace-nowrap rounded-none border-white border-solid aspect-square border-[1.5px] h-[27px]">
//           C
//         </div>
//         <div className="flex gap-2.5 justify-between  self-stretch px-4 py-1.5 text-xs font-medium leading-5 border-solid bg-neutral-900 bg-opacity-80 border-[1.08px] border-[color:var(--Stoke,rgba(255,255,255,0.40))] rounded-[97px] text-neutral-500">
//           <img
//             loading="lazy"
//             srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d892f9a07e4524ce0a6a620950b745b472de6f43a082210e6baca0f4b41d1044?apiKey=a82e3ca82deb4f85a705f57690a42761&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d892f9a07e4524ce0a6a620950b745b472de6f43a082210e6baca0f4b41d1044?apiKey=a82e3ca82deb4f85a705f57690a42761&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d892f9a07e4524ce0a6a620950b745b472de6f43a082210e6baca0f4b41d1044?apiKey=a82e3ca82deb4f85a705f57690a42761&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d892f9a07e4524ce0a6a620950b745b472de6f43a082210e6baca0f4b41d1044?apiKey=a82e3ca82deb4f85a705f57690a42761&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d892f9a07e4524ce0a6a620950b745b472de6f43a082210e6baca0f4b41d1044?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d892f9a07e4524ce0a6a620950b745b472de6f43a082210e6baca0f4b41d1044?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d892f9a07e4524ce0a6a620950b745b472de6f43a082210e6baca0f4b41d1044?apiKey=a82e3ca82deb4f85a705f57690a42761&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d892f9a07e4524ce0a6a620950b745b472de6f43a082210e6baca0f4b41d1044?apiKey=a82e3ca82deb4f85a705f57690a42761&"
//             className="my-auto w-7 aspect-[2.33]"
//           />
//           <div>
//             <span className="text-rose-600">96%</span> Greed
//           </div>
//         </div>

//         <div className=" border border-yellow-200 rounded-lg w-20 text-center">
//           {/* <img
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/66f7bf4f40a79e6f50afed8cbc9bb25d0c42dff625785a921cff9888fb588e20?apiKey=a82e3ca82deb4f85a705f57690a42761&"
//             alt="Settings"
//             className="w-6 aspect-square cursor-pointer"
//           /> */}
//           <button className="text-blue-600 font-bold " onClick={handleSignOut}>
//             {" "}
//             Signout
//           </button>
//         </div>
//         <button className="text-blue-600 font-bold " onClick={createPost}>
//           {" "}
//           Create Post
//         </button>
//         <div className="relative">
//           <div className="absolute top-4 text-center">
//             <div className="rounded-full ml-8 overflow-hidden w-10 h-10 mx-auto mb-1">
//               {/* <img
//                 // src={state.profileImage}
//                 src={profileImage}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               /> */}
//             </div>
//           </div>
//           {/* <div className="text-white   text-xs ">{username}</div> */}
//         </div>
//       </div>
//       <div className="flex flex-col justify-center mt-5 w-full bg-black">
//         <div className="flex flex-col pt-2 w-full rounded-xl border border-solid bg-blend-luminosity backdrop-blur-[50px] bg-zinc-800 border-[color:var(--windows-stroke-glass-specular,rgba(255,255,255,0.40))]">
//           <div className="flex flex-col ml-7 max-w-full text-xs font-semibold tracking-wider leading-7 text-white uppercase whitespace-nowrap w-[190px]">
//             <div className="flex gap-5 justify-between">
//               <div>Summery</div>
//               <div className="self-start mt-1 rounded-sm border-solid border-[0.2px] border-neutral-100 h-[3px] w-[46px]" />
//             </div>
//             <div className="mt-3.5">Stories</div>
//           </div>
//           <div className="flex gap-4 pr-7 mt-5">
//             <div className="flex flex-col flex-1">
//               <div className="flex overflow-hidden relative flex-col items-center self-center pt-11 pl-11 aspect-square w-[58px]">
//                 <img
//                   loading="lazy"
//                   srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/78d58b03f80e2b813228f3ac0cc485a8925c4965868a36ad75f83f84598808d2?apiKey=a82e3ca82deb4f85a705f57690a42761&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/78d58b03f80e2b813228f3ac0cc485a8925c4965868a36ad75f83f84598808d2?apiKey=a82e3ca82deb4f85a705f57690a42761&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/78d58b03f80e2b813228f3ac0cc485a8925c4965868a36ad75f83f84598808d2?apiKey=a82e3ca82deb4f85a705f57690a42761&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/78d58b03f80e2b813228f3ac0cc485a8925c4965868a36ad75f83f84598808d2?apiKey=a82e3ca82deb4f85a705f57690a42761&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/78d58b03f80e2b813228f3ac0cc485a8925c4965868a36ad75f83f84598808d2?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/78d58b03f80e2b813228f3ac0cc485a8925c4965868a36ad75f83f84598808d2?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/78d58b03f80e2b813228f3ac0cc485a8925c4965868a36ad75f83f84598808d2?apiKey=a82e3ca82deb4f85a705f57690a42761&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/78d58b03f80e2b813228f3ac0cc485a8925c4965868a36ad75f83f84598808d2?apiKey=a82e3ca82deb4f85a705f57690a42761&"
//                   className="object-cover absolute inset-0 size-full"
//                 />
//                 <img
//                   loading="lazy"
//                   src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2999ebcec09832fc08617d876556b6d406d5f0ed8d457c46f60ad8fa4e864cf?apiKey=a82e3ca82deb4f85a705f57690a42761&"
//                   className="w-full aspect-square"
//                 />
//               </div>
//               <div className="mt-4 text-xs leading-4 whitespace-nowrap text-stone-300">
//                 Your story
//               </div>
//             </div>
//             <div className="flex flex-col flex-1 items-center text-xs leading-4 whitespace-nowrap text-stone-300">
//               <img
//                 loading="lazy"
//                 srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/73227bf7e7cb9c587746b11b4b236a9d1240f5c29c993a4865681559974f6474?apiKey=a82e3ca82deb4f85a705f57690a42761&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/73227bf7e7cb9c587746b11b4b236a9d1240f5c29c993a4865681559974f6474?apiKey=a82e3ca82deb4f85a705f57690a42761&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/73227bf7e7cb9c587746b11b4b236a9d1240f5c29c993a4865681559974f6474?apiKey=a82e3ca82deb4f85a705f57690a42761&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/73227bf7e7cb9c587746b11b4b236a9d1240f5c29c993a4865681559974f6474?apiKey=a82e3ca82deb4f85a705f57690a42761&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/73227bf7e7cb9c587746b11b4b236a9d1240f5c29c993a4865681559974f6474?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/73227bf7e7cb9c587746b11b4b236a9d1240f5c29c993a4865681559974f6474?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/73227bf7e7cb9c587746b11b4b236a9d1240f5c29c993a4865681559974f6474?apiKey=a82e3ca82deb4f85a705f57690a42761&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/73227bf7e7cb9c587746b11b4b236a9d1240f5c29c993a4865681559974f6474?apiKey=a82e3ca82deb4f85a705f57690a42761&"
//                 className="aspect-square w-[65px]"
//               />
//               <div className="mt-2.5">USDT</div>
//             </div>
//             <div className="flex flex-col flex-1 items-center text-xs leading-4 whitespace-nowrap text-stone-300">
//               <img
//                 loading="lazy"
//                 srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/903606c8362d061d620e14c001d73ca231508aa65ca4aaf43920478158e84692?apiKey=a82e3ca82deb4f85a705f57690a42761&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/903606c8362d061d620e14c001d73ca231508aa65ca4aaf43920478158e84692?apiKey=a82e3ca82deb4f85a705f57690a42761&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/903606c8362d061d620e14c001d73ca231508aa65ca4aaf43920478158e84692?apiKey=a82e3ca82deb4f85a705f57690a42761&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/903606c8362d061d620e14c001d73ca231508aa65ca4aaf43920478158e84692?apiKey=a82e3ca82deb4f85a705f57690a42761&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/903606c8362d061d620e14c001d73ca231508aa65ca4aaf43920478158e84692?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/903606c8362d061d620e14c001d73ca231508aa65ca4aaf43920478158e84692?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/903606c8362d061d620e14c001d73ca231508aa65ca4aaf43920478158e84692?apiKey=a82e3ca82deb4f85a705f57690a42761&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/903606c8362d061d620e14c001d73ca231508aa65ca4aaf43920478158e84692?apiKey=a82e3ca82deb4f85a705f57690a42761&"
//                 className="aspect-square w-[65px]"
//               />
//               <div className="mt-2.5">XRP</div>
//             </div>
//             <div className="flex flex-col flex-1 items-center text-xs leading-4 whitespace-nowrap text-stone-300">
//               <img
//                 loading="lazy"
//                 srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ac330398334cfd2fbe299b1c443d977b492f44726056181842fc53b91844c188?apiKey=a82e3ca82deb4f85a705f57690a42761&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ac330398334cfd2fbe299b1c443d977b492f44726056181842fc53b91844c188?apiKey=a82e3ca82deb4f85a705f57690a42761&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ac330398334cfd2fbe299b1c443d977b492f44726056181842fc53b91844c188?apiKey=a82e3ca82deb4f85a705f57690a42761&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ac330398334cfd2fbe299b1c443d977b492f44726056181842fc53b91844c188?apiKey=a82e3ca82deb4f85a705f57690a42761&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ac330398334cfd2fbe299b1c443d977b492f44726056181842fc53b91844c188?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ac330398334cfd2fbe299b1c443d977b492f44726056181842fc53b91844c188?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ac330398334cfd2fbe299b1c443d977b492f44726056181842fc53b91844c188?apiKey=a82e3ca82deb4f85a705f57690a42761&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ac330398334cfd2fbe299b1c443d977b492f44726056181842fc53b91844c188?apiKey=a82e3ca82deb4f85a705f57690a42761&"
//                 className="aspect-square w-[65px]"
//               />
//               <div className="mt-2.5">DOGE</div>
//             </div>
//             <div className="flex flex-col flex-1 text-xs leading-4 whitespace-nowrap text-stone-300">
//               <img
//                 loading="lazy"
//                 srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/80272b600928991a93274f8d3b383b1fc9633f8f04826819c6c972b206e550c4?apiKey=a82e3ca82deb4f85a705f57690a42761&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/80272b600928991a93274f8d3b383b1fc9633f8f04826819c6c972b206e550c4?apiKey=a82e3ca82deb4f85a705f57690a42761&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/80272b600928991a93274f8d3b383b1fc9633f8f04826819c6c972b206e550c4?apiKey=a82e3ca82deb4f85a705f57690a42761&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/80272b600928991a93274f8d3b383b1fc9633f8f04826819c6c972b206e550c4?apiKey=a82e3ca82deb4f85a705f57690a42761&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/80272b600928991a93274f8d3b383b1fc9633f8f04826819c6c972b206e550c4?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/80272b600928991a93274f8d3b383b1fc9633f8f04826819c6c972b206e550c4?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/80272b600928991a93274f8d3b383b1fc9633f8f04826819c6c972b206e550c4?apiKey=a82e3ca82deb4f85a705f57690a42761&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/80272b600928991a93274f8d3b383b1fc9633f8f04826819c6c972b206e550c4?apiKey=a82e3ca82deb4f85a705f57690a42761&"
//                 className="self-center aspect-[0.77] w-[50px]"
//               />
//               <div className="mt-2.5">MRO</div>
//             </div>
//           </div>
//           <div className="self-start mt-10 ml-8 text-xs font-semibold tracking-wider leading-7 text-white uppercase">
//             feed
//           </div>
//           <div className="flex flex-col justify-center pl-6 mt-5 w-full">
//             <div className="flex gap-4 justify-between">
//               <div className="flex flex-col flex-1 justify-center">
//                 <div className="flex flex-col py-4 pl-3 w-full rounded bg-neutral-900 bg-opacity-80">
//                   <div className="flex gap-5 justify-between pr-6 pl-px w-full text-white">
//                     <div className="flex gap-2 justify-center items-start">
//                       <img
//                         loading="lazy"
//                         srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/eb8974a1b650d7167bcc343f01c6a2a06e86ced7e2517ad5420420eab9027a2f?apiKey=a82e3ca82deb4f85a705f57690a42761&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb8974a1b650d7167bcc343f01c6a2a06e86ced7e2517ad5420420eab9027a2f?apiKey=a82e3ca82deb4f85a705f57690a42761&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb8974a1b650d7167bcc343f01c6a2a06e86ced7e2517ad5420420eab9027a2f?apiKey=a82e3ca82deb4f85a705f57690a42761&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb8974a1b650d7167bcc343f01c6a2a06e86ced7e2517ad5420420eab9027a2f?apiKey=a82e3ca82deb4f85a705f57690a42761&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb8974a1b650d7167bcc343f01c6a2a06e86ced7e2517ad5420420eab9027a2f?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb8974a1b650d7167bcc343f01c6a2a06e86ced7e2517ad5420420eab9027a2f?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb8974a1b650d7167bcc343f01c6a2a06e86ced7e2517ad5420420eab9027a2f?apiKey=a82e3ca82deb4f85a705f57690a42761&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/eb8974a1b650d7167bcc343f01c6a2a06e86ced7e2517ad5420420eab9027a2f?apiKey=a82e3ca82deb4f85a705f57690a42761&"
//                         className="self-stretch rounded-full shadow-sm aspect-[0.96] w-[27px]"
//                       />
//                       <div className="flex-auto mt-3 text-sm font-medium leading-5">
//                         Origin of bitcoin{" "}
//                       </div>
//                       <div className="grow mt-3.5 text-xs leading-5">
//                         @batman_Bit
//                       </div>
//                     </div>
//                     <img
//                       loading="lazy"
//                       src="https://cdn.builder.io/api/v1/image/assets/TEMP/db2f55b465cafa4436fa7451a0f898263962bf007bd884d08f4e55885e0f6f03?apiKey=a82e3ca82deb4f85a705f57690a42761&"
//                       className="my-auto w-6 aspect-square"
//                     />
//                   </div>
//                   <div className="flex flex-col px-4 pt-4 pb-10 mt-4 w-full text-xs font-medium leading-4 text-white rounded bg-black bg-opacity-60">
//                     <div className="justify-center self-start px-3 py-1.5 tracking-wide whitespace-nowrap rounded border border-solid shadow-sm aspect-[2.18] border-neutral-700 leading-[155%]">
//                       DeFi
//                     </div>
//                     <div className="mt-4 text-sm leading-5">
//                       A rally across equity markets in recent weeks has lifted
//                       Birkenstock and other newly public firms, but Wall Street
//                       still isn’t welcoming IPOs with open arms.
//                     </div>
//                     <div className="justify-center items-start py-3 pr-16 pl-4 mt-3 whitespace-nowrap rounded bg-zinc-800 text-neutral-500">
//                       Yes, It will goes up
//                     </div>
//                     <div className="justify-center items-start py-3 pr-16 pl-4 mt-2 whitespace-nowrap rounded bg-zinc-800 text-neutral-500">
//                       No, It will not goes up
//                     </div>
//                     <div className="justify-center items-start py-3 pr-16 pl-4 mt-2 whitespace-nowrap rounded bg-zinc-800 text-neutral-500">
//                       Stable, Price
//                     </div>
//                     <div className="flex gap-2.5 justify-between mt-2">
//                       <img
//                         loading="lazy"
//                         srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/835b6f4c32c72b651525200595f87d8b03fb24d29e736e61c3e7739d6b3b5e41?apiKey=a82e3ca82deb4f85a705f57690a42761&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/835b6f4c32c72b651525200595f87d8b03fb24d29e736e61c3e7739d6b3b5e41?apiKey=a82e3ca82deb4f85a705f57690a42761&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/835b6f4c32c72b651525200595f87d8b03fb24d29e736e61c3e7739d6b3b5e41?apiKey=a82e3ca82deb4f85a705f57690a42761&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/835b6f4c32c72b651525200595f87d8b03fb24d29e736e61c3e7739d6b3b5e41?apiKey=a82e3ca82deb4f85a705f57690a42761&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/835b6f4c32c72b651525200595f87d8b03fb24d29e736e61c3e7739d6b3b5e41?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/835b6f4c32c72b651525200595f87d8b03fb24d29e736e61c3e7739d6b3b5e41?apiKey=a82e3ca82deb4f85a705f57690a42761&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/835b6f4c32c72b651525200595f87d8b03fb24d29e736e61c3e7739d6b3b5e41?apiKey=a82e3ca82deb4f85a705f57690a42761&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/835b6f4c32c72b651525200595f87d8b03fb24d29e736e61c3e7739d6b3b5e41?apiKey=a82e3ca82deb4f85a705f57690a42761&"
//                         className="self-start aspect-[2.17] w-[26px]"
//                       />
//                       <div className="flex-auto">14,817 voted </div>
//                     </div>
//                   </div>
//                   <div className="flex gap-0 justify-between items-start whitespace-nowrap">
//                     <div className="flex flex-col self-end mt-6">
//                       <div className="flex gap-1 pr-20 text-xs leading-5 text-center">
//                         <div className="grow justify-center px-2 text-green-400 rounded-2xl border border-solid bg-green-400 bg-opacity-20 border-[color:var(--Stoke,rgba(255,255,255,0.40))]">
//                           Financials
//                         </div>
//                         <div className="justify-center px-2 text-sky-500 rounded-2xl border border-solid aspect-[3.15] bg-sky-500 bg-opacity-30 border-[color:var(--Stoke,rgba(255,255,255,0.40))]">
//                           Bull Run
//                         </div>
//                         <div className="justify-center px-2 text-amber-500 rounded-2xl border border-solid aspect-[1.9] bg-amber-500 bg-opacity-30 border-[color:var(--Stoke,rgba(255,255,255,0.40))]">
//                           ICO
//                         </div>
//                         <div className="justify-center px-2 text-purple-500 rounded-2xl border border-solid aspect-[2.65] bg-purple-500 bg-opacity-30 border-[color:var(--Stoke,rgba(255,255,255,0.40))]">
//                           Crypo
//                         </div>
//                       </div>
//                       <div className="flex gap-5 justify-between self-center mt-7 text-sm font-medium leading-5 text-white">
//                         <div className="flex gap-1 justify-between">
//                           <img
//                             loading="lazy"
//                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/ba20e289046d3454281cc526085e03953766b0cd8f19b3695d2efbc7b3708670?apiKey=a82e3ca82deb4f85a705f57690a42761&"
//                             className="w-6 aspect-square"
//                           />
//                           <div className="grow my-auto">326</div>
//                         </div>
//                         <div className="flex gap-1 justify-between">
//                           <img
//                             loading="lazy"
//                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/120b0f1036167473d4d07a183ac113428caa1d617b7d0490c5260a87954efc05?apiKey=a82e3ca82deb4f85a705f57690a42761&"
//                             className="w-6 aspect-square"
//                           />
//                           <div className="grow my-auto">23</div>
//                         </div>
//                         <div className="flex gap-1 justify-between">
//                           <img
//                             loading="lazy"
//                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f465a2b4fa4ada92efe7e3e2633649ae826d4c06f62257f138f76cfd8f1d7a7?apiKey=a82e3ca82deb4f85a705f57690a42761&"
//                             className="w-6 aspect-square"
//                           />
//                           <div className="grow my-auto">148</div>
//                         </div>
//                         <div className="flex gap-1 justify-between">
//                           <img
//                             loading="lazy"
//                             src="https://cdn.builder.io/api/v1/image/assets/TEMP/11f05cbd04ed32304007631034fe75919117cc513b44d3c683b390b7cc5c0228?apiKey=a82e3ca82deb4f85a705f57690a42761&"
//                             className="w-6 aspect-square"
//                           />
//                           <div className="grow my-auto">Pin</div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="justify-center items-center self-start px-4 h-11 text-xl leading-7 text-center text-white rounded-xl border border-solid aspect-square bg-zinc-300 bg-opacity-20 border-neutral-400">
//                       +
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-2 text-xs leading-5 text-center text-zinc-400">
//                   1hour ago
//                 </div>
//               </div>
//               <div className="self-end text-xs leading-5 text-center mt-[485px] text-zinc-400">
//                 1hour ago
//               </div>
//             </div>
//             <div className="flex gap-4 justify-between mt-7">
//               <div className="flex flex-col flex-1 justify-center">
//                 <div className="shrink-0 rounded bg-neutral-900 bg-opacity-80 h-[7px]" />
//               </div>
//               <div className="flex flex-col justify-center aspect-[1.29]">
//                 <div className="shrink-0 rounded bg-neutral-900 bg-opacity-80 h-[7px]" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [showLoader, setShowLoader] = useState(true);
//   const navigate = useNavigate();

//   // Retrieve token from local storage or wherever it's stored
//   const token = localStorage.getItem("token"); // Adjust this according to your setup

//   const hideLoader = () => {
//     setShowLoader(false);
//     document.body.style.overflow = "visible";
//   };

//   const showLoaderAndDisableScroll = () => {
//     setShowLoader(true);
//     document.body.style.overflow = "hidden";
//   };

//   // Handle sign out
//   const handleSignOut = () => {
//     // Clear user session or token
//     localStorage.removeItem("token");

//     // Redirect to login page
//     navigate("/login");
//   };

//   // Navigate to create post page with token as prop
//   const createPost = () => {
//     navigate("/createpost", {
//       state: {
//         token: token, // Pass the token along with other data
//       },
//     });
//   };
//   return (
//     <div
//       className={`bg-black  max-w-[480px]  justify-center items-stretch mx-auto ${
//         showLoader ? " h-screen overflow-hidden" : ""
//       }`}
//     >
//       <button className="text-blue-600 flex font-bold" onClick={handleSignOut}>
//         Signout
//       </button>

//       <button className="text-blue-600 font-bold" onClick={createPost}>
//         Create Post
//       </button>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract the token from the URL
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    if (token) {
      // Save the token to localStorage for future use
      localStorage.setItem("token", token);
    }
  }, [location]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const createPost = () => {
    navigate("/createpost");
  };
  const Tradeview = () => {
    navigate("/tradeview");
  };
  const Avatar = () => {
    navigate("/avatar");
  };

  return (
    <div
      className={`bg-black  max-w-[480px]  justify-center items-stretch mx-auto ${
        showLoader ? " h-screen overflow-hidden" : ""
      }`}
    >
      <button className="text-blue-600 flex font-bold" onClick={handleSignOut}>
        Signout
      </button>

      <button className="text-blue-600 font-bold" onClick={createPost}>
        Create Post
      </button>
      <button className="text-blue-600 font-bold flex" onClick={Tradeview}>
        TradeView
      </button>
      <button className="text-blue-600 font-bold flex" onClick={Avatar}>
        Avatar
      </button>
    </div>
  );
};

export default Home;
