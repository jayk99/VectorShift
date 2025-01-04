import React from "react";
import { Handle, Position } from "reactflow";
import { MdOutlineInfo, MdSettings } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useStore } from "../store";
import { NODE_DIMENSIONS } from "../constants/constants";

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

  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    deleteNode(props.id);
  };

  const getHandlePosition = (index, total) => ((index + 1) * 100) / (total + 1);

  const dynamicHandlePositions = props.dynamicInputs.map((input, index) => {
    const totalInputs = props.dynamicInputs.length;
    const spacing = 100 / (totalInputs + 1);
    return {
      ...input,
      position: (index + 1) * spacing,
      id: input.label,
    };
  });

  return (
    <div
      className={`bg-white rounded-lg border border-[#6466E9] shadow-[0_0_10px_rgba(100,102,233,0.25)] hover:shadow-[0_0_15px_rgba(100,102,233,0.35)] transition-all duration-200 ${props.className}`}
      style={{
        width: props.width,
        maxWidth: `${window.innerWidth * 0.75}px`,
      }}
    >
      
      {props.inputs.map((input, index) => (
        <Handle
          key={`static-input-${input.id}`}
          type="target"
          position={Position.Left}
          id={input.id}
          className="w-3 h-3 !bg-[#6466E9] border-[3px] border-white rounded-full"
          style={{
            left: -1.5,
            top: `${getHandlePosition(index, props.inputs.length)}%`,
            transform: "translateY(-50%)",
            boxShadow: "0 0 0 2px #6466E9",
            zIndex: 1,
          }}
        />
      ))}

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

      <div className="px-3 py-4">{props.children}</div>

      {props.outputs.map((output, index) => (
        <Handle
          key={`output-${output.id}`}
          type="source"
          position={Position.Right}
          id={`${props.id}-${output.id}`}
          className="w-3 h-3 !bg-[#6466E9] border-[3px] border-white rounded-full"
          style={{
            right: -1.5,
            top: `${getHandlePosition(index, props.outputs.length)}%`,
            transform: "translateY(-50%)",
            boxShadow: "0 0 0 2px #6466E9",
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
};

export const createNode = (type, config) => ({
  type,
  ...createNodeConfig(config),
});
