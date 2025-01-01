import React from "react";
import { Handle, Position } from "reactflow";
import { MdOutlineInfo, MdSettings } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useStore } from "../store";
import { NODE_DIMENSIONS } from "../constants/constants";

// Add common node configuration
const createNodeConfig = (config) => ({
  width: NODE_DIMENSIONS.DEFAULT,
  className: "",
  showSettings: false,
  inputs: [],
  outputs: [],
  dynamicInputs: [],
  ...config,
});

export const BaseNode = ({ data, ...props }) => {
  const deleteNode = useStore((state) => state.deleteNode);
  const updateNodeData = useStore((state) => state.updateNodeField);

  // Common node state management
  const handleDataChange = (field, value) => {
    updateNodeData(props.id, field, value);
  };

  // Handle node deletion
  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    deleteNode(props.id);
  };

  // Enhanced handle positioning logic
  const getHandlePosition = (index, total) => {
    return ((index + 1) * 100) / (total + 1);
  };

  // Ensure dynamic handles have proper IDs and are immediately available
  const dynamicHandlePositions = props.dynamicInputs.map((input, index) => {
    const totalInputs = props.dynamicInputs.length;
    const spacing = 100 / (totalInputs + 1);
    const position = (index + 1) * spacing;

    return {
      ...input,
      position,
      // Ensure handle ID matches the connection point ID
      id: input.label, // Use label as ID for consistency
    };
  });

  return (
    <div
      className={`bg-white rounded-lg border border-[#6466E9] shadow-[0_0_10px_rgba(100,102,233,0.25)] hover:shadow-[0_0_15px_rgba(100,102,233,0.35)] transition-shadow duration-200 ${props.className}`}
      style={{ width: props.width }}
    >
      {/* Static Input Handles */}
      {props.inputs.map((input, index) => (
        <Handle
          key={`static-input-${input.id}`}
          type="target"
          position={Position.Left}
          id={input.id}
          className="w-3 h-3 !bg-[#6466E9] border-[3px] border-white rounded-full"
          style={{
            left: -1.5,
            top: `${((index + 1) * 100) / (props.inputs.length + 1)}%`,
            transform: "translateY(-50%)",
            boxShadow: "0 0 0 2px #6466E9",
            zIndex: 1,
          }}
        />
      ))}

      {/* Dynamic Input Handles */}
      {dynamicHandlePositions.map((variable) => (
        <Handle
          key={`dynamic-input-${variable.id}`}
          type="target"
          position={Position.Left}
          id={variable.id}
          className="w-3 h-3 !bg-[#6466E9] border-[3px] border-white rounded-full"
          style={{
            left: -1.5,
            top: `${variable.position}%`,
            transform: "translateY(-50%)",
            boxShadow: "0 0 0 2px #6466E9",
            zIndex: 1,
          }}
          isConnectable={true}
        />
      ))}

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center justify-start gap-2">
          {props.icon && <props.icon className="w-3 h-3 text-[#6466E9]" />}
          <span className="text-sm text-[#6466E9] font-medium">
            {props.title}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-0.5">
            <MdOutlineInfo className="w-3.5 h-3.5 text-gray-400 hover:text-[#6466E9]" />
          </button>
          {props.showSettings && (
            <button className="p-0.5">
              <MdSettings className="w-3.5 h-3.5 text-gray-400 hover:text-[#6466E9]" />
            </button>
          )}
          <button
            className="p-0.5"
            onClick={handleDelete}
            aria-label="Delete node"
          >
            <IoMdCloseCircleOutline className="w-3.5 h-3.5 text-gray-400 hover:text-[#6466E9]" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 py-4">{props.children}</div>

      {/* Output Handles */}
      {props.outputs.map((output, index) => (
        <Handle
          key={`output-${output.id}`}
          type="source"
          position={Position.Right}
          id={`${props.id}-${output.id}`}
          className="w-3 h-3 !bg-[#6466E9] border-[3px] border-white rounded-full"
          style={{
            right: -1.5,
            top: `${((index + 1) * 100) / (props.outputs.length + 1)}%`,
            transform: "translateY(-50%)",
            boxShadow: "0 0 0 2px #6466E9",
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
};

// Export helper for consistent node creation
export const createNode = (type, config) => {
  return {
    type,
    ...createNodeConfig(config),
  };
};
