import { useState } from "react";

const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile Image Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center ml-auto"
      >
        👤
      </button>

      {/* Dropdown Content */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 m-30  bg-white rounded-lg shadow-xl border border-gray-200 origin-top-right">
          {/* User Section */}
          <div className="p-4 border-b border-gray-200">
            <div className="font-semibold text-gray-800">dighamdakhol</div>
            <div className="text-sm text-gray-600">
              dighamdakhol@samtech.net
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="font-medium">User ID:</span> 876684518 •
              <span className="font-medium"> Organization ID:</span> 876682891
            </div>
          </div>

          {/* My Account Section */}
          <div className="p-4 border-b border-gray-200">
            <div className="text-gray-800 hover:bg-gray-50 p-2 rounded cursor-pointer">
              My Account
            </div>
            <div className="text-red-600 hover:bg-gray-50 p-2 rounded cursor-pointer">
              Sign Out
            </div>
          </div>

          {/* Trial Section */}
          <div className="p-4 border-b border-gray-200">
            <div className="text-sm font-medium text-red-600">
              Your free trial is over
            </div>
          </div>

          {/* Links Section */}
          <div className="p-4 space-y-4">
            <a href="#" className="block text-blue-600 hover:underline text-sm">
              What’s New? →
            </a>
            <a href="#" className="block text-blue-600 hover:underline text-sm">
              Essential guides for your business →
            </a>
            <a href="#" className="block text-blue-600 hover:underline text-sm">
              Navigate faster with keyboard shortcuts →
            </a>
            <a href="#" className="block text-blue-600 hover:underline text-sm">
              Download the mobile app →
            </a>
            <a href="#" className="block text-blue-600 hover:underline text-sm">
              Work simpler with Windows app →
            </a>
          </div>

          {/* School Link */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="text-xs text-gray-500">
              Web: https://www.schmit.edu/ (cdn/School)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
