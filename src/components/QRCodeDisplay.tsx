"use client";

import React from "react";

interface QRCodeDisplayProps {
  className?: string;
  frameType?: "simple" | "classic" | "modern" | "square";
  frameColor?: string;
  frameText?: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  className = "",
  frameType = "classic",
  frameColor = "#000000",
}) => {
  // Generate a QR code pattern
  const generateQRPattern = () => {
    const pattern = [
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
      [0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
      [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
      [1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1],
      [0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1],
      [1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1],
    ];

    return pattern.flat();
  };

  const qrPattern = generateQRPattern();

  const getFrameStyles = () => {
    const baseStyles = "border-4 flex items-center justify-center p-2";

    switch (frameType) {
      case "simple":
        return `${baseStyles} border-gray-400 rounded-sm bg-white`;
      case "classic":
        return `${baseStyles} rounded-lg bg-gray-50`;
      case "modern":
        return `${baseStyles} rounded-lg bg-gradient-to-br from-blue-50 to-blue-100`;
      case "square":
        return `${baseStyles} rounded-none bg-white`;
      default:
        return `${baseStyles} border-gray-200 rounded-lg bg-white`;
    }
  };

  return (
    <div className={`qr-container w-36 h-36 ${className}`}>
      <div
        className={`${getFrameStyles()} w-full h-full`}
        style={{ borderColor: frameColor }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div
            className={`w-full h-full bg-white p-2 rounded-sm flex items-center justify-center`}
          >
            <div className="aspect-square w-full h-full grid grid-cols-17 grid-rows-17 gap-[1px]">
              {qrPattern.map((module, index) => (
                <div
                  key={index}
                  className={`qr-module rounded-[1px] aspect-square w-full h-full ${
                    module === 1 ? "bg-black" : "bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
