"use client";

import { useRef } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import FrameIcon from "@/components/FrameIcon";
import {
  useQRCodeCustomizer,
  calculateScannability,
} from "@/hooks/useQRCodeCustomizer";

interface FrameTemplate {
  id: string;
  name: string;
  type: "simple" | "classic" | "modern" | "square";
  isSelected: boolean;
}

export default function Home() {
  const [qrState, qrActions] = useQRCodeCustomizer();
  const scrollRef = useRef<HTMLDivElement>(null);
  const scannability = calculateScannability(qrState.frameColor);

  const frameTemplates: FrameTemplate[] = [
    {
      id: "frame-1",
      name: "Simple Frame",
      type: "simple",
      isSelected: qrState.selectedFrame === "frame-1",
    },
    {
      id: "frame-2",
      name: "Classic Frame",
      type: "classic",
      isSelected: qrState.selectedFrame === "frame-2",
    },
    {
      id: "frame-3",
      name: "Modern Frame",
      type: "modern",
      isSelected: qrState.selectedFrame === "frame-3",
    },
    {
      id: "frame-5",
      name: "Square Frame",
      type: "square",
      isSelected: qrState.selectedFrame === "frame-5",
    },
  ];

  const handleFrameSelect = (frameId: string) => {
    qrActions.setSelectedFrame(frameId);
  };

  const resetDesign = () => {
    qrActions.resetToDefaults();
  };

  const saveChanges = () => {
    qrActions.saveConfiguration();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 shadow-sm">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center">
          Customize QR Code
        </h1>
      </div>

      {/* Sticky QR Preview */}
      <div className="sticky top-15 bg-white shadow-sm z-20 px-4 py-2">
        <div className="bg-white p-2">
          <h2 className="text-xs text-center sm:text-sm md:text-base font-bold text-gray-800 uppercase tracking-wide">
            Preview
          </h2>

          <div className="bg-white p-2 text-center relative">
            {/* QR Code */}
            <div className="inline-block">
              <QRCodeDisplay
                frameType={
                  frameTemplates.find((t) => t.id === qrState.selectedFrame)
                    ?.type || "classic"
                }
                frameColor={qrState.frameColor}
                frameText={qrState.frameText}
              />
            </div>

            {/* App Store Button */}
            <div className="mt-2">
              <div className="inline-flex items-center bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-sm mr-2 flex items-center justify-center">
                  <span className="text-black text-[8px] sm:text-[10px] font-bold">
                    A
                  </span>
                </div>
                GET THE APP
              </div>
            </div>

            {/* Scannability Indicator */}
            <div className="bg-[#beeed6] px-4 py-1 mt-3 inline-flex">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <div
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                    scannability === "Excellent"
                      ? "bg-green-500"
                      : scannability === "Good"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                ></div>
                <span
                  className={`text-[10px] sm:text-xs lg:text-sm font-semibold text-gray-900`}
                >
                  <span className=" ">Scannability: </span>
                  {scannability}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-3 justify-center">
            <button
              onClick={resetDesign}
              className="inline-flex border border-gray-300 items-center justify-center text-gray-900 px-4 py-1 rounded-full font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base"
            >
              <RotateCcw size={16} className="sm:w-5 sm:h-5 mr-2" />
              RESET DESIGN
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Template Selection */}
        <div className="bg-white rounded-lg border border-gray-200 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 shadow-sm">
          <h3 className="text-3xl lg:text-4xl pb-2 font-semibold text-gray-800 mb-3 sm:mb-6 border-b border-b-gray-200">
            Start with a template
          </h3>

          <div
            ref={scrollRef}
            className="flex space-x-3 sm:space-x-4 lg:space-x-5 overflow-x-auto pb-4 sm:pb-6 scrollbar-hide horizontal-scroll"
          >
            {frameTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => handleFrameSelect(template.id)}
                className={`flex-shrink-0 w-16 h-12 xs:w-18 xs:h-14 sm:w-20 sm:h-16 md:w-22 md:h-18 lg:w-24 lg:h-20 border-2 rounded-lg flex items-center justify-center transition-all touch-button ${
                  qrState.selectedFrame === template.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
                aria-label={`Select ${template.name}`}
              >
                <FrameIcon
                  type={template.type}
                  isSelected={qrState.selectedFrame === template.id}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Frame Customization */}
        <div className="bg-white rounded-lg border border-gray-200 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 shadow-sm space-y-6 sm:space-y-8">
          {/* Frame Section */}
          <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-sm">
            <div className="flex gap-3">
              {/* Frame Color */}
              <div className="relative">
                <label className="block absolute -top-2 left-12 sm:left-18 font-semibold bg-white text-sm text-gray-700 sm:mb-3">
                  Frame Color
                </label>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <input
                    type="color"
                    value={qrState.frameColor}
                    onChange={(e) => qrActions.setFrameColor(e.target.value)}
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={qrState.frameColor}
                    onChange={(e) => qrActions.setFrameColor(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base"
                    placeholder="#000000"
                  />
                </div>
              </div>

              {/* Frame Text */}
              <div className="relative">
                <label className="block absolute -top-2 left-3 font-semibold bg-white text-sm text-gray-700 mb-2 sm:mb-3">
                  Frame Text
                </label>
                <input
                  type="text"
                  value={qrState.frameText}
                  onChange={(e) => qrActions.setFrameText(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm sm:text-base"
                  placeholder="SCAN ME"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex fixed left-0 bottom-0 bg-white rounded-lg border border-gray-200 p-3 shadow-sm justify-between w-full">
            <button className="border inline-flex justify-center items-center border-gray-300 text-gray-700 px-4 py-1 rounded-full font-medium hover:bg-gray-200 transition-colors text-sm sm:text-base">
              CANCEL
            </button>
            <button
              onClick={saveChanges}
              className="inline-flex justify-center items-center bg-blue-500 text-white px-4 py-1 rounded-full font-medium hover:bg-blue-600 transition-colors text-sm sm:text-base"
            >
              SAVE CHANGES{" "}
              <ChevronDown
                size={32}
                className="w-8 h-8 ml-2 border-l border-white pl-2"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
