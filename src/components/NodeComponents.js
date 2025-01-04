import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export const NodeField = ({
  label,
  value,
  onChange,
  multiline = true,
  minHeight = 20,
  autoExpand = true,
  containerClassName = "",
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (autoExpand && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(
        minHeight,
        textareaRef.current.scrollHeight
      )}px`;
    }
  }, [value, autoExpand, minHeight]);

  return (
    <div className={`flex flex-col gap-1 ${containerClassName}`}>
      <div className="px-2 py-1 text-sm bg-white border border-gray-200 rounded relative">
        <div className="text-xs text-gray-600 mb-0.5">{label}</div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={onChange}
          className="w-full text-sm focus:outline-none resize-none overflow-hidden bg-transparent"
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
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 transition-colors duration-150 ${
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

export const DynamicTextArea = ({
  value,
  onChange,
  label,
  onWidthChange,
  onVariableDetected,
}) => {
  const textareaRef = useRef(null);
  const currentWidth = useRef(200);

  const handleChange = (e) => {
    onChange(e);

    if (onVariableDetected) {
      // Detect variables without requiring line breaks
      const matches = [
        ...e.target.value.matchAll(/{{\s*([a-zA-Z][a-zA-Z0-9_]*)\s*}}/g),
      ];
      const variables = matches.map((match) => ({
        id: match[1].trim(),
        label: match[1].trim(),
      }));
      onVariableDetected(variables);
    }
  };

  useEffect(() => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const computedStyle = window.getComputedStyle(textarea);

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    // Create measuring element
    const measure = document.createElement("div");
    measure.style.position = "absolute";
    measure.style.visibility = "hidden";
    measure.style.whiteSpace = "pre";
    measure.style.font = computedStyle.font;
    document.body.appendChild(measure);

    // Calculate content width
    const lines = value.split("\n");
    let contentWidth = 0;

    lines.forEach((line) => {
      measure.textContent = line || " ";
      contentWidth = Math.max(contentWidth, measure.offsetWidth);
    });

    document.body.removeChild(measure);

    const padding = 32;
    contentWidth += padding;

    const minWidth = 200;
    const maxWidth = window.innerWidth * 0.75;
    const expandThreshold = currentWidth.current * 0.75;

    // Determine new width
    let newWidth = currentWidth.current;

    if (contentWidth > expandThreshold) {
      // Expand width gradually
      newWidth = Math.min(contentWidth + 50, maxWidth);
    } else if (contentWidth < expandThreshold * 0.5) {
      // Shrink width gradually, but not below minimum
      newWidth = Math.max(contentWidth + 50, minWidth);
    }

    // Update width if changed
    if (newWidth !== currentWidth.current) {
      currentWidth.current = newWidth;
      textarea.style.width = `${newWidth}px`;
      onWidthChange(newWidth);
    }
  }, [value, onWidthChange]);

  return (
    <div className="flex flex-col gap-1">
      <div className="px-2 py-1 bg-white border border-gray-200 rounded">
        <div className="text-xs text-gray-600 mb-0.5">{label}</div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          className="text-sm focus:outline-none resize-none bg-transparent"
          style={{
            minHeight: "24px",
            lineHeight: "1.25",
            padding: "2px 0",
            overflow: "hidden",
            whiteSpace: "pre-wrap",
            width: "200px", // Initial width
          }}
        />
      </div>
    </div>
  );
};
