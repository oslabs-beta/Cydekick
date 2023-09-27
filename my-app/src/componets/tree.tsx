import { color } from "d3";
import React from "react";

const TreeNode = ({ node, isRoot, setCurrentComponent, currentComponent, htmlData}) => {
    if (node.reactRouter) return;
    const [isSelected, setIsSelected] = React.useState(false);
    const [showHTML, setShowHTML] = React.useState(false);
    const handleClick = () => {
        setIsSelected(!isSelected);
        setCurrentComponent(node);
        setShowHTML(!showHTML)
    }
    React.useEffect(()=> {
        if (isSelected && currentComponent !== node)setIsSelected(!isSelected);
    },[currentComponent])
    return (
        <div className={ isRoot ? "py-2 px-4" : "py-2 border-l-2 border-dashed"} style={{borderColor:"#1DF28F"}}>
        <div className="flex items-center">
          {!isRoot && <span style={{color:"#1DF28F"}}>&rarr;</span>}
          <button
          className={"rounded-lg p-2"}
          onClick={handleClick}
          style={isSelected? {backgroundColor: "#048C7F"} : {backgroundColor: "#1DF28F"}}
        >
          {node.name}
        </button>
        {showHTML && <p>{htmlData}</p>}
        </div>
        {node.children && (
          <div className="pl-5">
            {node.children.map((child) => (
              <TreeNode key={child.name} node={child} isRoot={false} setCurrentComponent={setCurrentComponent} currentComponent={currentComponent} htmlData={htmlData}/>
            ))}
          </div>
        )}
      </div>
    );
  };

const Tree = (props) => {
  // Extract the tree
  const { data, setCurrentComponent, currentComponent, htmlData} = props;

  // Make a node for the root
  data.parentName = null;

  return (
    <div id="treeContainer">
        <TreeNode key={data.name} node={data} isRoot={true} setCurrentComponent={setCurrentComponent} currentComponent={currentComponent} htmlData={htmlData}/>
    </div>
  );
};


export default Tree;