"use client";

import React from "react";

interface FrameIconProps {
  type: "simple" | "classic" | "modern" | "square";
  isSelected?: boolean;
}

const FrameIcon: React.FC<FrameIconProps> = ({ type, isSelected = false }) => {
  const renderIcon = () => {
    const baseSize =
      "w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10";
    const innerSize =
      "w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5";

    switch (type) {
      case "simple":
        return (
          <div
            className={`${baseSize} border-2 border-gray-400 rounded-sm flex items-center justify-center`}
          >
            <div className={`${innerSize} bg-gray-600 rounded-sm`}></div>
          </div>
        );

      case "classic":
        return (
          <div
            className={`${baseSize} border-2 border-gray-400 rounded-lg flex items-center justify-center bg-gray-50`}
          >
            <div
              className={`${innerSize} bg-gray-800 rounded-sm border border-gray-300`}
            ></div>
          </div>
        );

      case "modern":
        return (
          <div
            className={`${baseSize} bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center`}
          >
            <div className={`${innerSize} bg-white rounded-sm`}></div>
          </div>
        );

      case "square":
        return (
          <div
            className={`${baseSize} border-2 border-gray-400 rounded-none flex items-center justify-center bg-white`}
          >
            <div className={`${innerSize} bg-gray-800 rounded-none`}></div>
          </div>
        );

      default:
        return <div className={`${baseSize} bg-gray-200 rounded`}></div>;
    }
  };

  return (
    <div className={`p-2 transition-all ${isSelected ? "scale-110" : ""}`}>
      {renderIcon()}
    </div>
  );
};

export default FrameIcon;
