import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";

export const Navigation = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    { id: "general", label: "General" },
    { id: "llms", label: "LLMs" },
    { id: "multiModal", label: "Multi-Modal" },
    { id: "dataLoaders", label: "Data Loaders" },
    { id: "vectorDB", label: "Vector DB" },
    { id: "logic", label: "Logic" },
    { id: "chat", label: "Chat" },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between px-8 h-14 bg-[#0F111A]">
        <button className="flex items-center gap-2 text-white/90 hover:text-white">
          <IoArrowBackCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Back to All Pipelines</span>
        </button>

        {/* Run Button */}
        <button className="px-4 py-1.5 bg-[#6466E9] hover:bg-[#5355D9] text-white text-sm font-medium rounded-md flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          Run
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="h-14 px-8 flex items-center bg-white ">
        <div className="flex space-x-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`py-1 text-sm transition-colors ${
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
  );
};
