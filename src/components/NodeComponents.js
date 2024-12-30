export const NodeField = ({ label, value, onChange }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-500">{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full px-2 py-1 text-sm border border-gray-200 rounded bg-white"
    />
  </div>
);

export const NodeSelect = ({ label, value, onChange, options }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-500">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-2 py-1 text-sm border border-gray-200 rounded bg-white appearance-none  bg-[length:16px] bg-[right_4px_center] bg-no-repeat"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);
