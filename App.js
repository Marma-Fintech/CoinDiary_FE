import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Walkthrough1 from "./components/Walkthrough1";
import Walkthrough2 from "./components/Walkthrough2";
import Walkthrough3 from "./components/Walkthrough3";
import LoaderCoindiary from "./components/LoaderCoindiary";
import GetStarted from "./components/GetStarted";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Verification from "./components/Verification";
import VerifyEmail from "./components/VerifyEmail";
import Home from "./components/Home";
import PasswordChange from "./components/PasswordChange";
import PasswordUpdated from "./components/PasswordUpdated";
import CreateaccountVerification from "./components/CreateaccountVerification";
import VerifyEmailCreateAccount from "./components/VerifyEmailCreateAccount";
import Profile from "./components/Profile";
import OnboardingCompleted from "./components/OnboardingCompleted";
import CreatePost from "./components/CreatePost";
import { ThemeProvider } from "./components/ThemeContext";
import GoogleSuccessRedirect from "./components/GoogleSuccessRedirect";
import axios from "axios";
import DateOfBirth from "./components/DateOfBirth";
import Gender from "./components/Gender";
import ProfilePic from "./components/ProfilePic";
import Interest from "./components/Interest";
import PeriodSlider from "./components/PeriodSlider";
import TradeView from "./components/TradeView";
import Avataaar from "./components/Avatar";
import { GithuFork } from "./components/style";
import { Avatar } from "avataaars";

function App() {
  const [Attributes, setAttributes] = useState({
    topType: "ShortHairDreads02",
    accessoriesType: "Prescription02",
    hairColor: "BrownDark",
    facialHairType: "Blank",
    clotheType: "Hoodie",
    clotheColor: "PastelBlue",
    eyeType: "Happy",
    eyebrowType: "Default",
    mouthType: "Smile",
    avatarStyle: "Circle",
    skinColor: "Light",
  });
  const location = useLocation();
  const email =
    location.state && location.state.emailOrPhone
      ? location.state.emailOrPhone
      : "";
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/walkthrough1" element={<Walkthrough1 />} />
        <Route path="/walkthrough2" element={<Walkthrough2 />} />
        <Route path="/walkthrough3" element={<Walkthrough3 />} />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/getstarted" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route
          path="/createaccountverification"
          element={<CreateaccountVerification />}
        />
        <Route
          path="/verifyemailcreateaccount"
          element={<VerifyEmailCreateAccount />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/verifyemail" element={<VerifyEmail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dateofbirth" element={<DateOfBirth />} />
        <Route path="/passwordchange" element={<PasswordChange />} />
        <Route path="/onboardingcompleted" element={<OnboardingCompleted />} />
        <Route path="/passwordupdated" element={<PasswordUpdated />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/gender" element={<Gender />} />
        <Route path="/profilepic" element={<ProfilePic />} />
        <Route path="/interest" element={<Interest />} />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="/periodslider" element={<PeriodSlider />} />
        <Route path="/tradeview" element={<TradeView />} />
        <Route path="/googlesuccess" element={<GoogleSuccessRedirect />} />
        <Route path="/" element={<LoaderCoindiary />} />
      </Routes>
      <div>
        <GithuFork
          href="https://bluetrends.in/"
          title="Bluetrends"
          data-ribbon="Check Bluetrends"
          target="_blank"
        >
          Check Bluetrends
        </GithuFork>
        <GithuFork
          href="https://github.com/nhemnt/react-bitmoji"
          title="Fork me on GitHub"
          data-ribbon="Fork me on GitHub"
        >
          Fork me on GitHub
        </GithuFork>
        <Avataaar value={Attributes} onChange={setAttributes} />
      </div>
    </ThemeProvider>
  );
}

export default App;
