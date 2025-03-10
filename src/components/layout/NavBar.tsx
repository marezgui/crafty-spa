import { useState } from "react";
import { Sidebar } from "./SideBar";
import { ToggleButton } from "./ToggleButton";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onToggle = () => setIsOpen(!isOpen);
  const onClose = () => setIsOpen(false);

  return (
    <div className="w-full py-4 px-4 md:px-8 bg-[#f8f9fa]">
      <div className="flex justify-between">
        <ToggleButton
          isOpen={isOpen}
          aria-label="Open Menu"
          onClick={onToggle}
        />
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}>
            <div 
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};