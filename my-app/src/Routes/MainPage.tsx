import React from "react";

import Tree from "../componets/tree";
import Webview from "../componets/Webview";
import StatementPage from "../componets/StatementPage"

const MainPage = (props) => {
  const { url, fileTree } = props;
  const [currentComponent, setCurrentComponent] = React.useState(null);
  const [data, setData] = React.useState(null);
  return (
    <div className=" w-screen h-screen flex">
      <div className="w-1/2 h-screen flex flex-col">
        <Tree
          data={fileTree}
          setCurrentComponent={setCurrentComponent}
          currentComponent={currentComponent}
          htmlData={data}
        ></Tree>
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

