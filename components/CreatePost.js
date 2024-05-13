// import React, { useRef, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
// import { FaRegSun, FaMoon } from "react-icons/fa";
// import { useTheme } from "./ThemeContext";
// import GifPicker from "../components/GifPicker";

// const CreatePost = () => {
//   const [showLoader, setShowLoader] = useState(true);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("Public");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [selectedGif, setSelectedGif] = useState(null);
//   const [options, setOptions] = useState(["", ""]);
//   const [isPollClicked, setIsPollClicked] = useState(false);
//   const [selectedImageURL, setSelectedImageURL] = useState(null);
//   const [selectedVideoURL, setSelectedVideoURL] = useState("");
//   const [hidePlaceholder, setHidePlaceholder] = React.useState(false);
//   const [selectedGifURL, setSelectedGifURL] = useState(null);
//   const [selectedMedia, setSelectedMedia] = useState([]);
//   const [textValue, setTextValue] = useState("");
//   const [showPollDurationDropdown, setShowPollDurationDropdown] =
//     useState(false);

//   const [selectedPollDuration, setSelectedPollDuration] = useState("1 day");
//   const navigate = useNavigate();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const fileInputImageRef = useRef(null);
//   const fileInputVideoRef = useRef(null);
//   const fileInputGifRef = useRef(null);
//   const pollDurations = [
//     "1 day",
//     "2 days",
//     "3 days",
//     "4 days",
//     "5 days",
//     "6 days",
//     "7 days",
//   ];
//   const { theme, toggleTheme } = useTheme();
//   const [mode, setMode] = useState("dark");
//   const [showGifPicker, setShowGifPicker] = useState(false);
//   const [selectedGifs, setSelectedGifs] = useState([]);

//   const toggleMode = () => {
//     setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
//   };
//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };
//   const handleTogglePollDurationDropdown = () => {
//     setShowPollDurationDropdown((prev) => !prev);
//   };

//   const handleSelectPollDuration = (duration) => {
//     setSelectedPollDuration(duration);
//     setShowPollDurationDropdown(false);
//   };
//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//   };

//   const handleChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   const hideLoader = () => {
//     setShowLoader(false);
//     document.body.style.overflow = "visible";
//   };

//   const showLoaderAndDisableScroll = () => {
//     setShowLoader(true);
//     document.body.style.overflow = "hidden";
//   };

//   // Function to handle image selection
//   const handleImageSelect = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onloadend = () => {
//       setSelectedMedia((prev) => [
//         ...prev,
//         { type: "image", url: reader.result, file: file }, // Include the file object
//       ]);
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//     e.target.value = null;
//   };
//   const handleVideoSelect = (event) => {
//     const file = event.target.files[0];
//     const videoURL = URL.createObjectURL(file);
//     setSelectedMedia((prev) => [
//       ...prev,
//       { type: "video", url: videoURL, file: file }, // Include the file object
//     ]);
//     event.target.value = null;
//   };

//   // const handleGifSelect = (event) => {
//   //   const file = event.target.files[0];
//   //   const gifURL = URL.createObjectURL(file);
//   //   setSelectedMedia((prev) => [
//   //     ...prev,
//   //     { type: "gif", url: gifURL, file: file }, // Include the file object
//   //   ]);
//   //   event.target.value = null;
//   // };
//   const handleGifSelect = (gif) => {
//     setSelectedMedia([
//       ...selectedMedia,
//       { type: "gif", url: gif.images.fixed_height.url, file: null },
//     ]);
//     setShowGifPicker(false); // Close the GifPicker
//   };

//   const handlePollClick = () => {
//     setIsPollClicked((prev) => !prev); // Toggle isPollClicked
//   };

//   const handleAddOption = () => {
//     setOptions([...options, ""]); // Add an empty option
//   };

//   const handleOptionChange = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handleRemoveOption = (indexToRemove) => {
//     setOptions((prevOptions) =>
//       prevOptions.filter((_, index) => index !== indexToRemove)
//     );
//   };
//   const handleCancel = () => {
//     setShowPollDurationDropdown(false);
//   };
//   function handleClick() {
//     setHidePlaceholder(true);
//   }
//   const handleRemoveMedia = (indexToRemove) => {
//     setSelectedMedia((prevMedia) =>
//       prevMedia.filter((_, index) => index !== indexToRemove)
//     );
//   };
//   // (textValue.trim() !== "" || selectedMedia.length > 0)
//   const handleTextChange = (event) => {
//     setTextValue(event.target.value);
//   };
//   const handleGenerateTags = () => {
//     if (textValue.trim() === "" && selectedMedia.length > 0) {
//       toast.error("Tagging text should not be empty."); // Display an alert message
//     } else {
//       console.log("Generating tags for:", textValue);
//     }
//   };

//   const handlePost = async () => {
//     try {
//       // Retrieve the token from local storage
//       const token = localStorage.getItem("tkn");

//       // Ensure token is available
//       if (!token) {
//         throw new Error("No token found in local storage");
//       }

//       // Create a new FormData object
//       const formData = new FormData();
//       formData.append("description", textValue);
//       formData.append("postVisiblity", selectedOption);

//       // Append attachments from selectedMedia
//       selectedMedia.forEach((media, index) => {
//         formData.append("attachments", media.file); // Append 'media.file' instead of 'file'
//       });

//       // Make the post request using Axios
//       const response = await axios.post(
//         "http://localhost:3000/addPost",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//             // Add any additional headers if needed
//           },
//         }
//       );

//       // Handle the response
//       toast.success("Post added successfully:", response.data);
//       // You can handle any UI updates or notifications here
//       navigate("/home");
//     } catch (error) {
//       toast.error("Error adding post:", error.message);
//       // Handle errors, display error messages, etc.
//       // You can also add specific error handling for "No token found" error
//     }
//   };

