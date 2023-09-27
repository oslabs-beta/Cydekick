import React from "react";
import Tree from "../componets/tree";
import Webview from "../componets/Webview";

const MainPage = (props) => {
  const { url, fileTree } = props;
  const [currentComponent, setCurrentComponent] = React.useState(null);
  const [data, setData] = React.useState(null);
  return (
    <div className=" w-screen h-screen flex">
      <div className="w-1/2 max-w-1/2 flex flex-col">
        <Tree
          data={fileTree}
          setCurrentComponent={setCurrentComponent}
          currentComponent={currentComponent}
          htmlData={data}
        ></Tree>
        <div className="h-1/2"></div>
        {/* set testing area here */}
      </div>
      <Webview
        url={url}
        currentComponent={currentComponent}
        setData={setData}
      />
    </div>
  );
};
export default MainPage;
