import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaRegSun, FaMoon } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "./ThemeContext";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState("dark");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const hideLoader = () => {
    setShowLoader(false);
    document.body.style.overflow = "visible";
  };

  const showLoaderAndDisableScroll = () => {
    setShowLoader(true);
    document.body.style.overflow = "hidden";
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };
  // Function to validate form fields
  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!emailOrPhone) {
      errors.email = "Email or phone number is required.";
      isValid = false;
    } else if (
      emailOrPhone.includes("@") &&
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailOrPhone)
    ) {
      errors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!password) {
      errors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    showLoaderAndDisableScroll();

    if (!emailOrPhone || !password) {
      // Show error toast for empty fields
      toast.error("Email/Phone and Password are required");
      hideLoader();
      return;
    }
    if (!validateForm()) return; // Exit if form is invalid

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: emailOrPhone,
        password: password,
      });

      console.log("Login Response:", response.data);

      // Extract the token from the response
      const token = response.data.user.token;

      // Store the token in local storage
      localStorage.setItem("tkn", token);

      // Redirect to the home page
      navigate("/home");

      // Show success toast
      toast.success("Login successful");

      // Redirect to the home page or any desired route
    } catch (error) {
      console.error("Login Error:", error.response.data);

      // Show error toast
      toast.error("Invalid credentials");

      // Handle error, for example, show an error message to the user
    } finally {
      hideLoader();
    }
  };
  const backgroundColorClass = theme === "dark" ? "bg-black" : "bg-white";
  const textColorClass = theme === "dark" ? "text-white" : "text-black";
  const textInputColorClass = theme === "dark" ? "text-gray-400" : "text-black";
  const inputBgcolor = theme === "dark" ? "bg-black" : "bg-gray-200";
  const borderClass = theme === "light" ? "border border-red-900" : "";
  const buttonColorClass = theme === "dark" ? "bg-rose-600" : "bg-red-900";

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
      <form onSubmit={handleLogin}>
        <div className="flex w-full flex-col px-6">
          <div className="self-center flex items-start justify-between gap-2">
            <div className=" self-stretch flex w-[124px] shrink-0 h-[35px] flex-col rounded-2xl" />
          </div>

          <div
            className={`text-black ml-[48px] text-3xl font-medium self-stretch mt-11 ${textColorClass}`}
          >
            Log in to your Account!
          </div>
          <div
            className={`text-black ml-[48px] text-sm leading-5 self-stretch mt-3.5 ${textColorClass}`}
          >
            So, that you can educate people about “crypto”
          </div>

          <div
            className={`text-black text-left text-sm leading-5 ml-[45px] mt-5 relative ${textInputColorClass}`}
          >
            <label htmlFor="email">Email or Phone number</label>
            <div
              className={`relative aspect-[6.63] aspect-h-1 rounded-md bg-black text-white border border-gray-700/90 focus:outline-none overflow-hidden self-center max-w-[345px] mt-3.5 pr-10 ${borderClass} ${inputBgcolor} ${textColorClass}  `} //${borderClass} ${inputBgcolor} ${textColorClass}
            >
              <input
                id="email"
                type="email"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Email or Phone Number"
                className={`w-full h-full  text-black border-none outline-none pl-3 pr-10 ${textInputColorClass} ${inputBgcolor}`}
              />
              <div className="absolute top-0 right-0 h-full flex items-center pr-3 cursor-pointer">
                <div className="border-r border-gray-700 mr-4 h-10 mx-2"></div>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-gray-500 text-base"
                />
              </div>
            </div>
            {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
          </div>

          <div
            className={`text-black text-left text-sm leading-5 ml-[45px] mt-5 relative ${textInputColorClass} `}
          >
            <label htmlFor="password">Password</label>
            <div
              className={`relative aspect-[6.63] aspect-h-1  rounded-md bg-black text-white border border-gray-700/90 focus:outline-none overflow-hidden self-center max-w-[345px] mt-3.5 pr-10 ${borderClass} ${inputBgcolor} ${textColorClass} `} //${borderClass} ${inputBgcolor} ${textColorClass} ${textInputColorClass}
            >
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`w-full h-full  text-black border-none outline-none pl-3 pr-10 ${textInputColorClass} ${inputBgcolor} `}
              />
              <div
                className="absolute top-0 right-0 h-full flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <div className="border-r border-gray-700 mr-4 h-10 mx-2"></div>
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className={`text-gray-500 text-base `}
                />
              </div>
            </div>
            {errors.password && (
              <div style={{ color: "red" }}>{errors.password}</div>
            )}
          </div>

          <div className="self-stretch flex w-full justify-between gap-5 mt-4 items-start">
            <div className="ml-12 bg-opacity-80 flex items-center ">
              <input
                type="checkbox"
                id="rememberMe"
                className={`mr-2 appearance-none  bg-black border border-[color:var(--Stoke,rgba(255,255,255,0.40))] checked:bg-white checked:border-transparent rounded-md w-4 h-4 ${inputBgcolor} ${borderClass}  `}
              />
              <label
                htmlFor="rememberMe"
                className={`text-black text-sm leading-5 ${textColorClass} `}
              >
                Remember me
              </label>
            </div>

            <a
              href="/forgotpassword"
              className={`text-black text-center text-sm leading-5 ml-8 flex-1 ${textColorClass}`}
            >
              Forget Password?
            </a>
          </div>

          <div
            className={`bg-red-600 text-white font-bold  self-center flex w-full max-w-[315px]  flex-col justify-center items-stretch mt-10 p-4 rounded-lg ${textColorClass} ${buttonColorClass}`}
          >
            <button type="submit">Login</button>
          </div>
        </div>
        <div className="flex-col overflow-hidden relative flex aspect-[1.4290909090909092] w-full items-stretch mt-2 pt-2.5 pb-12 px-16">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/779384998add135e0cbcedecb7bbc8faa99b47f2a6cacf5438cc896b0ae0d531?"
            className="absolute h-full w-full object-cover object-center inset-0"
          />
          <div className="relative items-stretch flex justify-between gap-2 mb-36">
            <div
              className={`text-black text-center text-sm leading-5 grow whitespace-nowrap ${textColorClass}`}
            >
              Don’t have an account?
            </div>
            <a
              href="/createaccount"
              className={`text-black text-center text-sm font-bold leading-5 grow whitespace-nowrap ${textColorClass}`}
            >
              Create account
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { FaRegSun, FaMoon } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useTheme } from "./ThemeContext";
// import {
//   faEnvelope,
//   faEye,
//   faEyeSlash,
//   faUser,
// } from "@fortawesome/free-solid-svg-icons";