//   return (
//     <div>
//       <div
//         className={`bg-black flex max-w-[480px] w-full flex-col justify-center items-stretch mx-auto ${
//           showLoader ? " h-screen overflow-hidden" : ""
//         }`}
//       >
//         <button
//           onClick={toggleTheme}
//           style={{
//             position: "fixed",
//             top: 20,
//             right: 20,
//             background: "none",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           {theme === "dark" ? (
//             <FaRegSun color="#FFA500" size="24" />
//           ) : (
//             <FaMoon color="#000" size="24" />
//           )}
//         </button>
//         <div className="flex z-10 gap-2 justify-between items-center px-12 py-3 text-lg font-semibold tracking-tight leading-5 text-center text-white whitespace-nowrap bg-black"></div>
//         <div className="flex-auto text-white text-center  leading-5  font-medium text-base mt-10">
//           Create post
//         </div>
//         <div className="flex flex-col pt-9 mt-0 w-full h-[85%]  bg-black rounded-xl  bg-blend-luminosity backdrop-blur-[51.349998474121094px] border-[color:var(--windows-stroke-glass-specular,rgba(255,255,255,0.40))]">
//           <div className="flex flex-col px-6 w-full">
//             <div className="flex gap-5 justify-between pr-5  text-lg font-medium leading-5 text-white">
//               {/* <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/97f786c4ac75cb853581b47582ee645eaf33fb99e3c760693b68ff9f3ed66263?apiKey=a428c5db03d046848dd140902f0be6ff&"
//               className="w-16 aspect-[2.63]"
//             /> */}
//             </div>
//             <div className="flex gap-5 justify-between mt-0 whitespace-nowrap">
//               <div className="flex gap-3 justify-between font-medium text-white">
//                 <img
//                   loading="lazy"
//                   srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&"
//                   className="self-start aspect-square w-[50px]"
//                 />
//                 <div className="flex flex-col flex-1">
//                   <div className="text-base leading-5">Consul of Design</div>

//                   <div className="flex gap-1.5  justify-center  items-center py-0 pr-3 pl-3 mt-2 text-sm leading-5 text-center rounded-md border border-solid border-[color:var(--Text,#FFF)]">
//                     <img
//                       loading="lazy"
//                       src="https://cdn.builder.io/api/v1/image/assets/TEMP/2088f42a9571f532c2625b49ddd7f2ef65f2ee8ea5616e22fbedf349702c422c?apiKey=a428c5db03d046848dd140902f0be6ff&"
//                       className="self-stretch my-auto w-4 aspect-square"
//                     />
//                     <div className="z-10 justify-center px-4 py-2 rounded-none border-none bg-transparent shadow-sm focus:outline-none">
//                       {" "}
//                       {selectedOption}
//                     </div>

//                     <div>
//                       {!isDropdownOpen && (
//                         <img
//                           loading="lazy"
//                           src="https://cdn.builder.io/api/v1/image/assets/TEMP/511f4e8e9c849eabf7ad29a52a875cfae3cb84231e629c771766b29d6395e290?apiKey=a428c5db03d046848dd140902f0be6ff&"
//                           className=""
//                           onClick={handleToggle}
//                         />
//                       )}
//                     </div>

//                     <div>
//                       {isOpen && (
//                         <div
//                           className="  absolute right-0 mt-[80.9%] w-full h-[40%] rounded-bl-none rounded-tr-3xl rounded-tl-3xl shadow-lg bg-neutral-900 border  ring-1 ring-black ring-opacity-5 focus:outline-none"
//                           role="menu"
//                           aria-orientation="vertical"
//                           aria-labelledby="options-menu"
//                         >
//                           <div className="  border mt-2 border-neutral-600 w-20 ml-2 rounded-lg">
//                             <h4 className="ml-2 text-sm font-serif mr-[80%]">
//                               Visibility
//                             </h4>
//                           </div>
//                           <div className="py-1 mt-5" role="none">
//                             <div
//                               className={`block px-4 py-2 text-lg text-white cursor-pointer rounded-full ${
//                                 selectedOption === "Public"
//                                   ? "bg-red-800 rounded-full"
//                                   : "hover:bg-gray-800"
//                               }`}
//                               onClick={() => handleOptionSelect("Public")}
//                             >
//                               Public
//                             </div>

//                             <div
//                               className={`block mt-2 px-4 py-2 text-lg text-white cursor-pointer rounded-full ${
//                                 selectedOption === "OnlyFollowers"
//                                   ? "bg-red-800 rounded-full"
//                                   : "hover:bg-gray-800"
//                               }`}
//                               onClick={() =>
//                                 handleOptionSelect("OnlyFollowers")
//                               }
//                             >
//                               Only Followers
//                             </div>

//                             <div
//                               className={`block px-4 mt-2 py-2 text-lg text-white cursor-pointer rounded-full ${
//                                 selectedOption === "Myself"
//                                   ? "bg-red-800 rounded-full"
//                                   : "hover:bg-gray-800"
//                               }`}
//                               onClick={() => handleOptionSelect("Myself")}
//                             >
//                               Myself
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex gap-1.5 justify-center p-2 my-auto text-white shadow backdrop-blur-[4.900000095367432px] bg-neutral-900 bg-opacity-80 rounded-[61.714px]">
//                 <div className="overflow-hidden relative flex-col justify-center px-1.5 py-px text-sm aspect-square fill-rose-600">
//                   <img
//                     loading="lazy"
//                     src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0b84ec06e4566e9f1c027c4aebdcb14af71cc5de43f50bd57425555ddb60810?apiKey=a428c5db03d046848dd140902f0be6ff&"
//                     className="object-cover absolute inset-0 size-full"
//                   />
//                   $
//                 </div>
//                 <div className="grow text-xs">Prediction</div>
//               </div>
//             </div>

