import React, { useState } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { NAV_CATEGORIES } from "../constants/constants";
import { useStore } from "../store";
import {
  MdOutlineRocketLaunch,
  MdSave,
  MdPlayArrow,
  MdInfoOutline,
  MdSearch,
} from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { SaveSidebar } from "./SaveSidebar";

export const Navigation = ({ activeCategory, setActiveCategory }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const nodes = useStore((state) => state.nodes);

  const baseButtons = [
    { icon: MdOutlineRocketLaunch, title: "Deploy" },
    { icon: MdPlayArrow, title: "Run" },
    { icon: MdInfoOutline, title: "Details" },
  ];

  const saveButton = {
    icon: MdSave,
    title: "Save",
    onClick: () => setIsSidebarOpen(true),
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between px-4 sm:px-8 h-14 bg-[#0F111A] flex-shrink-0">
        <button className="flex items-center gap-2 text-white/90 hover:text-white">
          <IoArrowBackCircle className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:inline">
            Back to All Pipelines
          </span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          {baseButtons.slice(0, 1).map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className="px-2 sm:px-4 py-1.5 bg-[#6466E9] hover:bg-[#5355D9] text-white text-sm font-medium rounded-md flex items-center gap-2"
            >
              <button.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{button.title}</span>
            </button>
          ))}

          <AnimatePresence mode="popLayout">
            {nodes.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: "auto" }}
                exit={{ opacity: 0, scale: 0.8, width: 0 }}
                onClick={saveButton.onClick}
                className="px-2 sm:px-4 py-1.5 bg-[#6466E9] hover:bg-[#5355D9] text-white text-sm font-medium rounded-md flex items-center gap-2 overflow-hidden whitespace-nowrap"
              >
                <saveButton.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{saveButton.title}</span>
              </motion.button>
            )}
          </AnimatePresence>

          {baseButtons.slice(1).map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className="px-2 sm:px-4 py-1.5 bg-[#6466E9] hover:bg-[#5355D9] text-white text-sm font-medium rounded-md flex items-center gap-2"
            >
              <button.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{button.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category Navigation */}
      <div className="h-14 px-4 sm:px-8 flex items-center bg-white overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 sm:gap-4 min-w-max">
          {/* Search Bar */}
          <motion.div
            className="flex items-center flex-shrink-0"
            initial={false}
          >
            <motion.button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              animate={{ rotate: isSearchOpen ? 90 : 0 }}
            >
              <MdSearch className="w-5 h-5 text-gray-600" />
            </motion.button>

            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 100, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <input
                    type="text"
                    className="w-full px-2 py-1 text-sm focus:outline-none bg-transparent"
                    placeholder="Search..."
                    autoFocus
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Category Buttons */}
          <div className="flex space-x-4 sm:space-x-6 overflow-x-auto hide-scrollbar">
            {NAV_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`py-1 text-sm whitespace-nowrap transition-colors flex-shrink-0 ${
                  activeCategory === category.id
                    ? "text-[#6466E9] border-b-2 border-[#6466E9] -mb-[1px]"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <SaveSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
};