// const Login = () => {
//   const [showLoader, setShowLoader] = useState(true);
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const { theme, toggleTheme } = useTheme();
//   const [mode, setMode] = useState("dark");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const hideLoader = () => {
//     setShowLoader(false);
//     document.body.style.overflow = "visible";
//   };

//   const showLoaderAndDisableScroll = () => {
//     setShowLoader(true);
//     document.body.style.overflow = "hidden";
//   };
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // const handleLogin = async (e) => {
//   //   e.preventDefault();
//   //   showLoaderAndDisableScroll();

//   //   if (!emailOrPhone || !password) {
//   //     // Show error toast for empty fields
//   //     toast.error("Email/Phone and Password are required");
//   //     hideLoader();
//   //     return;
//   //   }

//   //   try {
//   //     const response = await axios.post("http://localhost:3000/login", {
//   //       email: emailOrPhone,
//   //       password: password,
//   //     });

//   //     console.log("Login Response:", response.data);

//   //     // const userData = response.data; // Assuming response.data contains user data
//   //     // localStorage.setItem("tkn", userData.user.token);
//   //     // localStorage.setItem("userData", JSON.stringify(userData));

//   //     // Redirect to the home page
//   //     navigate("/home");

//   //     // Show success toast
//   //     toast.success("Login successful");

//   //     // Redirect to the home page or any desired route
//   //   } catch (error) {
//   //     console.error("Login Error:", error.response.data);

//   //     // Show error toast
//   //     toast.error("Invalid credentials");

//   //     // Handle error, for example, show an error message to the user
//   //   } finally {
//   //     hideLoader();
//   //   }
//   // };
//   const toggleMode = () => {
//     setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
//   };
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     showLoaderAndDisableScroll();

//     if (!emailOrPhone || !password) {
//       // Show error toast for empty fields
//       toast.error("Email/Phone and Password are required");
//       hideLoader();
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:3000/login", {
//         email: emailOrPhone,
//         password: password,
//       });

