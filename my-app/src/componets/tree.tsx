import React from "react";

const TreeNode = ({ node, isRoot, setCurrentComponent, currentComponent}) => {
    if (node.reactRouter) return;
    const [isSelected, setIsSelected] = React.useState(false);
    const handleClick = () => {
        setIsSelected(!isSelected);
        setCurrentComponent(node);
    }
    React.useEffect(()=> {
        if (isSelected && currentComponent !== node)setIsSelected(!isSelected);
    },[currentComponent])
    return (
        <div className={ isRoot ? "py-2 px-4" : "py-2 border-l-2 border-black"}>
        <div className="flex items-center">
          {!isRoot && <span className="arrow">&rarr;</span>}
          <button
          className={`border-2 ${isSelected ? "border-red-500" : "border-black"}`}
          onClick={handleClick}
        >
          {node.name}
        </button>
        </div>
        {node.children && (
          <div className="pl-5">
            {node.children.map((child) => (
              <TreeNode key={child.name} node={child} isRoot={false} setCurrentComponent={setCurrentComponent} currentComponent={currentComponent}/>
            ))}
          </div>
        )}
      </div>
    );
  };

const Tree = (props) => {
  // Extract the tree
  const { data, setCurrentComponent, currentComponent} = props;

  // Make a node for the root
  data.parentName = null;

  return (
    <div id="treeContainer">
        <TreeNode key={data.name} node={data} isRoot={true} setCurrentComponent={setCurrentComponent} currentComponent={currentComponent}/>
    </div>
  );
};


export default Tree;