import React from "react";
import GetFile from "./GetFile";
import Tree from "./tree";

const HierarchyContainer = () => {
    const [fileTree, setFileTree] = React.useState([])
    const [currentComponent, setCurrentComponent] = React.useState(null);
    React.useEffect( () => console.log(currentComponent), [currentComponent])
    return (
        <div>
            <GetFile setter={setFileTree}></GetFile>
            <Tree data={fileTree} setCurrentComponent={setCurrentComponent} currentComponent={currentComponent}></Tree>
        </div>
    )
}
export default HierarchyContainer;
