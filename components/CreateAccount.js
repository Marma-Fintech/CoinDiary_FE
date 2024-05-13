import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { FaRegSun, FaMoon } from "react-icons/fa";
import { useTheme } from "./ThemeContext";

const CreateAccount = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mode, setMode] = useState("dark");
  const navigate = useNavigate();

  // const [username, setUsername] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };
  // Validate email
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/
    );
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    let isValid = true;
    showLoaderAndDisableScroll();
    // Reset errors
    setErrors({ email: "", password: "", confirmPassword: "" });

    // Validate email
    if (!validateEmail(emailOrPhone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      isValid = false;
    }

    // Validate password length
    if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long.",
      }));
      isValid = false;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
      isValid = false;
    }

    if (!isValid) {
      return; // Stop the form submission if validation fails
    }

    const signupData = {
      // name: username,
      email: emailOrPhone, // Update this line to match the expected field name
      password,
      confirmPassword,
    };

    localStorage.setItem("signupData", JSON.stringify(signupData));

    try {
      // Send the signup request
      const response = await axios.post(
        "http://localhost:3000/signup",
        signupData
      );

      let token = await response.data.user.token;
      console.log(token);
      localStorage.setItem("tkn", token);

      if (response.status === 200) {
        // Show success toast
        toast.success("Account created successfully");
        // Redirect to the login page
        navigate("/createaccountverification", { state: { emailOrPhone } });
      } else {
        // Show error toast with the server response message
        toast.error(response.data.message || "Error creating account");
      }
    } catch (error) {
      console.error("Signup Error:", error.response.data);

      if (error.response.data.validation) {
        // If the server provides validation details, log them to the console
        console.error("Validation Errors:", error.response.data.validation);
        // Show a generic error toast
        toast.error(" Email already Exist");
      } else {
        // Show a generic error toast
        toast.error(" Email already Exist");
      }
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
  const loginButton = theme === "dark" ? "text-blue-100" : "text-blue-900";

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
      <div className="self-stretch flex w-full flex-col px-6">
        <div className="self-center flex items-start justify-between gap-2 ml-6">
          <div className=" self-stretch flex w-[124px] shrink-0 h-[35px] flex-col rounded-2xl" />
        </div>

        <div
          className={`text-black text-3xl font-medium ml-[45px]  self-stretch whitespace-nowrap mt-8 ${textColorClass}`}
        >
          Create your Account!
        </div>
        <div
          className={`text-black ml-[45px] text-sm leading-5 self-stretch mt-5 ${textColorClass}`}
        >
          So, that you can educate people about “crypto”
        </div>
      </div>

      <div
        className={`text-black text-left text-sm leading-5 ml-[68px] mt-5 relative ${textInputColorClass}`}
      ></div>

      <div
        className={`text-black text-left text-sm leading-5 ml-[68px] mt-5 relative ${textInputColorClass}`}
      >
        <label htmlFor="email">Email or Phone number</label>
        <div
          className={`relative aspect-[6.63] aspect-h-1 rounded-md bg-black text-white border border-gray-700/90 focus:outline-none overflow-hidden self-center max-w-[345px] mt-3.5 pr-10 ${borderClass} ${inputBgcolor} ${textColorClass}`}
        >
          <input
            id="email"
            type="email"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className={`w-full h-full  text-black border-none outline-none pl-3 pr-10 ${inputBgcolor} ${textInputColorClass}`}
          />

          <div className="absolute top-0 right-0 h-full flex items-center pr-3 cursor-pointer">
            <div className="border-r border-gray-700 mr-4 h-10 mx-2"></div>
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-gray-500 text-base"
            />
          </div>
        </div>
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div
        className={`text-black text-left text-sm leading-5 ml-[68px] mt-5 relative ${textInputColorClass}`}
      >
        <label htmlFor="password">Password</label>

        <div
          className={`relative aspect-[6.63] aspect-h-1 rounded-md bg-black text-white border border-gray-700/90 focus:outline-none overflow-hidden self-center max-w-[345px] mt-3.5 pr-10 ${borderClass} ${inputBgcolor} ${textColorClass}`}
        >
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full h-full  text-black border-none outline-none pl-3 pr-10 ${inputBgcolor} ${textInputColorClass}`}
          />

          <div
            className="absolute top-0 right-0 h-full flex items-center pr-3 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <div className="border-r border-gray-700 mr-4 h-10 mx-2"></div>
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="text-gray-500 text-base"
            />
          </div>
        </div>
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <div
        className={`text-black text-left text-sm leading-5 ml-[68px] mt-5 relative ${textInputColorClass}`}
      >
        <label htmlFor="confirmPassword">Confirm Password</label>
        <div
          className={`relative aspect-[6.63] aspect-h-1 rounded-md bg-black text-white border border-gray-700/90 focus:outline-none overflow-hidden self-center max-w-[345px] mt-3.5 pr-10 ${borderClass} ${inputBgcolor} ${textColorClass}`}
        >
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full h-full  text-black border-none outline-none pl-3 pr-10 ${inputBgcolor} ${textInputColorClass}`}
          />

          <div
            className="absolute top-0 right-0 h-full flex items-center pr-3 cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          >
            <div className="border-r border-gray-700 mr-4 h-10 mx-2"></div>
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEye : faEyeSlash}
              className="text-gray-500 text-base"
            />
          </div>
        </div>
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword}</p>
        )}
      </div>

      <div className="relative items-stretch self-center flex w-full max-w-[318px] flex-col mt-16 pt-0.5 pb-12 px-0.5">
        <div
          className={`bg-rose-600 flex flex-col justify-center items-stretch mb-24 p-px rounded ${textColorClass} ${buttonColorClass}`}
        >
          <a
            href=""
            className="text-white text-center text-base font-semibold leading-5 whitespace-nowrap z-[1] justify-center items-center px-16 py-5 rounded"
            onClick={(e) => handleSignup(e)}
          >
            Sign in
          </a>
        </div>
        <div
          className={`text-black font-bold  text-sm leading-5 self-center ${textInputColorClass}`}
        >
          Already have an account?{" "}
          <a
            href="/login"
            className={`text-black font-extrabold ${loginButton}`}
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;

// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   faEnvelope,
//   faEye,
//   faEyeSlash,
//   faUser,
// } from "@fortawesome/free-solid-svg-icons";
// import { toast } from "react-toastify";
// import { FaRegSun, FaMoon } from "react-icons/fa";
// import { useTheme } from "./ThemeContext";

// const CreateAccount = () => {
//   const [showLoader, setShowLoader] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const { theme, toggleTheme } = useTheme();
//   const [mode, setMode] = useState("dark");
//   const navigate = useNavigate();

//   // const [username, setUsername] = useState("");
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

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

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };
//   const toggleMode = () => {
//     setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     showLoaderAndDisableScroll();

//     // if (!username || !emailOrPhone || !password || !confirmPassword) {
//     //   // Show error toast for empty fields
//     //   toast.error("All fields are required");
//     //   hideLoader();
//     //   return;
//     // }
//     // if (emailOrPhone || !password || !confirmPassword) {
//     //   // Show error toast for empty fields
//     //   toast.error("All fields are required");
//     //   hideLoader();
//     //   return;
//     // }

//     const signupData = {
//       // name: username,
//       email: emailOrPhone, // Update this line to match the expected field name
//       password,
//       confirmPassword,
//     };

//     localStorage.setItem("signupData", JSON.stringify(signupData));

//     try {
//       // Send the signup request
//       const response = await axios.post(
//         "http://localhost:3000/signup",
//         signupData
//       );

//       let token = await response.data.user.token;
//       console.log(token);
//       localStorage.setItem("tkn", token);

//       if (response.status === 200) {
//         // Show success toast
//         toast.success("Account created successfully");
//         // Redirect to the login page
//         navigate("/createaccountverification", { state: { emailOrPhone } });
//       } else {
//         // Show error toast with the server response message
//         toast.error(response.data.message || "Error creating account");
//       }
//     } catch (error) {
//       console.error("Signup Error:", error.response.data);

//       if (error.response.data.validation) {
//         // If the server provides validation details, log them to the console
//         console.error("Validation Errors:", error.response.data.validation);
//         // Show a generic error toast
//         toast.error(" Email already Exist");
//       } else {
//         // Show a generic error toast
//         toast.error(" Email already Exist");
//       }
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
//   const loginButton = theme === "dark" ? "text-blue-100" : "text-blue-900";

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
//       <div className="self-stretch flex w-full flex-col px-6">
//         <div className="self-center flex items-start justify-between gap-2 ml-6">
//           <div className=" self-stretch flex w-[124px] shrink-0 h-[35px] flex-col rounded-2xl" />
//         </div>

//         <div
//           className={`text-black text-3xl font-medium ml-[45px]  self-stretch whitespace-nowrap mt-8 ${textColorClass}`}
//         >
//           Create your Account!
//         </div>
//         <div
//           className={`text-black ml-[45px] text-sm leading-5 self-stretch mt-5 ${textColorClass}`}
//         >
//           So, that you can educate people about “crypto”
//         </div>
//       </div>

