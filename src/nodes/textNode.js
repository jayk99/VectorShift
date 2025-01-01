import { useState, useCallback } from "react";
import { BaseNode, createNode } from "../components/BaseNode";
import { NodeField } from "../components/NodeComponents";
import { MdOutlineTextSnippet } from "react-icons/md";
import { NODE_DIMENSIONS } from "../constants/constants";

const TEXT_NODE_CONFIG = createNode("text", {
  width: NODE_DIMENSIONS.WIDE,
  outputs: [{ id: "text", label: "text", position: 128 }],
  showSettings: false,
});

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const [variables, setVariables] = useState([]);

  const handleTextChange = useCallback(
    (e) => {
      setText(e.target.value);
    },
    [setText]
  );

  const handleVariableDetected = useCallback(
    (newVariables) => {
      setVariables(newVariables);
    },
    [setVariables]
  );

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={MdOutlineTextSnippet}
      {...TEXT_NODE_CONFIG}
      dynamicInputs={variables}
      data={data}
    >
      <div
        className="flex flex-col gap-4 px-1 relative"
        id={`node-${id}-content`}
      >
        <NodeField
          label="Text"
          value={text}
          onChange={handleTextChange}
          onVariableDetected={handleVariableDetected}
          nodeId={id}
        />
      </div>
    </BaseNode>
  );
};
