import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { DraggableNode } from "./draggableNode";
import { NODES_BY_CATEGORY } from "./constants/constants";

export const PipelineToolbar = () => {
  const [activeCategory, setActiveCategory] = useState("general");

  return (
    <div>
      <Navigation
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <div className="bg-white border-b border-gray-200">
        <div className="px-8 pb-4">
          <div className="flex flex-wrap gap-3">
            {NODES_BY_CATEGORY[activeCategory]?.map((node) => (
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
