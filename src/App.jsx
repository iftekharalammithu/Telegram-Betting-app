import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsOfUseUrl from "./Pages/TermsOfUseUrl";

const App = () => {
  return (
    <div className=" flex items-center justify-center h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<TermsOfUseUrl />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </div>
  );
};

export default App;
