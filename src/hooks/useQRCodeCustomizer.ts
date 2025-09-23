"use client";

import { useState, useCallback } from "react";

export interface QRCodeState {
  selectedFrame: string;
  frameColor: string;
  frameText: string;
  scannability: "Excellent" | "Good" | "Poor";
}

export interface QRCodeActions {
  setSelectedFrame: (frameId: string) => void;
  setFrameColor: (color: string) => void;
  setFrameText: (text: string) => void;
  resetToDefaults: () => void;
  saveConfiguration: () => void;
}

const DEFAULT_STATE: QRCodeState = {
  selectedFrame: "frame-2",
  frameColor: "#000000",
  frameText: "SCAN ME",
  scannability: "Excellent",
};

export const useQRCodeCustomizer = (): [QRCodeState, QRCodeActions] => {
  const [state, setState] = useState<QRCodeState>(DEFAULT_STATE);

  const setSelectedFrame = useCallback((frameId: string) => {
    setState((prev) => ({ ...prev, selectedFrame: frameId }));
  }, []);

  const setFrameColor = useCallback((color: string) => {
    setState((prev) => ({ ...prev, frameColor: color }));
  }, []);

  const setFrameText = useCallback((text: string) => {
    setState((prev) => ({ ...prev, frameText: text }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  const saveConfiguration = useCallback(() => {
    // Here you could implement actual save functionality
    // For now, we'll just log the current state
    console.log("Saving QR Code configuration:", state);

    // Example: Save to localStorage
    try {
      localStorage.setItem("qr-customizer-config", JSON.stringify(state));
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }, [state]);

  const actions: QRCodeActions = {
    setSelectedFrame,
    setFrameColor,
    setFrameText,
    resetToDefaults,
    saveConfiguration,
  };

  return [state, actions];
};

// Utility function to calculate scannability based on contrast
export const calculateScannability = (
  frameColor: string,
  backgroundColor: string = "#FFFFFF"
): "Excellent" | "Good" | "Poor" => {
  // Simple contrast calculation - in a real app, you'd use a proper contrast ratio algorithm
  const getColorBrightness = (hex: string): number => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  const frameBrightness = getColorBrightness(frameColor);
  const bgBrightness = getColorBrightness(backgroundColor);
  const contrast = Math.abs(frameBrightness - bgBrightness);

  if (contrast > 150) return "Excellent";
  if (contrast > 75) return "Good";
  return "Poor";
};
