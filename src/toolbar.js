import { DraggableNode } from "./draggableNode";
import { MdInput, MdOutput, MdOutlineTextSnippet } from "react-icons/md";

import { FaRegFile } from "react-icons/fa";

export const PipelineToolbar = () => {
  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <DraggableNode
          type="customInput"
          label="Input"
          icon={<MdInput className="w-5 h-5 text-gray-500" />}
        />
        <DraggableNode
          type="customOutput"
          label="Output"
          icon={<MdOutput className="w-5 h-5 text-gray-500" />}
        />
        <DraggableNode
          type="text"
          label="Text"
          icon={<MdOutlineTextSnippet className="w-5 h-5 text-gray-500" />}
        />
        <DraggableNode
          type="file"
          label="File"
          icon={<FaRegFile className="w-5 h-5 text-gray-500" />}
        />
      </div>
    </div>
  );
};