//       <div
//         className={`text-black text-left text-sm leading-5 ml-[68px] mt-5 relative ${textInputColorClass}`}
//       >
//         {/* <label htmlFor="name">Username</label> */}
//         {/* <div
//           className={`relative aspect-[6.63] aspect-h-1 rounded-md bg-black text-white border border-gray-700/90 focus:outline-none overflow-hidden self-center max-w-[345px] mt-3.5 pr-10 ${borderClass} ${inputBgcolor} ${textColorClass}`}
//         >
//           <input
//             id="name"
//             type="name"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className={`w-full h-full  text-black border-none outline-none pl-3 pr-10 ${inputBgcolor} ${textInputColorClass}`}
//           />
//           <div className="absolute top-0 right-0 h-full flex items-center pr-3 cursor-pointer">
//             <div className="border-r border-gray-700 mr-4 h-10 mx-2"></div>
//             <FontAwesomeIcon
//               icon={faUser}
//               className="text-gray-500 text-base"
//             />
//           </div>
//         </div> */}
//       </div>

//       <div
//         className={`text-black text-left text-sm leading-5 ml-[68px] mt-5 relative ${textInputColorClass}`}
//       >
//         <label htmlFor="email">Email or Phone number</label>
//         <div
//           className={`relative aspect-[6.63] aspect-h-1 rounded-md bg-black text-white border border-gray-700/90 focus:outline-none overflow-hidden self-center max-w-[345px] mt-3.5 pr-10 ${borderClass} ${inputBgcolor} ${textColorClass}`}
//         >
//           <input
//             id="email"
//             type="email"
//             value={emailOrPhone}
//             onChange={(e) => setEmailOrPhone(e.target.value)}
//             className={`w-full h-full  text-black border-none outline-none pl-3 pr-10 ${inputBgcolor} ${textInputColorClass}`}
//           />
//           <div className="absolute top-0 right-0 h-full flex items-center pr-3 cursor-pointer">
//             <div className="border-r border-gray-700 mr-4 h-10 mx-2"></div>
//             <FontAwesomeIcon
//               icon={faEnvelope}
//               className="text-gray-500 text-base"
//             />
//           </div>
//         </div>
//       </div>

//       <div
//         className={`text-black text-left text-sm leading-5 ml-[68px] mt-5 relative ${textInputColorClass}`}
//       >
//         <label htmlFor="password">Password</label>
//         <div
//           className={`relative aspect-[6.63] aspect-h-1 rounded-md bg-black text-white border border-gray-700/90 focus:outline-none overflow-hidden self-center max-w-[345px] mt-3.5 pr-10 ${borderClass} ${inputBgcolor} ${textColorClass}`}
//         >
//           <input
//             id="password"
//             type={showPassword ? "text" : "password"}
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className={`w-full h-full  text-black border-none outline-none pl-3 pr-10 ${inputBgcolor} ${textInputColorClass}`}
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
//           </div>
//         </div>
//       </div>

//       <div
//         className={`text-black text-left text-sm leading-5 ml-[68px] mt-5 relative ${textInputColorClass}`}
//       >
//         <label htmlFor="confirmPassword">Confirm Password</label>
//         <div
//           className={`relative aspect-[6.63] aspect-h-1 rounded-md bg-black text-white border border-gray-700/90 focus:outline-none overflow-hidden self-center max-w-[345px] mt-3.5 pr-10 ${borderClass} ${inputBgcolor} ${textColorClass}`}
//         >
//           <input
//             id="confirmPassword"
//             type={showConfirmPassword ? "text" : "password"}
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className={`w-full h-full  text-black border-none outline-none pl-3 pr-10 ${inputBgcolor} ${textInputColorClass}`}
//           />
//           <div
//             className="absolute top-0 right-0 h-full flex items-center pr-3 cursor-pointer"
//             onClick={toggleConfirmPasswordVisibility}
//           >
//             <div className="border-r border-gray-700 mr-4 h-10 mx-2"></div>
//             <FontAwesomeIcon
//               icon={showConfirmPassword ? faEye : faEyeSlash}
//               className="text-gray-500 text-base"
//             />
//           </div>
//         </div>
//       </div>

//       <div className="relative items-stretch self-center flex w-full max-w-[318px] flex-col mt-16 pt-0.5 pb-12 px-0.5">
//         <div
//           className={`bg-rose-600 flex flex-col justify-center items-stretch mb-24 p-px rounded ${textColorClass} ${buttonColorClass}`}
//         >
//           <a
//             href=""
//             className="text-white text-center text-base font-semibold leading-5 whitespace-nowrap z-[1] justify-center items-center px-16 py-5 rounded"
//             onClick={(e) => handleSignup(e)}
//           >
//             Sign in
//           </a>
//         </div>
//         <div
//           className={`text-black font-bold  text-sm leading-5 self-center ${textInputColorClass}`}
//         >
//           Already have an account?{" "}
//           <a
//             href="/login"
//             className={`text-black font-extrabold ${loginButton}`}
//           >
//             Login
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateAccount;
