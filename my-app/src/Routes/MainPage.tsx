import React from "react";

import Tree from "../componets/tree";
import Webview from "../componets/Webview";
import StatementPage from "../componets/StatementPage"
import ButtonComponent from "../componets/ButtonComponent";
import TestGenContainer from "../componets/TestGenContainer";

const MainPage = (props) => {
  const { url, fileTree } = props;
  const [currentComponent, setCurrentComponent] = React.useState(null);
  const [currentHTML, setCurrentHTML] = React.useState(null);
  const [currentTestId, setCurrentTestId] = React.useState(null);
  const [data, setData] = React.useState(null);
  return (
    <div className=" w-screen h-screen flex">
      <div className="w-1/2 max-w-1/2 flex flex-col">
        <Tree
          data={fileTree}
          setCurrentComponent={setCurrentComponent}
          currentComponent={currentComponent}
          htmlData={data}
          setCurrentHTML={setCurrentHTML}
          setCurrentTestId={setCurrentTestId}
          currentHTML={currentHTML}
          currentTestId={currentTestId}
        ></Tree>
        <div className="h-1/2"></div>
        {/* set testing area here */}
      </div> 
      <div className="fixed bottom-0 left-0 w-1/2 h-2/5 border-2 border-green-400 rounded bg-slate-500">
        <TestGenContainer/>
      </div>
      <Webview
        url={url}
        currentComponent={currentComponent}
        currentTestId={currentTestId}
        setData={setData}
      />
      
      <ButtonComponent/>
    </div>
  );
};

export default MainPage
