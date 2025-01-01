import { useState, useCallback } from "react";
import { BaseNode, createNode } from "../components/BaseNode";
import { NodeField, NodeSelect } from "../components/NodeComponents";
import { MdCrop } from "react-icons/md";
import { MODEL_OPTIONS, NODE_DIMENSIONS } from "../constants/constants";
import { motion, AnimatePresence } from "framer-motion";

// Standardized node configuration
const LLM_NODE_CONFIG = createNode("llm", {
  width: NODE_DIMENSIONS.EXTRA_WIDE,
  inputs: [
    { id: "system", label: "system", position: 85 },
    { id: "prompt", label: "prompt", position: 170 },
  ],
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
    (field) => (e) => {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  return (
    <BaseNode
      id={id}
      title="OpenAI LLM"
      icon={MdCrop}
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
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  marginTop: 8,
                  transition: {
                    height: { duration: 0.3, ease: "easeOut" },
                    opacity: { duration: 0.2, ease: "easeOut" },
                  },
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  marginTop: 0,
                  transition: {
                    height: { duration: 0.3, ease: "easeIn" },
                    opacity: { duration: 0.2, ease: "easeIn" },
                  },
                }}
                className="overflow-hidden"
              >
                <span className="text-xs text-[#6466E9] text-center block mb-2">
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