//             <div
//               id="whatsHappeningInput"
//               contentEditable
//               placeholder="What are you thinking?"
//               onChange={handleTextChange}
//               className="flex flex-col  relative   gap-3 text-white   items-start px-3 pt-4 pb-[80%] mt-1 text-base font-medium leading-5 rounded border-2 border-gray-700 bg-neutral-900 bg-opacity-80 border-[color:var(--Stoke,rgba(255,255,255,0.40))] focus:outline-none"
//               style={{
//                 maxHeight: "50%", // Adjust as needed
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="What are you thinking?"
//                 className="text-white bg-transparent outline-none border-none "
//                 onChange={handleTextChange}
//               />
//               <div className="text-black    ">
//                 {showGifPicker && <GifPicker onSelect={handleGifSelect} />}
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 {selectedMedia.map((media, index) => (
//                   <div key={index} className="max-h-[150px] ">
//                     {media.type === "image" && (
//                       <img
//                         src={media.url}
//                         alt="Selected Image"
//                         className="w-32 h-32 ml-1 flex flex-col   "
//                       />
//                     )}
//                     {media.type === "video" && (
//                       <video controls className="w-32 h-32 ml-10 mt-10">
//                         <source src={media.url} type="video/mp4" />
//                         Your browser does not support the video tag.
//                       </video>
//                     )}
//                     {media.type === "gif" && (
//                       <img
//                         src={media.url}
//                         alt="Selected GIF"
//                         className="w-32 h-32 "
//                       />
//                     )}

//                     <button
//                       className="absolute top-0 right-0 mt-1 mr-1 text-xs text-white bg-red-500 px-1 rounded-full"
//                       onClick={() => handleRemoveMedia(index)}
//                     >
//                       X
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* {!selectedMedia.length && textValue.trim() !== "" && ( */}
//             {(textValue.trim() !== "" || selectedMedia.length > 0) && (
//               <button
//                 className="text-red-500 mt-[-2px] border-e-4 border-x-4 border-b-4 border-gray-700 font-medium px-4 py-2 rounded-lg flex items-center justify-center"
//                 onClick={handleGenerateTags}
//               >
//                 Generate Tags
//                 <img
//                   loading="lazy"
//                   src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8aab5140d52723cc92554a4d8874a43310612f358c5c847d299055298f41408?apiKey=a428c5db03d046848dd140902f0be6ff&"
//                   className="w-full fill-red-500 max-w-[20px] ml-2"
//                   alt="Icon"
//                 />
//                 <ToastContainer />
//               </button>
//             )}

//             {/* image */}
//             <div className="flex gap-2.5 justify-between items-start pr-1.5 mt-3.5 text-base font-medium leading-5 text-center whitespace-nowrap text-zinc-600">
//               <input
//                 type="file"
//                 accept="image/jpeg,image/png,image/jpg,image/svg+xml"
//                 className="hidden"
//                 onChange={handleImageSelect}
//                 ref={fileInputImageRef}
//               />
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/69cd1ff65a68cd24ba0f186759efdc2e73a14a7e243308c7d67511a3b50a468d?apiKey=a428c5db03d046848dd140902f0be6ff&"
//                 className="aspect-square w-[41px] cursor-pointer"
//                 onClick={() => fileInputImageRef.current.click()}
//               />
//               {/* video */}
//               <input
//                 type="file"
//                 accept="video/mp4,video/webm"
//                 className="hidden"
//                 onChange={handleVideoSelect}
//                 ref={fileInputVideoRef}
//               />
//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5c0694d02a560da7ec3548001fe9f335cd34d492b0a577dc790593117407c6c?apiKey=a428c5db03d046848dd140902f0be6ff&"
//                 className="aspect-square w-[41px] cursor-pointer"
//                 onClick={() => fileInputVideoRef.current.click()}
//               />
//               {/* gif */}
//               {/* <input
//                 type="file"
//                 accept="image/gif"
//                 className="hidden"
//                 onChange={handleGifSelect}
//                 ref={fileInputGifRef}
//               /> */}
//               {/* <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/89b98b38344923840770c8ef035fdd7cc6bb297093aa98c33de81381f8a2a09f?apiKey=a428c5db03d046848dd140902f0be6ff&"
//                 className="aspect-square w-[41px] cursor-pointer"
//                 onClick={() => fileInputGifRef.current.click()}
//               /> */}

//               <img
//                 loading="lazy"
//                 src="https://cdn.builder.io/api/v1/image/assets/TEMP/89b98b38344923840770c8ef035fdd7cc6bb297093aa98c33de81381f8a2a09f?apiKey=a428c5db03d046848dd140902f0be6ff&"
//                 className="aspect-square w-[41px] cursor-pointer  "
//                 onClick={() => setShowGifPicker(!showGifPicker)} // Toggle GifPicker visibility
//               />
//               <div className="bg-black flex    flex-col justify-center items-stretch  ">
//                 {/* Rest of your code */}
//                 <img
//                   loading="lazy"
//                   src="https://cdn.builder.io/api/v1/image/assets/TEMP/1cc8a8b31feddcda13c3c2585bd3ed555b20fe6de536481870ce0d24edfc5fe0?apiKey=a428c5db03d046848dd140902f0be6ff&"
//                   className="aspect-square w-[41px] cursor-pointer"
//                   onClick={handlePollClick}
//                 />

//                 {/* Rest of your code */}
//                 <div className="h-full w-full relative">
//                   {isPollClicked && (
//                     <div className="absolute top-0 h-80 w-96 ml-[-50%] flex flex-col left-1/2 transform -translate-x-1/2 -mt-[920%] bg-neutral-900 p-4 rounded-lg shadow-lg">
//                       {options.map((option, index) => (
//                         <div key={index} className="relative  ">
//                           <input
//                             type="text"
//                             value={option}
//                             onChange={(e) =>
//                               handleOptionChange(index, e.target.value)
//                             }
//                             placeholder={`Option ${index + 1}`}
//                             className="pl-10 pb-4 mb-2 p-5  bg-neutral-800 text-white  border border-zinc-600 rounded h-10 w-[99%] focus:outline-none "
//                           />
//                           <button
//                             className="absolute top-0 right-0 mt-1 mr-1 text-xs text-white bg-red-500 px-1 rounded-full"
//                             onClick={() => handleRemoveOption(index)}
//                           >
//                             x
//                           </button>
//                         </div>
//                       ))}
//                       <button
//                         onClick={handleAddOption}
//                         className="px-3 py-2 border border-gray-500 text-gray-400 rounded"
//                       >
//                         Add Option
//                       </button>

//                       <button
//                         onClick={handleTogglePollDurationDropdown}
//                         className=" text-yellow-200 text-xs justify-start text-left  mt-2 rounded focus:outline-none "
//                       >
//                         Poll Duration: {selectedPollDuration}
//                         <button
//                           onClick={handlePollClick}
//                           className=" ml-[46%] text-red-400 text-xs font-bold"
//                         >
//                           Delete Poll
//                           <FontAwesomeIcon icon={faTrash} className="ml-1" />
//                         </button>
//                       </button>

//                       {showPollDurationDropdown && (
//                         <div className=" mt-2  ">
//                           <div className="flex justify-end  ">
//                             <button
//                               className=" top-0 right-0 mt-1 mr-1 text-xs text-white bg-red-500 px-1 rounded-full"
//                               onClick={handleCancel}
//                             >
//                               X
//                             </button>
//                           </div>
//                           <h1 className="text-gray-400  text-sm">
//                             Poll Duration
//                           </h1>
//                           {pollDurations.map((duration, index) => (
//                             <div
//                               key={index}
//                               className=" text-gray-400  text-sm rounded-xl mt-2 bg-stone-700 cursor-pointer p-3 "
//                               onClick={() => handleSelectPollDuration(duration)}
//                             >
//                               {duration}
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="flex gap-2.5 justify-between items-start pr-1.5 mt-3.5 text-base font-medium leading-5 text-center whitespace-nowrap text-zinc-600">
//                 {/* Your other elements */}
//                 {isOpen ? null : (
//                   <div className="flex flex-col flex-1 justify-center self-stretch px-0.5 py-px rounded bg-zinc-800">
//                     <button
//                       className="z-10 justify-center px-12 py-5 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-500 hover:text-white"
//                       onClick={handlePost}
//                     >
//                       Post
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CreatePost;
// const handlePost = async () => {
//   // Check if more than 4 files are being uploaded
//   if (selectedMedia.length > 4) {
//     toast.error("Only 4 files can be uploaded.");
//     return; // Stop the function from executing further
//   }

//   try {
//     // Retrieve the token from local storage
//     const token = localStorage.getItem("tkn");
//     if (!token) {
//       throw new Error("No token found in local storage");
//     }

//     // Check if description is not just empty or whitespace
//     if (!textValue.trim()) {
//       toast.error("Description cannot be empty.");
//       return; // Stop the function execution
//     }

//     const formData = new FormData();
//     formData.append("description", textValue.trim()); // Ensure whitespace is trimmed
//     formData.append("postVisiblity", selectedOption);

//     let gifIndex = 0; // Initialize a separate index for GIFs

//     selectedMedia.forEach((media) => {
//       if (media.file) {
//         formData.append("attachments", media.file); // For files (images/videos)
//       } else if (media.type === "gif") {
//         // Use `gifIndex` for GIF URLs to ensure continuous indexing starting from 0
//         formData.append(`gif[${gifIndex}]`, media.url);
//         gifIndex++; // Increment `gifIndex` for each GIF URL
//       }
//     });
//     // If poll is activated, prepare poll data
//     if (isPollClicked && options.length) {
//       // Format the poll options
//       const formattedPollOptions = options.map((option) => ({
//         pollText: option,
//       }));
//       formData.append("createPoll", JSON.stringify(formattedPollOptions));
//       formData.append("pollDuration", selectedPollDuration);
//     }

//     // For GIFs - Assuming you've already handled this part correctly
//     // Just make sure not to stringify if not necessary

//     const response = await axios.post(
//       "http://localhost:3000/addPost",
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // Note: Don't set 'Content-Type': 'multipart/form-data' manually,
//           // Axios will set the correct Content-Type with boundary itself
//         },
//       }
//     );

//     toast.success("Post added successfully");
//     navigate("/home");
//   } catch (error) {
//     console.error("Error adding post:", error);
//     toast.error("Error adding post: " + error.response.data.message);
//   }
// };

// const handlePost = async () => {
//   // Check if more than 4 files are being uploaded
//   if (selectedMedia.length > 4) {
//     toast.error("Only 4 files can be uploaded.");
//     return; // Stop the function from executing further
//   }

//   try {
//     // Retrieve the token from local storage
//     const token = localStorage.getItem("tkn");
//     if (!token) {
//       throw new Error("No token found in local storage");
//     }

//     // Check if description is not just empty or whitespace
//     if (!textValue.trim()) {
//       toast.error("Description cannot be empty.");
//       return; // Stop the function execution
//     }

//     const formData = new FormData();
//     formData.append("description", textValue.trim()); // Ensure whitespace is trimmed
//     formData.append("postVisiblity", selectedOption);

//     let gifIndex = 0; // Initialize a separate index for GIFs

//     selectedMedia.forEach((media) => {
//       if (media.file) {
//         formData.append("attachments", media.file); // For files (images/videos)
//       } else if (media.type === "gif") {
//         // Use `gifIndex` for GIF URLs to ensure continuous indexing starting from 0
//         formData.append(`gif[${gifIndex}]`, media.url);
//         gifIndex++; // Increment `gifIndex` for each GIF URL
//       }
//     });
//     if (
//       isPollClicked &&
//       options.filter((option) => option.trim() !== "").length
//     ) {
//       const durationInDays = parseInt(selectedPollDuration.split(" ")[0], 10); // "2 days" => 2
//       const pollExpirationDate = new Date();
//       pollExpirationDate.setDate(
//         pollExpirationDate.getDate() + durationInDays
//       );
//       const formattedPollDuration = pollExpirationDate.toISOString();

//       const formattedPollOptions = options
//         .filter((option) => option.trim() !== "") // Filter out empty options
//         .map((option) => ({ pollText: option.trim() })); // Ensure trimmed text

//       // Append each option as a separate form data entry
//       formattedPollOptions.forEach((option, index) => {
//         formData.append(`createPoll[${index}][pollText]`, option.pollText);
//       });

//       formData.append("pollDuration", formattedPollDuration);
//     }
//     // For GIFs - Assuming you've already handled this part correctly
//     // Just make sure not to stringify if not necessary

//     // const response = await axios.post(
//     //   "http://localhost:3000/addPost",
//     //   formData,
//     //   {
//     //     headers: {
//     //       Authorization: `Bearer ${token}`,
//     //       // Note: Don't set 'Content-Type': 'multipart/form-data' manually,
//     //       // Axios will set the correct Content-Type with boundary itself
//     //     },
//     //   }
//     // );
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     // Adjust URL if creating a poll
//     const url = isPollClicked
//       ? "http://localhost:3000/addPoll"
//       : "http://localhost:3000/addPost";

//     // Perform the API call
//     const response = await axios.post(url, formData, config);

//     toast.success("Post added successfully");
//     navigate("/home");
//   } catch (error) {
//     console.error("Error adding post:", error);
//     toast.error("Error adding post: " + error.response.data.message);
//   }
// };
// const handlePost = async () => {
//   // Initial checks for file count and empty description
//   if (selectedMedia.length > 4) {
//     toast.error("Only 4 files can be uploaded.");
//     return;
//   }
//   if (!textValue.trim()) {
//     toast.error("Description cannot be empty.");
//     return;
//   }

//   try {
//     const token = localStorage.getItem("tkn");
//     if (!token) throw new Error("No token found in local storage");

//     const formData = new FormData();
//     formData.append("description", textValue.trim());
//     formData.append("postVisiblity", selectedOption);

//     let hasGif = false;
//     selectedMedia.forEach((media, index) => {
//       if (media.type === "gif") {
//         hasGif = true; // Detect if there's a GIF in the selection
//         if (!isPollClicked) {
//           // Only append GIFs if not creating a poll
//           formData.append(`gif[${index}]`, media.url);
//         }
//         // } else if (media.file) {
//         //   formData.append("attachments", media.file);
//       }
//     });
//     // Adjusting for GIF or image handling in polls
//     let mediaIndex = 0; // For attachments excluding GIFs

//     // Collecting non-GIF media for potential inclusion as poll images
//     const nonGifMedia = selectedMedia.filter((media) => media.type !== "gif");

//     nonGifMedia.forEach((media) => {
//       if (media.file) {
//         formData.append(`attachments`, media.file);
//       }
//     });

//     if (isPollClicked) {
//       const durationInDays = parseInt(selectedPollDuration.split(" ")[0], 10);
//       const pollExpirationDate = new Date();
//       pollExpirationDate.setDate(
//         pollExpirationDate.getDate() + durationInDays
//       );
//       formData.append("pollDuration", pollExpirationDate.toISOString());

//       options.forEach((option, index) => {
//         formData.append(`createPoll[${index}][pollText]`, option.trim());

//         // Assuming the option to associate images with poll options is provided by your UI
//         // This example assumes each poll option might have an associated image or none
//         if (option.pollImage) {
//           // Attach the poll image if available
//           // Ensure pollImage is properly managed in your state to match corresponding media
//           const pollImageMedia = nonGifMedia.find(
//             (media) => media.id === option.pollImageId
//           ); // This is an illustrative example; adjust based on your actual state structure
//           if (pollImageMedia && pollImageMedia.file) {
//             formData.append(
//               `createPoll[${index}][pollImage]`,
//               pollImageMedia.file
//             );
//           }
//         }
//       });
//     }

//     const config = { headers: { Authorization: `Bearer ${token}` } };
//     const url = isPollClicked
//       ? "http://localhost:3000/addPoll"
//       : "http://localhost:3000/addPost";

//     // Perform the API call
//     const response = await axios.post(url, formData, config);
//     toast.success("Post added successfully");
//     navigate("/home");
//   } catch (error) {
//     console.error("Error adding post:", error);
//     toast.error(
//       "Error adding post: " + error.response?.data?.message ||
//         "An error occurred"
//     );
//   }
// };
// const handlePost = async () => {
//   if (selectedMedia.length > 4) {
//     toast.error("Only 4 files can be uploaded.");
//     return;
//   }

//   if (!textValue.trim()) {
//     toast.error("Description cannot be empty.");
//     return;
//   }

//   try {
//     const token = localStorage.getItem("tkn");
//     if (!token) throw new Error("No token found in local storage");

//     const formData = new FormData();
//     formData.append("description", textValue.trim());
//     formData.append("postVisiblity", selectedOption);

//     // Append non-GIF media files
//     selectedMedia.forEach((media) => {
//       if (media.file) {
//         formData.append("attachments", media.file);
//       }
//     });

//     // Append GIF URLs for posts, but not for polls
//     if (!isPollClicked) {
//       selectedMedia
//         .filter((media) => media.type === "gif")
//         .forEach((gif, index) => {
//           // This approach assumes your backend can accept direct URLs for GIFs in the /addPost route
//           formData.append("gif", gif.url);
//         });
//     }

//     // Handle poll-specific data
//     if (isPollClicked) {
//       const pollDurationDate = new Date();
//       pollDurationDate.setDate(
//         pollDurationDate.getDate() + parseInt(selectedPollDuration, 10)
//       );
//       formData.append("pollDuration", pollDurationDate.toISOString());

//       options.forEach((option, index) => {
//         formData.append(`createPoll[${index}][pollText]`, option.trim());
//       });
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     // Determine the appropriate URL based on the action (post vs. poll)
//     const url = isPollClicked
//       ? "http://localhost:3000/addPoll"
//       : "http://localhost:3000/addPost";

//     await axios.post(url, formData, config);

//     toast.success(
//       isPollClicked ? "Poll added successfully" : "Post added successfully"
//     );
//     navigate("/home");
//   } catch (error) {
//     console.error("Error:", error);
//     toast.error(
//       `Error: ${
//         error.response?.data?.message || "An unexpected error occurred"
//       }`
//     );
//   }
// };
// const handlePost = async () => {
//   if (selectedMedia.length > 4) {
//     toast.error("Only 4 files can be uploaded.");
//     return;
//   }

//   if (!textValue.trim()) {
//     toast.error("Description cannot be empty.");
//     return;
//   }

//   try {
//     let token = localStorage.getItem("tkn") || Cookies.get("token");
//     if (!token) throw new Error("No authentication token found");

//     const formData = new FormData();
//     formData.append("description", textValue.trim());
//     formData.append("postVisiblity", selectedOption);

//     // Append non-GIF media files
//     selectedMedia.forEach((media) => {
//       if (media.file) {
//         formData.append("attachments", media.file);
//       }
//     });

//     // Append GIF URLs for posts, but not for polls
//     if (!isPollClicked) {
//       selectedMedia
//         .filter((media) => media.type === "gif")
//         .forEach((gif, index) => {
//           // This approach assumes your backend can accept direct URLs for GIFs in the /addPost route
//           formData.append("gif", gif.url);
//         });
//     }

//     // Handle poll-specific data
//     if (isPollClicked) {
//       const pollDurationDate = new Date();
//       pollDurationDate.setDate(
//         pollDurationDate.getDate() + parseInt(selectedPollDuration, 10)
//       );
//       formData.append("pollDuration", pollDurationDate.toISOString());

//       options.forEach((option, index) => {
//         formData.append(`createPoll[${index}][pollText]`, option.trim());
//       });
//     }

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };

//     // Determine the appropriate URL based on the action (post vs. poll)
//     const url = isPollClicked
//       ? "http://localhost:3000/addPoll"
//       : "http://localhost:3000/addPost";

//     await axios.post(url, formData, config);

//     toast.success(
//       isPollClicked ? "Poll added successfully" : "Post added successfully"
//     );
//     navigate("/home");
//   } catch (error) {
//     console.error("Error:", error);
//     toast.error(
//       `Error: ${
//         error.response?.data?.message || "An unexpected error occurred"
//       }`
//     );
//   }
// };
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import { FaRegSun, FaMoon } from "react-icons/fa";
import { useTheme } from "./ThemeContext";
import GifPicker from "../components/GifPicker";
import Cookies from "js-cookie";

const CreatePost = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Public");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedGif, setSelectedGif] = useState(null);
  const [options, setOptions] = useState(["", ""]);
  const [isPollClicked, setIsPollClicked] = useState(false);
  const [selectedImageURL, setSelectedImageURL] = useState(null);
  const [selectedVideoURL, setSelectedVideoURL] = useState("");
  const [hidePlaceholder, setHidePlaceholder] = React.useState(false);
  const [selectedGifURL, setSelectedGifURL] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [showPollDurationDropdown, setShowPollDurationDropdown] =
    useState(false);

  const [selectedPollDuration, setSelectedPollDuration] = useState("1 day");
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputImageRef = useRef(null);
  const fileInputVideoRef = useRef(null);
  const fileInputGifRef = useRef(null);
  const pollDurations = [
    "1 day",
    "2 days",
    "3 days",
    "4 days",
    "5 days",
    "6 days",
    "7 days",
  ];
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState("dark");
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [selectedGifs, setSelectedGifs] = useState([]);
  const [activeImage, setActiveImage] = useState(null);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const handleTogglePollDurationDropdown = () => {
    setShowPollDurationDropdown((prev) => !prev);
  };

  const handleSelectPollDuration = (duration) => {
    setSelectedPollDuration(duration);
    setShowPollDurationDropdown(false);
  };
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const hideLoader = () => {
    setShowLoader(false);
    document.body.style.overflow = "visible";
  };

  const showLoaderAndDisableScroll = () => {
    setShowLoader(true);
    document.body.style.overflow = "hidden";
  };

  const handleFileSelect = (event, fileType) => {
    const files = event.target.files;
    const newMedia = [...selectedMedia];

    if (newMedia.length + files.length > 4) {
      toast.error("Only 4 files can be uploaded.");
      return; // Prevent adding more files
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        newMedia.push({ type: fileType, url: reader.result, file: file });
        setSelectedMedia(newMedia);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });

    event.target.value = null; // Reset file input
  };

  const handleImageClick = (url) => {
    setActiveImage(url);
  };

  const ImageViewerModal = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null; // Don't render the modal if there's no image

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-4">
          <img
            src={imageUrl}
            alt="Enlarged view"
            className="max-w-full max-h-full"
          />
          <button
            onClick={onClose}
            className="absolute top-0 right-0 mt-[25%] mr-2 text-white bg-red-500 px-3 py-1 rounded"
          >
            X
          </button>
        </div>
      </div>
    );
  };
  // Function to handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedMedia((prev) => [
        ...prev,
        { type: "image", url: reader.result, file: file }, // Include the file object
      ]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
    e.target.value = null;
  };
  const handleVideoSelect = (event) => {
    const file = event.target.files[0];
    const videoURL = URL.createObjectURL(file);
    setSelectedMedia((prev) => [
      ...prev,
      { type: "video", url: videoURL, file: file }, // Include the file object
    ]);
    event.target.value = null;
  };

  const handleGifSelect = (gif) => {
    const newMedia = {
      type: "gif",
      url: gif.images.fixed_height.url, // Ensure this URL is correct
      file: null,
    };
    setSelectedMedia([...selectedMedia, newMedia]);
    setShowGifPicker(false); // Close the GifPicker
    console.log("Selected GIF:", newMedia);
  };

  const handlePollClick = () => {
    setIsPollClicked((prev) => !prev); // Toggle isPollClicked
  };

  const handleAddOption = () => {
    setOptions([...options, ""]); // Add an empty option
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  // const handleRemoveOption = (indexToRemove) => {
  //   setOptions((prevOptions) =>
  //     prevOptions.filter((_, index) => index !== indexToRemove)
  //   );
  // };
  const handleRemoveOption = (indexToRemove) => {
    // Ensure there are more than 2 options before allowing removal
    if (options.length > 2) {
      setOptions((prevOptions) =>
        prevOptions.filter((_, index) => index !== indexToRemove)
      );
    } else {
      // Optionally, alert the user that at least two options are required
      alert("At least two options are required.");
    }
  };

  const handleCancel = () => {
    setShowPollDurationDropdown(false);
  };
  function handleClick() {
    setHidePlaceholder(true);
  }
  const handleRemoveMedia = (indexToRemove) => {
    setSelectedMedia((prevMedia) =>
      prevMedia.filter((_, index) => index !== indexToRemove)
    );
  };
  // (textValue.trim() !== "" || selectedMedia.length > 0)
  const handleTextChange = (event) => {
    setTextValue(event.target.value);
  };
  const handleGenerateTags = () => {
    if (textValue.trim() === "" && selectedMedia.length > 0) {
      toast.error("Tagging text should not be empty."); // Display an alert message
    } else {
      console.log("Generating tags for:", textValue);
    }
  };

  const handlePost = async () => {
    if (selectedMedia.length > 4) {
      toast.error("Only 4 files can be uploaded.");
      return;
    }

    if (!textValue.trim()) {
      toast.error("Description cannot be empty.");
      return;
    }

    try {
      // Attempt to retrieve the token from localStorage or cookies
      const token = localStorage.getItem("tkn") || Cookies.get("token");

      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        return; // Exit the function if no token is found
      }

      const formData = new FormData();
      formData.append("description", textValue.trim());
      formData.append("postVisiblity", selectedOption);

      selectedMedia.forEach((media) => {
        if (media.file) {
          formData.append("attachments", media.file);
        } else if (media.type === "gif") {
          formData.append("gif", media.url); // Assuming backend handles GIFs separately
        }
      });

      if (isPollClicked) {
        // Handle poll-specific data
        const pollDurationDate = new Date();
        pollDurationDate.setDate(
          pollDurationDate.getDate() + parseInt(selectedPollDuration, 10)
        );
        formData.append("pollDuration", pollDurationDate.toISOString());

        options.forEach((option, index) => {
          if (option.trim() !== "") {
            // Ensure options are not empty
            formData.append(`createPoll[${index}][pollText]`, option.trim());
          }
        });
      }

      // Axios config to include the Authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      console.log(config);
      const url = isPollClicked
        ? "http://localhost:3000/addPoll"
        : "http://localhost:3000/addPost";
      const response = await axios.post(url, formData, config);

      //     toast.success(
      //       isPollClicked ? "Poll added successfully" : "Post added successfully"
      //     );
      //     navigate("/home"); // Ensure navigate is defined, e.g., via useNavigate() from react-router-dom
      //   } catch (error) {
      //     console.error("Error creating post:", error);
      //     toast.error(
      //       `Error creating post: ${
      //         error.response?.data?.message || "An unexpected error occurred"
      //       }`
      //     );
      //   }
      // };
      if (response.status >= 200 && response.status < 300) {
        // Use the appropriate message based on whether it's a poll or a post
        const successMessage = isPollClicked
          ? "Poll added successfully"
          : "Post added successfully";
        alert("post added Successfully");
        navigate("/home"); // Navigate to home after successful post
      } else {
        // Handle any other response statuses if needed
        throw new Error("Failed to create post/poll.");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(
        `Error creating post: ${
          error.response?.data?.message || "An unexpected error occurred"
        }`
      );
    }
  };
  return (
    <div>
      <div
        className={`bg-black flex max-w-[480px] w-full flex-col justify-center items-stretch mx-auto ${
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
        <div className="flex z-10 gap-2 justify-between items-center px-12 py-3 text-lg font-semibold tracking-tight leading-5 text-center text-white whitespace-nowrap bg-black"></div>
        <div className="flex-auto text-white text-center  leading-5  font-medium text-base mt-10">
          Create post
        </div>
        <div className="flex flex-col pt-9 mt-0 w-full h-[85%]  bg-black rounded-xl  bg-blend-luminosity backdrop-blur-[51.349998474121094px] border-[color:var(--windows-stroke-glass-specular,rgba(255,255,255,0.40))]">
          <div className="flex flex-col px-6 w-full">
            <div className="flex gap-5 justify-between pr-5  text-lg font-medium leading-5 text-white">
              {/* <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/97f786c4ac75cb853581b47582ee645eaf33fb99e3c760693b68ff9f3ed66263?apiKey=a428c5db03d046848dd140902f0be6ff&"
              className="w-16 aspect-[2.63]"
            /> */}
            </div>
            <div className="flex gap-5 justify-between mt-0 whitespace-nowrap">
              <div className="flex gap-3 justify-between font-medium text-white">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/47b6a2f41d7b5272b2327a1e915f9e337980d3a931d7c56d53522cceff653e6f?apiKey=a428c5db03d046848dd140902f0be6ff&"
                  className="self-start aspect-square w-[50px]"
                />
                <div className="flex flex-col flex-1">
                  <div className="text-base leading-5">Consul of Design</div>

                  <div className="flex gap-1.5  justify-center  items-center py-0 pr-3 pl-3 mt-2 text-sm leading-5 text-center rounded-md border border-solid border-[color:var(--Text,#FFF)]">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/2088f42a9571f532c2625b49ddd7f2ef65f2ee8ea5616e22fbedf349702c422c?apiKey=a428c5db03d046848dd140902f0be6ff&"
                      className="self-stretch my-auto w-4 aspect-square"
                    />
                    <div className="z-10 justify-center px-4 py-2 rounded-none border-none bg-transparent shadow-sm focus:outline-none">
                      {" "}
                      {selectedOption}
                    </div>

                    <div>
                      {!isDropdownOpen && (
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/511f4e8e9c849eabf7ad29a52a875cfae3cb84231e629c771766b29d6395e290?apiKey=a428c5db03d046848dd140902f0be6ff&"
                          className=""
                          onClick={handleToggle}
                        />
                      )}
                    </div>

                    <div>
                      {isOpen && (
                        <div
                          className="  absolute right-0 mt-[80.9%] w-full h-[40%] rounded-bl-none rounded-tr-3xl rounded-tl-3xl shadow-lg bg-neutral-900 border  ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <div className="  border mt-2 border-neutral-600 w-20 ml-2 rounded-lg">
                            <h4 className="ml-2 text-sm font-serif mr-[80%]">
                              Visibility
                            </h4>
                          </div>
                          <div className="py-1 mt-5" role="none">
                            <div
                              className={`block px-4 py-2 text-lg text-white cursor-pointer rounded-full ${
                                selectedOption === "Public"
                                  ? "bg-red-800 rounded-full"
                                  : "hover:bg-gray-800"
                              }`}
                              onClick={() => handleOptionSelect("Public")}
                            >
                              Public
                            </div>

                            <div
                              className={`block mt-2 px-4 py-2 text-lg text-white cursor-pointer rounded-full ${
                                selectedOption === "OnlyFollowers"
                                  ? "bg-red-800 rounded-full"
                                  : "hover:bg-gray-800"
                              }`}
                              onClick={() =>
                                handleOptionSelect("OnlyFollowers")
                              }
                            >
                              Only Followers
                            </div>

                            <div
                              className={`block px-4 mt-2 py-2 text-lg text-white cursor-pointer rounded-full ${
                                selectedOption === "Myself"
                                  ? "bg-red-800 rounded-full"
                                  : "hover:bg-gray-800"
                              }`}
                              onClick={() => handleOptionSelect("Myself")}
                            >
                              Myself
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5 justify-center p-2 my-auto text-white shadow backdrop-blur-[4.900000095367432px] bg-neutral-900 bg-opacity-80 rounded-[61.714px]">
                <div className="overflow-hidden relative flex-col justify-center px-1.5 py-px text-sm aspect-square fill-rose-600">
                  {/* <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0b84ec06e4566e9f1c027c4aebdcb14af71cc5de43f50bd57425555ddb60810?apiKey=a428c5db03d046848dd140902f0be6ff&"
                    className="object-cover absolute inset-0 size-full"
                  /> */}
                  <div className="rounded-full h-6 w-6 bg-red-900 ">
                    <h1 className="ml-2 text-yellow-100 text-md">$</h1>
                  </div>
                </div>
                <div className="grow text-xs mt-1">Prediction</div>
              </div>
            </div>

            <div
              id="whatsHappeningInput"
              contentEditable
              placeholder="What are you thinking?"
              onChange={handleTextChange}
              className="flex flex-col  relative   gap-3 text-white   items-start px-3 pt-4 pb-[80%] mt-1 text-base font-medium leading-5 rounded border-2 border-gray-700 bg-neutral-900 bg-opacity-80 border-[color:var(--Stoke,rgba(255,255,255,0.40))] focus:outline-none"
              style={{
                maxHeight: "50%", // Adjust as needed
              }}
            >
              <input
                type="file"
                disabled={selectedMedia.length >= 4} // Disable input if 4 files are selected
                // rest of your input attributes
              />

              <input
                type="text"
                placeholder="What are you thinking?"
                className="text-white bg-transparent outline-none border-none "
                onChange={handleTextChange}
              />
              <div className="text-black    ">
                {showGifPicker && <GifPicker onSelect={handleGifSelect} />}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {selectedMedia.map((media, index) => (
                  <div key={index} className=" relative max-h-[150px] ">
                    {media.type === "image" && (
                      <img
                        src={media.url}
                        alt="Selected Image"
                        className="w-32 h-32 ml-1 flex flex-col cursor-pointer"
                        onClick={() => handleImageClick(media.url)}
                      />
                    )}
                    {media.type === "video" && (
                      <video controls className="w-32 h-32 ml-10 mt-10">
                        <source src={media.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    {media.type === "gif" && (
                      <img
                        src={media.url}
                        alt="Selected GIF"
                        className="w-32 h-32 cursor-pointer "
                        onClick={() => handleImageClick(media.url)}
                      />
                    )}

                    <button
                      className="absolute top-0 right-0 mt-1 mr-1 text-xs text-white bg-red-500 px-1 rounded-full"
                      onClick={() => handleRemoveMedia(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <ImageViewerModal
                imageUrl={activeImage}
                onClose={() => setActiveImage(null)}
              />
            </div>

            {/* {!selectedMedia.length && textValue.trim() !== "" && ( */}
            {(textValue.trim() !== "" || selectedMedia.length > 0) && (
              <button
                className="text-red-500 mt-[-2px] border-e-4 border-x-4 border-b-4 border-gray-700 font-medium px-4 py-2 rounded-lg flex items-center justify-center"
                onClick={handleGenerateTags}
              >
                Generate Tags
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f8aab5140d52723cc92554a4d8874a43310612f358c5c847d299055298f41408?apiKey=a428c5db03d046848dd140902f0be6ff&"
                  className="w-full fill-red-500 max-w-[20px] ml-2"
                  alt="Icon"
                />
                <ToastContainer />
              </button>
            )}

            {/* image */}
            <div className="flex gap-2.5 justify-between items-start pr-1.5 mt-3.5 text-base font-medium leading-5 text-center whitespace-nowrap text-zinc-600">
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg,image/svg+xml"
                className="hidden"
                onChange={handleImageSelect}
                ref={fileInputImageRef}
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/69cd1ff65a68cd24ba0f186759efdc2e73a14a7e243308c7d67511a3b50a468d?apiKey=a428c5db03d046848dd140902f0be6ff&"
                className="aspect-square w-[41px] cursor-pointer"
                onClick={() => fileInputImageRef.current.click()}
              />
              {/* video */}
              <input
                type="file"
                accept="video/mp4,video/webm"
                className="hidden"
                onChange={handleVideoSelect}
                ref={fileInputVideoRef}
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5c0694d02a560da7ec3548001fe9f335cd34d492b0a577dc790593117407c6c?apiKey=a428c5db03d046848dd140902f0be6ff&"
                className="aspect-square w-[41px] cursor-pointer"
                onClick={() => fileInputVideoRef.current.click()}
              />
              {/* gif */}
              {/* <input
                type="file"
                accept="image/gif"
                className="hidden"
                onChange={handleGifSelect}
                ref={fileInputGifRef}
              /> */}
              {/* <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/89b98b38344923840770c8ef035fdd7cc6bb297093aa98c33de81381f8a2a09f?apiKey=a428c5db03d046848dd140902f0be6ff&"
                className="aspect-square w-[41px] cursor-pointer"
                onClick={() => fileInputGifRef.current.click()}
              /> */}

              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/89b98b38344923840770c8ef035fdd7cc6bb297093aa98c33de81381f8a2a09f?apiKey=a428c5db03d046848dd140902f0be6ff&"
                className="aspect-square w-[41px] cursor-pointer  "
                onClick={() => setShowGifPicker(!showGifPicker)} // Toggle GifPicker visibility
              />
              <div className="bg-black flex    flex-col justify-center items-stretch  ">
                {/* icon */}
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1cc8a8b31feddcda13c3c2585bd3ed555b20fe6de536481870ce0d24edfc5fe0?apiKey=a428c5db03d046848dd140902f0be6ff&"
                  className="aspect-square w-[41px] cursor-pointer"
                  onClick={handlePollClick}
                />

                {/* Poll */}
                <div className="h-full w-full relative">
                  {isPollClicked && (
                    <div className="absolute  h-[360px] w-[425px] ml-[-76%] flex flex-col left-1/2 transform -translate-x-1/2 -mt-[418px] bg-neutral-900 p-4 rounded-lg shadow-lg">
                      {options.map((option, index) => (
                        <div key={index} className="relative  ">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(index, e.target.value)
                            }
                            placeholder={`Option ${index + 1}`}
                            className="pl-10 pb-4 mb-2 p-5  bg-neutral-800 text-white  border border-zinc-600 rounded h-10 w-[99%] focus:outline-none "
                          />
                          {options.length > 2 && (
                            <button
                              className="absolute top-0 right-0 mt-1 mr-1 text-xs text-white bg-red-500 px-1 rounded-full"
                              onClick={() => handleRemoveOption(index)}
                            >
                              x
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={handleAddOption}
                        className="px-3 py-2 border border-gray-500 text-gray-400 rounded"
                      >
                        Add Option
                      </button>

                      <button
                        onClick={handleTogglePollDurationDropdown}
                        className=" text-yellow-200 text-xs justify-start text-left  mt-2 rounded focus:outline-none "
                      >
                        Poll Duration: {selectedPollDuration}
                        <button
                          onClick={handlePollClick}
                          className=" ml-[46%] text-red-400 text-xs font-bold"
                        >
                          Delete Poll
                          <FontAwesomeIcon icon={faTrash} className="ml-1" />
                        </button>
                      </button>

                      {showPollDurationDropdown && (
                        <div className=" mt-2  ">
                          <div className="flex justify-end  ">
                            <button
                              className=" top-0 right-0 mt-1 mr-1 text-xs text-white bg-red-500 px-1 rounded-full"
                              onClick={handleCancel}
                            >
                              X
                            </button>
                          </div>
                          <h1 className="text-gray-400  text-sm">
                            Poll Duration
                          </h1>
                          {pollDurations.map((duration, index) => (
                            <div
                              key={index}
                              className=" text-gray-400  text-sm rounded-xl mt-2 bg-stone-700 cursor-pointer p-3 "
                              onClick={() => handleSelectPollDuration(duration)}
                            >
                              {duration}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2.5 justify-between items-start pr-1.5  text-base font-medium leading-5 text-center whitespace-nowrap text-zinc-600">
                {/* Your other elements */}
                {isOpen ? null : (
                  <div className="flex flex-col flex-1  justify-center self-stretch px-0.5 py-px rounded bg-zinc-800">
                    <button
                      className="z-10 justify-center px-10  py-3 rounded transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-500 hover:text-white"
                      onClick={handlePost}
                    >
                      Post
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
