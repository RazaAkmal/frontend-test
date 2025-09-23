import React from "react";
import { ArrowLeft, User, Bell } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full h-16 shadow-lg z-10 bg-white p-4 flex justify-between items-center">
      <div className="flex items-center justify-between flex-1">
        <div className="flex items-center space-x-2">
          <div className="bg-[#55bbf9] w-8 h-8 rounded-sm"></div>
          <span className="bg-[#55bbf9] text-white text-xs font-medium px-2 py-1 rounded-sm">
            PRO
          </span>
          <ArrowLeft className="ml-8 text-[#55bbf9]" />
        </div>
        <div className="flex items-center space-x-5">
          <User className="text-[#55bbf9]" />
          {/* add vertical divider */}
          <div className="w-0.5 h-6 bg-gray-300 rounded-full" />
          <Bell className="text-[#55bbf9]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
