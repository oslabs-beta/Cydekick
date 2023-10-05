import React from "react";
import { Handle, Position } from "react-flow-renderer";

const CustomNode = ({ data }) => {
  
  const handleClick = () =>{
    // if data-cy exists set current html to that data.name and set currentTestid to that testid
    if (data.attributes["data-cy"]){
      data.setCurrentHTML(data.name);
      data.setCurrentTestId(`data-cy = ${data.attributes["data-cy"].value}`)
    }
    else if (data.attributes["id"]){
      data.setCurrentHTML(data.name);
      data.setCurrentTestId(`id = ${data.attributes["id"].value}`)
    }
  };

  return (
    <div
      key={data.key}
      className="px-4 py-2 shadow-md rounded-md border-2 border-stone-400 w-60 h-24 flex flex-col justify-center items-center"
      style={
        data.isSelected
          ? { backgroundColor: "#048C7F" }
          : { backgroundColor: "#1DF28F" }
      }
      onClick={handleClick}
    >
      <button>
        <p className="text-lg font-bold">{data.name}</p>
        {data.attributes["data-cy"] && (
          <p>data-cy = {data.attributes["data-cy"].value}</p>
        )}
        {data.attributes["id"] && <p>id = {data.attributes["id"].value}</p>}
      </button>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
