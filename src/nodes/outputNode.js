// outputNode.js

import { useState } from "react";
import { BaseNode } from "../components/BaseNode";
import { NodeField, NodeSelect } from "../components/NodeComponents";
export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  return (
    <BaseNode id={id} title="Output" inputs={[{ id: "value" }]}>
      <OutputNodeContent
        name={currName}
        type={outputType}
        onNameChange={setCurrName}
        onTypeChange={setOutputType}
      />
    </BaseNode>
  );
};

const OutputNodeContent = ({ name, type, onNameChange, onTypeChange }) => (
  <div className="flex flex-col gap-3">
    <NodeField
      label="Name"
      value={name}
      onChange={(e) => onNameChange(e.target.value)}
    />
    <NodeSelect
      label="Type"
      value={type}
      onChange={(e) => onTypeChange(e.target.value)}
      options={[
        { value: "Text", label: "Text" },
        { value: "File", label: "Image" },
      ]}
    />
  </div>
);
