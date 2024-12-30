import React from "react";

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
    <nav className="bg-white border-b border-gray-200">
      <div className="flex items-center h-14 px-4">
        <div className="flex items-center gap-2 mr-8">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to All Pipelines
          </button>
        </div>
        <div className="flex space-x-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`py-1 px-2 text-sm ${
                activeCategory === category.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
