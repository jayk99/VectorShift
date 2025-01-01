import { useState, useCallback } from "react";
import { BaseNode } from "../components/BaseNode";
import { NodeField, NodeSelect } from "../components/NodeComponents";
import { MdCrop } from "react-icons/md";

export const LLMNode = ({ id, data }) => {
  const [system, setSystem] = useState(data?.system || "");
  const [prompt, setPrompt] = useState(data?.prompt || "");
  const [model, setModel] = useState(data?.model || "gpt-3.5-turbo");
  const [usePersonalAPI, setUsePersonalAPI] = useState(
    data?.usePersonalAPI || false
  );
  const [apiKey, setApiKey] = useState(data?.apiKey || "");

  const inputs = [
    { id: "system", label: "system", position: 85 },
    { id: "prompt", label: "prompt", position: 170 },
  ];

  const outputs = [{ id: "response", label: "response", position: 128 }];

  const modelOptions = [
    { value: "gpt-3.5-turbo", label: "gpt-3.5-turbo" },
    { value: "gpt-4o", label: "gpt-4o" },
  ];

  const handleSystemChange = useCallback((e) => {
    setSystem(e.target.value);
  }, []);

  const handlePromptChange = useCallback((e) => {
    setPrompt(e.target.value);
  }, []);

  const handleModelChange = useCallback((e) => {
    setModel(e.target.value);
  }, []);

  const handleApiKeyChange = useCallback((e) => {
    setApiKey(e.target.value);
  }, []);

  return (
    <BaseNode
      id={id}
      title="OpenAI LLM"
      icon={MdCrop}
      inputs={inputs}
      outputs={outputs}
      width="300px"
      showSettings={true}
      data={data}
    >
      <div className="flex flex-col gap-4 px-1">
        <NodeField
          label="System"
          value={system}
          onChange={handleSystemChange}
          containerClassName="mb-1"
          minHeight={24}
        />

        <div className="text-xs text-gray-500 -mt-2">
          Describe the AI's role in "system".
        </div>

        <NodeField
          label="Prompt"
          value={prompt}
          onChange={handlePromptChange}
          multiline
          minHeight={24}
          autoExpand
        />

        <NodeSelect
          label="Model"
          value={model}
          onChange={handleModelChange}
          options={modelOptions}
        />

        <div className="flex flex-col gap-2">
          <div className="flex justify-center items-center gap-2">
            <input
              type="checkbox"
              checked={usePersonalAPI}
              onChange={(e) => setUsePersonalAPI(e.target.checked)}
              className="w-4 h-4 border-gray-300 rounded text-[#6466E9] focus:ring-[#6466E9] checked:bg-[#6466E9] checked:hover:bg-[#6466E9]"
            />
            <span className="text-sm text-gray-600">Use Personal API Key</span>
          </div>

          {usePersonalAPI && (
            <>
              <span className="text-xs text-[#6466E9] text-center">
                Your API key will be securely stored
              </span>
              <NodeField
                label="API Key"
                value={apiKey}
                onChange={handleApiKeyChange}
                containerClassName="mt-1"
                minHeight={24}
              />
            </>
          )}
        </div>
      </div>
    </BaseNode>
  );
};
