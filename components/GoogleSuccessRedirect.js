// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const GoogleSuccessRedirect = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     navigate("/home");
//   }, [navigate]);

//   return null;
// };

// export default GoogleSuccessRedirect;

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const GoogleSuccessRedirect = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Assuming your application's base URL is http://localhost:3001
//     window.location.href = "http://localhost:3001/home";
//   }, []);

//   return null;
// };

// export default GoogleSuccessRedirect;

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const GoogleSuccessRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/home");
    } else {
      console.error("Token not found after Google auth.");
      navigate("/login");
    }
  }, [navigate, location]);

  return null;
};

export default GoogleSuccessRedirect;
