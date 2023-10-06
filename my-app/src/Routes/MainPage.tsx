import React from "react";
import Webview from "../components/Webview";
import Flow from "../components/Flow Components/Flow";
import ButtonComponent from "../components/ButtonComponent";
import TestGenContainer from "../components/TestGenContainer";
import { Tree as TreeType } from "../types/Tree";
import HtmlFlow from "../components/Flow Components/HtmlFlow";

type MainPageProps = {
  url: string;
  fileTree: TreeType;
  setPageState: React.Dispatch<React.SetStateAction<string>>;
};

const MainPage = (props: MainPageProps) => {
  const { url, fileTree, setPageState } = props;
  const [currentComponent, setCurrentComponent] = React.useState<TreeType>({
    id: "",
    name: "",
    fileName: "",
    filePath: "",
    importPath: "",
    expanded: false,
    depth: 0,
    count: 0,
    thirdParty: false,
    reactRouter: false,
    reduxConnect: false,
    children: [],
    htmlChildrenTestIds: {},
    parentList: [],
    props: {},
    error: "",
  });
  const [currentHTML, setCurrentHTML] = React.useState("");
  const [currentTestId, setCurrentTestId] = React.useState("");
  const [data, setData] = React.useState("");
  const [onComponentFlow, setOnComponentFlow] = React.useState(true);

  React.useEffect(() => console.log(currentTestId), [currentTestId])
  // Route Handling between pages
  const handleBack = () => {
    setPageState("Home");
  };
  const flowToggle = () => {
    setOnComponentFlow(!onComponentFlow);
  };

  return (
    <div className=" w-full h-screen flex flex-col">
      <div id="NavBar" className="w-screen flex bg-secondaryPrimary">
      <button
          className="rounded-lg p-2 w-fit "
          onClick={handleBack}
        >
          Back
        </button>
      </div>
      <div className="w-full h-1/2 flex">
        <Flow
          onComponentFlow={onComponentFlow}
          fileTree={fileTree}
          currentComponent={currentComponent}
          setCurrentComponent={setCurrentComponent}
          flowToggle={flowToggle}
        />
        <HtmlFlow
          onComponentFlow={onComponentFlow}
          data={data}
          currentHTML={currentHTML}
          setCurrentHTML={setCurrentHTML}
          setCurrentTestId={setCurrentTestId}
          currentTestId={currentTestId}
        />
         <Webview
        url={url}
        currentComponent={currentComponent}
        currentTestId={currentTestId}
        setData={setData}
      />
      </div>
        <div className="fixed bottom-0 left-0 w-1/2 h-2/5 border-2 border-green-400 rounded bg-slate-500">
          <TestGenContainer
            currentTestId={currentTestId}
            currentHTML={currentHTML}
            currentComponent={currentComponent}
          />
      </div>
      <ButtonComponent />
    </div>
    
  );
};

export default MainPage;
