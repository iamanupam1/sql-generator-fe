import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const BaseLayout = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 min-h-screen w-full">
      <div
        className="mx-auto px-4 sm:px-6 py-6 pt-[116px]
    max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl xl:max-w-7xl"
      >
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default BaseLayout;
