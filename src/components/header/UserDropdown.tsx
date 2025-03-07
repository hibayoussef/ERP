import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const UserDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      {/* Profile Image Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="rounded-full w-10 h-10 bg-gray-200 flex items-center justify-center ml-auto"
      >
        👤
      </button>

      {/* Sidebar Dropdown */}
      {isDropdownOpen && (
        <div className="fixed right-0 top-13 h-full w-96 bg-white shadow-xl border-l border-gray-200 z-50 flex flex-col">
          {/* Close Button */}
          <button
            onClick={() => setIsDropdownOpen(false)}
            className="absolute top-4 left-4 text-gray-600 text-2xl"
          >
            <IoClose />
          </button>

          <div className="mt-16 p-4 space-y-4">
            {/* User Section */}
            <div className="p-4 border-b border-gray-200">
              <div className="font-semibold text-gray-800">drghamdakhol</div>
              <div className="text-sm text-gray-600">
                drghamdakhol@samtech.net
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">User ID:</span> 876694518 •
                <span className="font-medium"> Organization ID:</span> 876692891
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
              <a
                href="#"
                className="block text-blue-600 hover:underline text-sm"
              >
                What’s New? →
              </a>
              <a
                href="#"
                className="block text-blue-600 hover:underline text-sm"
              >
                Essential guides for your business →
              </a>
              <a
                href="#"
                className="block text-blue-600 hover:underline text-sm"
              >
                Navigate faster with keyboard shortcuts →
              </a>
              <a
                href="#"
                className="block text-blue-600 hover:underline text-sm"
              >
                Download the mobile app →
              </a>
              <a
                href="#"
                className="block text-blue-600 hover:underline text-sm"
              >
                Work simpler with Windows app →
              </a>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Web: https://www.schmit.edu/ (cdn/School)
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
