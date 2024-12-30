// textNode.js

import { useState } from "react";
import { BaseNode } from "../components/BaseNode";
import { NodeField } from "../components/NodeComponents";
export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  return (
    <BaseNode id={id} title="Text" outputs={[{ id: "output" }]}>
      <TextNodeContent text={currText} onTextChange={setCurrText} />
    </BaseNode>
  );
};

const TextNodeContent = ({ text, onTextChange }) => (
  <div className="flex flex-col gap-3">
    <NodeField
      label="Text"
      value={text}
      onChange={(e) => onTextChange(e.target.value)}
    />
  </div>
);
