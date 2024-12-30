import { useState } from "react";
import { BaseNode } from "../components/BaseNode";
import { NodeField, NodeSelect } from "../components/NodeComponents";
import { MdInput } from "react-icons/md";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || "project_id");
  const [inputType, setInputType] = useState(data.inputType || "Text");

  return (
    <BaseNode id={id} title="Input" icon={MdInput} outputs={[{ id: "value" }]}>
      <InputNodeContent
        name={currName}
        type={inputType}
        onNameChange={setCurrName}
        onTypeChange={setInputType}
      />
    </BaseNode>
  );
};

const InputNodeContent = ({ name, type, onNameChange, onTypeChange }) => (
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
        { value: "File", label: "File" },
      ]}
    />
  </div>
);
