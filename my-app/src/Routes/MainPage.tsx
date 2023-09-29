import React from "react";
import Tree from "../componets/tree";
import Webview from "../componets/Webview";
// import StatementPage from "../componets/StatementPage"
import ButtonComponent from "../componets/ButtonComponent";
import TestGenContainer from "../componets/TestGenContainer";

const MainPage = (props) => {
  const { url, fileTree, setPageState } = props;
  const [currentComponent, setCurrentComponent] = React.useState(null);
  const [currentHTML, setCurrentHTML] = React.useState(null);
  const [currentTestId, setCurrentTestId] = React.useState(null);
  const [data, setData] = React.useState(null);
  const handleBack = () =>{
    setPageState('Home')
  }
  return (
    <div className=" w-screen h-screen flex">
      <div className="w-1/2 max-w-1/2 flex flex-col" >
        <button className="rounded-lg p-2 w-fit mb-2" style={{backgroundColor: "#1DF28F"}} onClick={handleBack}>Back</button>
        <Tree
          data={fileTree}
          setCurrentComponent={setCurrentComponent}
          currentComponent={currentComponent}
          htmlData={data}
          setCurrentHTML={setCurrentHTML}
          setCurrentTestId={setCurrentTestId}
          currentHTML={currentHTML}
          currentTestId={currentTestId}
          url={url}
        ></Tree>
      <div className="fixed bottom-0 left-0 w-1/2 h-2/5 border-2 border-green-400 rounded bg-slate-500">
        <TestGenContainer currentTestId={currentTestId} currentHTML={currentHTML} currentComponent={currentComponent}/>
      </div>
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