//       console.log("Login Response:", response.data);

//       // Extract the token from the response
//       const token = response.data.user.token;

//       // Store the token in local storage
//       localStorage.setItem("tkn", token);

//       // Redirect to the home page
//       navigate("/home");

//       // Show success toast
//       toast.success("Login successful");

//       // Redirect to the home page or any desired route
//     } catch (error) {
//       console.error("Login Error:", error.response.data);

//       // Show error toast
//       toast.error("Invalid credentials");

//       // Handle error, for example, show an error message to the user
//     } finally {
//       hideLoader();
//     }
//   };
//   const backgroundColorClass = theme === "dark" ? "bg-black" : "bg-white";
//   const textColorClass = theme === "dark" ? "text-white" : "text-black";
//   const textInputColorClass = theme === "dark" ? "text-gray-400" : "text-black";
//   const inputBgcolor = theme === "dark" ? "bg-black" : "bg-gray-200";
//   const borderClass = theme === "light" ? "border border-red-900" : "";
//   const buttonColorClass = theme === "dark" ? "bg-rose-600" : "bg-red-900";

//   return (
//     <div
//       className={`${backgroundColorClass} ${borderClass} flex max-w-[480px] w-full flex-col justify-center items-stretch mx-auto ${
//         showLoader ? " h-screen overflow-hidden" : ""
//       }`}
//       style={{ position: "relative" }} // Ensure the border is visible by applying relative positioning
//     >
//       <button
//         onClick={toggleTheme}
//         style={{
//           position: "fixed",
//           top: 20,
//           right: 20,
//           background: "none",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         {theme === "dark" ? (
//           <FaRegSun color="#FFA500" size="24" />
//         ) : (
//           <FaMoon color="#000" size="24" />
//         )}
//       </button>
//       <form onSubmit={handleLogin}>
//         <div className="flex w-full flex-col px-6">
//           <div className="self-center flex items-start justify-between gap-2">
//             <div className=" self-stretch flex w-[124px] shrink-0 h-[35px] flex-col rounded-2xl" />
//           </div>

//           <div
//             className={`text-black ml-[48px] text-3xl font-medium self-stretch mt-11 ${textColorClass}`}
//           >
//             Log in to your Account!
//           </div>
//           <div
//             className={`text-black ml-[48px] text-sm leading-5 self-stretch mt-3.5 ${textColorClass}`}
//           >
//             So, that you can educate people about “crypto”
//           </div>
//           {/* <label
//             htmlFor="email"
//             className={`text-black text-left text-sm leading-5 ml-[46px] mt-5 ${textInputColorClass}`}
//           >
//             Email or Phone Number
//           </label>
//           <input
//             id="email"
//             type="email"
//             value={emailOrPhone}
//             onChange={(e) => setEmailOrPhone(e.target.value)}
//             className={`aspect-[6.63] rounded-md bg-black text-black border border-gray-700/90 focus:outline-none object-contain object-center w-[345px] justify-center items-center overflow-hidden self-center max-w-[345px] mt-3.5 ${borderClass} ${inputBgcolor} ${textColorClass}`}
//           /> */}
//           {/* <label
//             htmlFor="password"
//             className={`text-black text-left text-sm leading-5 ml-[46px] mt-5 ${textInputColorClass}`}
//           >
//             Password
//           </label>
//           <input
//             id="password"
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className={` relative aspect-[6.63] rounded-md bg-black text-black border border-gray-700/90 focus:outline-none object-contain object-center w-[345px] justify-center items-center overflow-hidden self-center max-w-[345px] mt-3.5 ${borderClass} ${inputBgcolor} ${textColorClass}`}
//           />
//           <div
//             className="absolute top-0 right-0 h-full flex items-center pr-3 cursor-pointer"
//             onClick={togglePasswordVisibility}
//           >
//             <div className="border-r border-gray-700 mr-4 h-10 mx-2"></div>
//             <FontAwesomeIcon
//               icon={showPassword ? faEye : faEyeSlash}
//               className="text-gray-500 text-base"
//             />
//           </div> */}
//           <div
//             className={`text-black text-left text-sm leading-5 ml-[45px] mt-5 relative ${textInputColorClass}`}
//           >
//             <label htmlFor="email">Email or Phone number</label>
//             <div
//               className={`relative aspect-[6.63] aspect-h-1 rounded-md bg-black text-white border border-gray-700/90 focus:outline-none overflow-hidden self-center max-w-[345px] mt-3.5 pr-10 ${borderClass} ${inputBgcolor} ${textColorClass}  `} //${borderClass} ${inputBgcolor} ${textColorClass}
//             >
//               <input
//                 id="email"
//                 type="email"
//                 value={emailOrPhone}
//                 onChange={(e) => setEmailOrPhone(e.target.value)}
//                 className={`w-full h-full  text-black border-none outline-none pl-3 pr-10 ${textInputColorClass} ${inputBgcolor}`}
//               />
//               <div className="absolute top-0 right-0 h-full flex items-center pr-3 cursor-pointer">
//                 <div className="border-r border-gray-700 mr-4 h-10 mx-2"></div>
//                 <FontAwesomeIcon
//                   icon={faEnvelope}
//                   className="text-gray-500 text-base"
//                 />
//               </div>
//             </div>
//           </div>

