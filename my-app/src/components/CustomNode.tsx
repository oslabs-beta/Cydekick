import React, { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';

// function CustomNode({ data }) {
//     //  Determine the handle positions based on the current orientation
//   const topHandlePosition = data.orientation === 'TB' ? Position.Top : Position.Left;
//   const bottomHandlePosition = data.orientation === 'TB' ? Position.Bottom : Position.Right;
//   return (
//     <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
//       <div className="flex">
//           <div className="text-lg font-bold">{data.name}</div>
//       </div>
//       <Handle type="target" position={topHandlePosition} className="w-16 !bg-teal-500" />
//       <Handle type="source" position={bottomHandlePosition} className="w-16 !bg-teal-500" />
//     </div>
//   );
// }

function CustomNode({ data }) {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex">
        <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
          {data.emoji}
        </div>
        <div className="ml-2">
          <div className="text-lg font-bold">{data.name}</div>
          <div className="text-gray-500">{data.job}</div>
        </div>
      </div>

      {data.orientation === 'TB' ? (
        <>
          <Handle type="target" position={Position.Top} className="w-16 h-3 !bg-teal-500" />
          <Handle type="source" position={Position.Bottom} className="w-16 !bg-teal-500" />
        </>
      ) : (
        <>
          <Handle type="target" position={Position.Left} className="w-16 !bg-teal-500" />
          <Handle type="source" position={Position.Right} className="w-16 !bg-teal-500" />
        </>
      )}
    </div>
  );
}

export default memo(CustomNode);
