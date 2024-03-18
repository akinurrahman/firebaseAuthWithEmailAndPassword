import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/auth files/SignUp";
import LogIn from "./components/auth files/LogIn";
import { Toaster } from "react-hot-toast";
import DisplayUserInfo from "./components/DisplayUserInfo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/displaycontent" element={<DisplayUserInfo />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
