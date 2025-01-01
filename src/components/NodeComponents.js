import { useEffect, useRef } from "react";
import { FIELD_HEIGHTS, VARIABLE_REGEX } from "../constants/constants";

export const NodeField = ({
  label,
  value,
  onChange,
  onVariableDetected,
  multiline = true,
  minHeight = FIELD_HEIGHTS.DEFAULT,
  autoExpand = true,
  containerClassName = "",
  nodeId,
}) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange(e);

    // Immediate variable detection on every change
    if (onVariableDetected) {
      const matches = [...newValue.matchAll(VARIABLE_REGEX)];

      const variables = matches.map((match) => ({
        id: match[1].trim(),
        label: match[1].trim(),
      }));

      // Trigger variable detection immediately
      onVariableDetected(variables);
    }
  };

  // Handle textarea auto-expansion
  useEffect(() => {
    if (autoExpand && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.max(minHeight, textareaRef.current.scrollHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [value, autoExpand, minHeight]);

  return (
    <div className={`flex flex-col gap-1 ${containerClassName}`}>
      <div className="px-2 py-1 text-sm bg-white border border-gray-200 rounded relative">
        <div className="text-xs text-gray-600 mb-0.5">{label}</div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          className="w-full text-sm focus:outline-none resize-none overflow-hidden relative z-10 bg-transparent"
          style={{
            minHeight,
            height: autoExpand ? "auto" : minHeight,
            padding: "2px 0",
            lineHeight: "1.25",
          }}
          rows={1}
        />
      </div>
    </div>
  );
};

export const NodeSelect = ({ label, value, onChange, options }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs text-gray-600">{label}</span>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded appearance-none pr-8 bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
);
