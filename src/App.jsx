import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsOfUseUrl from "./Pages/TermsOfUseUrl";
import ModalControl from "./Pages/Payments";

const App = () => {
  return (
    <div className=" flex items-center justify-center h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<TermsOfUseUrl />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/payment" element={<ModalControl />}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </div>
  );
};

export default App;
