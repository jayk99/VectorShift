// outputNode.js

import { useState } from "react";
import { BaseNode, createNode } from "../components/BaseNode";
import { NodeField, NodeSelect } from "../components/NodeComponents";
import { MdOutput } from "react-icons/md";
import { NODE_DIMENSIONS, IO_TYPES } from "../constants/constants";

const OUTPUT_NODE_CONFIG = createNode("output", {
  width: NODE_DIMENSIONS.DEFAULT,
  inputs: [{ id: "value", label: "value", position: 128 }],
  showSettings: false,
});

export const OutputNode = ({ id, data }) => {
  const [state, setState] = useState({
    outputName: data?.outputName || id.replace("customOutput-", "output_"),
    outputType: data?.outputType || "Text",
  });

  const handleChange = (field) => (e) => {
    setState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      icon={MdOutput}
      {...OUTPUT_NODE_CONFIG}
      data={data}
    >
      <div className="flex flex-col gap-3">
        <NodeField
          label="Name"
          value={state.outputName}
          onChange={handleChange("outputName")}
        />
        <NodeSelect
          label="Type"
          value={state.outputType}
          onChange={handleChange("outputType")}
          options={IO_TYPES}
        />
      </div>
    </BaseNode>
  );
};
