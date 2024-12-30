import { Handle, Position } from "reactflow";
import { MdOutlineInfo } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";

export const BaseNode = ({
  id,
  title,
  icon: Icon,
  children,
  inputs = [],
  outputs = [],
}) => {
  return (
    <div className="bg-white rounded-lg border border-[#6466E9] w-[220px]">
      {/* Input Handles */}
      {inputs.map((input, index) => (
        <Handle
          key={`input-${index}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          className="w-3 h-3 !bg-[#6466E9] border-[3px] border-white rounded-full"
          style={{
            left: -1.5,
            top: `${((index + 1) * 100) / (inputs.length + 1)}%`,
            transform: "translateY(-50%)",
            boxShadow: "0 0 0 2px #6466E9",
            zIndex: 1,
          }}
        />
      ))}

      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center justify-start gap-2">
          {Icon && <Icon className="w-3 h-3 text-gray-400" />}
          <span className="text-sm text-gray-600">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-0.5">
            <MdOutlineInfo className="w-3.5 h-3.5 text-gray-400" />
          </button>
          <button className="p-0.5">
            <IoMdCloseCircleOutline className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 py-4">{children}</div>

      {/* Output Handles */}
      {outputs.map((output, index) => (
        <Handle
          key={`output-${index}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          className="w-3 h-3 !bg-[#6466E9] border-[3px] border-white rounded-full"
          style={{
            right: -1.5,
            top: `${((index + 1) * 100) / (outputs.length + 1)}%`,
            transform: "translateY(-50%)",
            boxShadow: "0 0 0 2px #6466E9",
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
};
