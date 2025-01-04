import { useState, useCallback } from "react";
import { BaseNode, createNode } from "../components/BaseNode";
import { MdOutlineTextSnippet } from "react-icons/md";
import { DynamicTextArea } from "../components/NodeComponents";

const TEXT_NODE_CONFIG = createNode("text", {
  width: 200,
  outputs: [{ id: "text", label: "text", position: 128 }],
  showSettings: false,
});

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const [variables, setVariables] = useState([]);
  const [nodeWidth, setNodeWidth] = useState(TEXT_NODE_CONFIG.width);

  const handleTextChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const handleVariableDetected = useCallback((newVariables) => {
    setVariables(newVariables);
  }, []);

  const handleWidthChange = useCallback((newWidth) => {
    setNodeWidth(newWidth);
  }, []);

  return (
    <BaseNode
      id={id}
      title="Text"
      icon={MdOutlineTextSnippet}
      {...TEXT_NODE_CONFIG}
      width={nodeWidth}
      dynamicInputs={variables}
      data={data}
    >
      <div className="flex flex-col gap-4 px-1">
        <DynamicTextArea
          label="Text"
          value={text}
          onChange={handleTextChange}
          onVariableDetected={handleVariableDetected}
          onWidthChange={handleWidthChange}
        />
      </div>
    </BaseNode>
  );
};