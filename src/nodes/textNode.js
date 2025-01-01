import { useState, useCallback } from "react";
import { BaseNode } from "../components/BaseNode";
import { NodeField } from "../components/NodeComponents";
import { MdOutlineTextSnippet } from "react-icons/md";

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const [variables, setVariables] = useState([]);

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleVariableDetected = useCallback((newVariables) => {
    setVariables(newVariables);
  }, []);

  const outputs = [{ id: "text", label: "text", position: 128 }];

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={MdOutlineTextSnippet}
      outputs={outputs}
      width="250px"
      dynamicInputs={variables}
    >
      <div className="flex flex-col gap-4 px-1 relative" id={`node-${id}-content`}>
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