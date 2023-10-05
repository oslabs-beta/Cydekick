import React, { memo } from "react";
import { Handle } from "react-flow-renderer";


function CustomNode({ data, sourcePosition, targetPosition }) {

  const handleClick = () => {
    data.setCurrentComponent(data.nodeData);
  };


  return (
    <div    key={data.key} className="px-4 py-2 shadow-md rounded-md border-2 border-stone-400 w-44 h-9 flex justify-center items-center" style={
      data.isSelected
        ? { backgroundColor: "#048C7F" }
        : { backgroundColor: "#1DF28F" }
    }>
      <button className="text-lg font-bold" onClick={handleClick}>{data.name}</button>
      <Handle type="target" position={targetPosition} />
      <Handle type="source" position={sourcePosition} />
    </div>
  );
}

export default memo(CustomNode);
