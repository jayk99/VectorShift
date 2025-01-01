import { useState } from "react";
import { BaseNode, createNode } from "../components/BaseNode";
import { NodeField, NodeSelect } from "../components/NodeComponents";
import { MdInput } from "react-icons/md";
import { NODE_DIMENSIONS, IO_TYPES } from "../constants/constants";

const INPUT_NODE_CONFIG = createNode("input", {
  width: NODE_DIMENSIONS.DEFAULT,
  outputs: [{ id: "value", label: "value", position: 128 }],
  showSettings: false,
});

export const InputNode = ({ id, data }) => {
  const [state, setState] = useState({
    inputName: data?.inputName || "project_id",
    inputType: data?.inputType || "Text",
  });

  const handleChange = (field) => (e) => {
    setState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      icon={MdInput}
      {...INPUT_NODE_CONFIG}
      data={data}
    >
      <div className="flex flex-col gap-3">
        <NodeField
          label="Name"
          value={state.inputName}
          onChange={handleChange("inputName")}
        />
        <NodeSelect
          label="Type"
          value={state.inputType}
          onChange={handleChange("inputType")}
          options={IO_TYPES}
        />
      </div>
    </BaseNode>
  );
};
