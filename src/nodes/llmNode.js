import { useState, useCallback } from "react";
import { BaseNode, createNode } from "../components/BaseNode";
import { NodeField, NodeSelect } from "../components/NodeComponents";
import { SiOpenai } from "react-icons/si";
import { MODEL_OPTIONS, NODE_DIMENSIONS } from "../constants/constants";
import { motion, AnimatePresence } from "framer-motion";

// Standardized node configuration
const LLM_NODE_CONFIG = createNode("llm", {
  width: NODE_DIMENSIONS.EXTRA_WIDE,
  inputs: [{ id: "system", label: "system", position: 85 }],
  outputs: [{ id: "response", label: "response", position: 128 }],
  showSettings: true,
});

export const LLMNode = ({ id, data }) => {
  const [state, setState] = useState({
    system: data?.system || "",
    prompt: data?.prompt || "",
    model: data?.model || "gpt-3.5-turbo",
    usePersonalAPI: data?.usePersonalAPI || false,
    apiKey: data?.apiKey || "",
  });

  const handleChange = useCallback(
    (field) => (value) => {
      // Handle both direct values (from NodeSelect) and event objects
      const newValue =
        field === "usePersonalAPI"
          ? value.target.checked
          : value?.target
          ? value.target.value
          : value;

      setState((prev) => ({ ...prev, [field]: newValue }));
    },
    []
  );

  return (
    <BaseNode
      id={id}
      title="OpenAI LLM"
      icon={SiOpenai}
      {...LLM_NODE_CONFIG}
      data={data}
    >
      <div className="flex flex-col gap-4 px-1">
        <NodeField
          label="System"
          value={state.system}
          onChange={handleChange("system")}
          containerClassName="mb-1"
          minHeight={24}
        />

        <div className="text-xs text-gray-500 -mt-2">
          Describe the AI's role in "system".
        </div>

        <NodeField
          label="Prompt"
          value={state.prompt}
          onChange={handleChange("prompt")}
          multiline
          minHeight={24}
          autoExpand
        />

        <NodeSelect
          label="Model"
          value={state.model}
          onChange={handleChange("model")}
          options={MODEL_OPTIONS}
        />

        <div className="flex flex-col gap-2">
          <div className="flex justify-center items-center gap-2">
            <input
              type="checkbox"
              checked={state.usePersonalAPI}
              onChange={handleChange("usePersonalAPI")}
              className="w-4 h-4 border-gray-300 rounded text-[#6466E9] focus:ring-[#6466E9] checked:bg-[#6466E9] checked:hover:bg-[#6466E9]"
            />
            <span className="text-sm text-gray-600">Use Personal API Key</span>
          </div>

          <AnimatePresence initial={false}>
            {state.usePersonalAPI && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <span className="text-xs text-[#6466E9] text-center block">
                  Your API key will be securely stored
                </span>
                <NodeField
                  label="API Key"
                  value={state.apiKey}
                  onChange={handleChange("apiKey")}
                  containerClassName="mt-1"
                  minHeight={24}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </BaseNode>
  );
};
