import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DateOfBirth = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const location = useLocation();
  const { username, profileImage } = location.state || {};
  const navigate = useNavigate();

  const hideLoader = () => {
    setShowLoader(false);
    document.body.style.overflow = "visible";
  };

  const showLoaderAndDisableScroll = () => {
    setShowLoader(true);
    document.body.style.overflow = "hidden";
  };
  // Generate year options dynamically (example: 1900 - current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => 1900 + i
  ).reverse();

  // Simplified for demonstration; you might want to handle leap years, etc.
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleSubmitDob = async () => {
    // const formattedMonth = `0${months.indexOf(month) + 1}`.slice(-2);
    // const formattedDay = `0${day}`.slice(-2);

    // const dob = `${year}-${formattedMonth}-${formattedDay}`;
    const selectedMonth = month || "January";
    const selectedDay = day || "01";
    // Default to the current year if no year is selected, or adjust as needed
    const selectedYear = year || new Date().getFullYear().toString();

    // Ensure that if none of year, month, and day have been selected, we pass an empty string as dob.
    const dob =
      month || day || year
        ? `${selectedYear}-${months.indexOf(selectedMonth) + 1}-${selectedDay}`
        : "";
    const formData = new FormData();

    if (profileImage) {
      // Assuming profileImage is a File object. If it's a data URL or another format,
      // you'll need to adjust handling accordingly.
      formData.append("image", profileImage);
    }

    // formData.append("name", username);
    formData.append("dob", dob);

    try {
      const token = localStorage.getItem("tkn");
      const response = await axios.put(
        "http://localhost:3000/editUser",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Date of birth updated successfully");
        navigate("/gender");
        // Navigate or perform further actions as needed
      } else {
        toast.error("Failed to update date of birth");
      }
    } catch (error) {
      console.error("Error updating date of birth:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while updating the date of birth."
      );
    }
  };

  return (
    <div
      className={`bg-black flex max-w-[480px] w-full flex-col justify-center items-stretch mx-auto ${
        showLoader ? " h-screen overflow-hidden" : ""
      }`}
      style={{ position: "relative" }} // Ensure the border is visible by applying relative positioning
    >
      <div className="flex gap-5 items-center px-5">
        <div className="shrink-0 self-stretch  rounded-2xl h-[35px] w-[124px]" />
        <div className="flex gap-2 items-start self-stretch my-auto">]</div>
      </div>
      <div className="flex relative gap-5 mt-[-50px] justify-end self-stretch text-xs tracking-wider whitespace-nowrap text-neutral-400">
        <button className="justify-center mr-4 mt-[-45px] px-10 py-3 bg-black rounded-lg border border-solid border-neutral-400">
          Skip
        </button>
      </div>
      <div className="flex overflow-hidden relative flex-col items-center self-stretch px-5 pt-5 pb-20 mt-2 w-full text-base font-semibold text-white aspect-[0.76] stroke-[0.706px] stroke-white stroke-opacity-40">
        {/* <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/10cbed160434bcd06395a89c6e92d255abad9f02b94e6ca5ffc045180666a2c0?apiKey=a428c5db03d046848dd140902f0be6ff&"
          className="object-cover absolute inset-0 size-full"
        /> */}

        <div className="relative text-zinc-500 mt-12 text-2xl text-center">
          Date of birth
        </div>
        <div className="relative mt-5 text-sm text-center text-zinc-500">
          Select Your Correct date of birth
        </div>
        <div className="flex relative ml-10 gap-5 justify-between px-px py-1.5 mt-24 w-full text-center whitespace-nowrap max-w-[291px]">
          <div>Month</div>
          <div className="ml-8">Date</div>
          <div>Year</div>
        </div>
        <div className="flex justify-between px-4 py-1.5 mt-4 text-center max-w-[291px] mx-auto">
          {/* Month Selector */}
          <select
            className="bg-transparent text-white mr-12"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {months.map((m, index) => (
              <option key={index} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* Day Selector */}
          <select
            className="bg-transparent text-white "
            value={day}
            onChange={(e) => setDay(e.target.value)}
          >
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Year Selector */}
          <select
            className="bg-transparent text-white ml-[65px]"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col justify-center ml-20 w-full text-base font-semibold tracking-wide leading-6 text-center text-white whitespace-nowrap rounded-xl max-w-[350px]">
        <div className="flex flex-col justify-center px-0.5 py-1">
          <button
            onClick={handleSubmitDob}
            className=" bg-rose-600 justify-center items-center  py-3  rounded-xl"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateOfBirth;
