import React from "react";
import HtmlDisplay from "./HtmlDisplay";
import {Tree as TreeType} from "../types/Tree"

type TreeNode = {
  node:TreeType,
  isRoot:boolean,
  setCurrentComponent:React.Dispatch<React.SetStateAction<TreeType>>
  currentComponent:TreeType,
  htmlData:string,
  setCurrentHTML: React.Dispatch<React.SetStateAction<string>>,
  setCurrentTestId: React.Dispatch<React.SetStateAction<string>>,
  currentHTML:string,
  currentTestId:string
}


const TreeNode = ({
  node,
  isRoot,
  setCurrentComponent,
  currentComponent,
  htmlData,
  setCurrentHTML,
  setCurrentTestId,
  currentHTML, 
  currentTestId

}:TreeNode) => {
  if (node.reactRouter) return;
  const [isSelected, setIsSelected] = React.useState(false);
  const [showHTML, setShowHTML] = React.useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
    setCurrentComponent(node);
    setShowHTML(!showHTML);
  };
  React.useEffect(() => {
    if (isSelected && currentComponent !== node) setIsSelected(!isSelected);
  }, [currentComponent]);
  return (
    <div
      className={isRoot ? "py-2 px-4" : "py-2 border-l-2 border-dashed"}
      style={{ borderColor: "#1DF28F" }}
    >
      <div className="flex items-center">
        {!isRoot && (
          <span
            style={isSelected ? { color: "#048C7F" } : { color: "#1DF28F" }}
          >
            &rarr;
          </span>
        )}
        <div
          className="rounded-lg p-2"
          style={
            isSelected
              ? { backgroundColor: "#048C7F" }
              : { backgroundColor: "#1DF28F" }
          }
        >
          <button onClick={handleClick}>{node.name}</button>
          {isSelected && (
            <HtmlDisplay
              htmlData={htmlData}
              setCurrentHTML={setCurrentHTML}
              setCurrentTestId={setCurrentTestId}
              currentHTML={currentHTML}
              currentTestId={currentTestId}
            />
          )}
        </div>
      </div>
      {node.children && (
        <div className="pl-5">
          {node.children.map((child) => (
            <TreeNode
              key={child.name}
              node={child}
              isRoot={false}
              setCurrentComponent={setCurrentComponent}
              currentComponent={currentComponent}
              htmlData={htmlData}
              setCurrentHTML={setCurrentHTML}
              setCurrentTestId={setCurrentTestId}
              currentHTML={currentHTML}
              currentTestId={currentTestId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
type TreeProps = {
  data:TreeType,
  setCurrentComponent:React.Dispatch<React.SetStateAction<TreeType>>
  currentComponent:TreeType,
  htmlData:string,
  setCurrentHTML: React.Dispatch<React.SetStateAction<string>>,
  setCurrentTestId: React.Dispatch<React.SetStateAction<string>>,
  currentHTML:string,
  currentTestId:string
}

const Tree = (props:TreeProps) => {
  // Extract the tree
  const {
    data,
    setCurrentComponent,
    currentComponent,
    htmlData,
    setCurrentHTML,
    setCurrentTestId,
    currentHTML, 
    currentTestId
  } = props;

  return (
    <div className="h-1/2 overflow-auto">
      <TreeNode
        key={data.name}
        node={data}
        isRoot={true}
        setCurrentComponent={setCurrentComponent}
        currentComponent={currentComponent}
        htmlData={htmlData}
        setCurrentHTML={setCurrentHTML}
        setCurrentTestId={setCurrentTestId}
        currentHTML={currentHTML}
        currentTestId={currentTestId}
      />
    </div>
  );
};

export default Tree;
