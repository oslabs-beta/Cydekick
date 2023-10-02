import React, { memo } from "react";
import { Handle } from "react-flow-renderer";


function CustomNode({ data, sourcePosition, targetPosition }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 w-44 h-9 flex justify-center items-center">
      <div className="text-lg font-bold">{data.name}</div>
      <Handle type="target" position={targetPosition} />
      <Handle type="source" position={sourcePosition} />
    </div>
  );
}

export default memo(CustomNode);
