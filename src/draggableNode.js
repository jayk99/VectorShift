export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: type })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="flex flex-col items-center justify-center p-2 bg-white rounded-lg border border-gray-200 cursor-move hover:border-gray-300 hover:shadow-sm transition-all min-w-[4rem]"
      onDragStart={onDragStart}
      draggable
    >
      <div className="mb-2">{icon}</div>
      <span className="text-xs text-gray-700 text-center leading-tight px-1">
        {label}
      </span>
    </div>
  );
};