//           <div
//             className={`text-black text-left text-sm leading-5 ml-[45px] mt-5 relative ${textInputColorClass} `}
//           >
//             <label htmlFor="password">Password</label>
//             <div
//               className={`relative aspect-[6.63] aspect-h-1  rounded-md bg-black text-white border border-gray-700/90 focus:outline-none overflow-hidden self-center max-w-[345px] mt-3.5 pr-10 ${borderClass} ${inputBgcolor} ${textColorClass} `} //${borderClass} ${inputBgcolor} ${textColorClass} ${textInputColorClass}
//             >
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={`w-full h-full  text-black border-none outline-none pl-3 pr-10 ${textInputColorClass} ${inputBgcolor} `}
//               />
//               <div
//                 className="absolute top-0 right-0 h-full flex items-center pr-3 cursor-pointer"
//                 onClick={togglePasswordVisibility}
//               >
//                 <div className="border-r border-gray-700 mr-4 h-10 mx-2"></div>
//                 <FontAwesomeIcon
//                   icon={showPassword ? faEye : faEyeSlash}
//                   className={`text-gray-500 text-base `}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="self-stretch flex w-full justify-between gap-5 mt-4 items-start">
//             <div className="ml-12 bg-opacity-80 flex items-center ">
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 className={`mr-2 appearance-none  bg-black border border-[color:var(--Stoke,rgba(255,255,255,0.40))] checked:bg-white checked:border-transparent rounded-md w-4 h-4 ${inputBgcolor} ${borderClass}  `}
//               />
//               <label
//                 htmlFor="rememberMe"
//                 className={`text-black text-sm leading-5 ${textColorClass} `}
//               >
//                 Remember me
//               </label>
//             </div>

//             <a
//               href="/forgotpassword"
//               className={`text-black text-center text-sm leading-5 ml-8 flex-1 ${textColorClass}`}
//             >
//               Forget Password?
//             </a>
//           </div>

//           <div
//             className={`bg-red-600 text-white font-bold  self-center flex w-full max-w-[315px]  flex-col justify-center items-stretch mt-10 p-4 rounded-lg ${textColorClass} ${buttonColorClass}`}
//           >
//             <button type="submit">Login</button>
//           </div>
//         </div>
//         <div className="flex-col overflow-hidden relative flex aspect-[1.4290909090909092] w-full items-stretch mt-2 pt-2.5 pb-12 px-16">
//           <img
//             loading="lazy"
//             src="https://cdn.builder.io/api/v1/image/assets/TEMP/779384998add135e0cbcedecb7bbc8faa99b47f2a6cacf5438cc896b0ae0d531?"
//             className="absolute h-full w-full object-cover object-center inset-0"
//           />
//           <div className="relative items-stretch flex justify-between gap-2 mb-36">
//             <div
//               className={`text-black text-center text-sm leading-5 grow whitespace-nowrap ${textColorClass}`}
//             >
//               Don’t have an account?
//             </div>
//             <a
//               href="/createaccount"
//               className={`text-black text-center text-sm font-bold leading-5 grow whitespace-nowrap ${textColorClass}`}
//             >
//               Create account
//             </a>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;
