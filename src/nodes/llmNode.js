// llmNode.js

import { BaseNode } from "../components/BaseNode";

export const LLMNode = ({ id, data }) => {
  const inputs = [{ id: "system" }, { id: "prompt" }];

  const outputs = [{ id: "response" }];

  return (
    <BaseNode id={id} title="LLM" inputs={inputs} outputs={outputs}>
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
};
