import { DraggableNode } from "./draggableNode";
import { Navigation } from "./components/Navigation";
import React from "react";
import {
  MdInput,
  MdOutput,
  MdOutlineTextSnippet,
  MdApi,
  MdCrop,
  MdSave,
  MdStorage,
  MdManageSearch,
} from "react-icons/md";
import { FaRegFile } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import { BiTransfer } from "react-icons/bi";
import { BsChatRightText } from "react-icons/bs";

const nodesByCategory = {
  general: [
    {
      type: "customInput",
      label: "Input",
      icon: <MdInput className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "customOutput",
      label: "Output",
      icon: <MdOutput className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "text",
      label: "Text",
      icon: <MdOutlineTextSnippet className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "file",
      label: "File",
      icon: <FaRegFile className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "pipeline",
      label: "Pipeline",
      icon: <FaRegCirclePlay className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "integration",
      label: "Integration",
      icon: <BiTransfer className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "transformation",
      label: "Transformation",
      icon: <MdCrop className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "fileSave",
      label: "File Save",
      icon: <MdSave className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "note",
      label: "Note",
      icon: <BsChatRightText className="w-5 h-5 text-gray-500" />,
    },
  ],
  llms: [
    {
      type: "llm",
      label: "LLM",
      icon: <MdApi className="w-5 h-5 text-gray-500" />,
    },
    // Add more LLM-specific nodes here
  ],
  vectorDB: [
    {
      type: "vecQuery",
      label: "Vector Query",
      icon: <MdManageSearch className="w-5 h-5 text-gray-500" />,
    },
    {
      type: "vecStore",
      label: "Vector Store Reader",
      icon: <MdStorage className="w-5 h-5 text-gray-500" />,
    },
  ],
  // Add more categories as needed
};

export const PipelineToolbar = () => {
  const [activeCategory, setActiveCategory] = React.useState("general");

  return (
    <div>
      <Navigation
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 pb-4">
          <div className="flex flex-wrap gap-3">
            {nodesByCategory[activeCategory]?.map((node) => (
              <DraggableNode
                key={node.type}
                type={node.type}
                label={node.label}
                icon={node.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
