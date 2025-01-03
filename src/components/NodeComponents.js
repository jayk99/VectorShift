import { useEffect, useRef, useState } from "react";
import { FIELD_HEIGHTS, VARIABLE_REGEX } from "../constants/constants";
import { MdKeyboardArrowDown } from "react-icons/md";

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

export const NodeSelect = ({ label, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (optionValue) => {
    onChange({ target: { value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-1" ref={dropdownRef}>
      <span className="text-xs text-gray-600">{label}</span>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded bg-white flex items-center justify-between hover:border-gray-300 transition-colors duration-200"
        >
          <span className="text-gray-800">
            {selectedOption?.label || "Select option"}
          </span>
          <MdKeyboardArrowDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="py-1 max-h-48 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors duration-150
                    ${
                      value === option.value
                        ? "bg-gray-50 text-[#6466E9]"
                        : "text-gray-800"
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
