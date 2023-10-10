import React, { memo } from "react";
import { Handle, Position } from "react-flow-renderer";
import { Tree as TreeType } from "../../types/Tree";
type CustomNodeProps = {
  data:{
    name:string;
    testid:string;
    props:{[key: string]: boolean;}
    filePath:string;
    setCurrentComponent: React.Dispatch<React.SetStateAction<TreeType>>;
    nodeData:TreeType;
    isSelected:boolean
    key:string
  }
}
function CustomNode({ data }:CustomNodeProps) {

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
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default memo(CustomNode);
