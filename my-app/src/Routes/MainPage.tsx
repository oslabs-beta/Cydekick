import React from 'react';
import Webview from '../components/Webview';
import Flow from '../components/Flow Components/Flow';
import ButtonComponent from '../components/ButtonComponent';
import TestGenContainer from '../components/TestGenContainer';
import { Tree as TreeType } from '../types/Tree';
import HtmlFlow from '../components/Flow Components/HtmlFlow';

type MainPageProps = {
  url: string;
  fileTree: TreeType;
  setPageState: React.Dispatch<React.SetStateAction<string>>;
};

const MainPage = (props: MainPageProps) => {
  const { url, fileTree, setPageState } = props;
  const [currentComponent, setCurrentComponent] = React.useState<TreeType>({
    id: '',
    name: '',
    fileName: '',
    filePath: '',
    importPath: '',
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
    error: '',
  });
  const [currentHTML, setCurrentHTML] = React.useState('');
  const [currentTestId, setCurrentTestId] = React.useState('');
  const [data, setData] = React.useState('');
  const [onComponentFlow, setOnComponentFlow] = React.useState(true);

  React.useEffect(() => console.log(currentTestId), [currentTestId]);
  // Route Handling between pages
  const handleBack = () => {
    setPageState('Home');
  };
  const flowToggle = () => {
    if (data) setOnComponentFlow(!onComponentFlow);
  };
  const handleReload = () => {
    const webview = document.getElementById(
      "webview"
    ) as Electron.WebviewTag | null;
    webview.loadURL(url);
  };

  return (
    <div className=" w-full h-screen flex flex-col">
      <div
        id="NavBar"
        className="w-screen flex bg-gradient-to-b from-secondaryPrimary to-secondaryPrimaryDark rounded-b-lg"
      >
        <button
          className="justify-center w-1/4 rounded-bl-lg border-2 border-transparent border-r-secondary transition duration-300 ease-in-out hover:bg-secondary hover:text-secondaryPrimary hover:font-bold hover:border-secondaryPrimary"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="w-1/4 border-2 border-transparent border-r-secondary transition duration-300 ease-in-out hover:bg-secondary hover:text-secondaryPrimary hover:font-bold hover:border-secondaryPrimary"
          onClick={handleReload}
        >
          Reload URL
        </button>
        <ButtonComponent />
      </div>
      <div className='w-full h-3/5 flex'>
        <Flow
          onComponentFlow={onComponentFlow}
          fileTree={fileTree}
          currentComponent={currentComponent}
          setCurrentComponent={setCurrentComponent}
          flowToggle={flowToggle}
        />
        <HtmlFlow
          onComponentFlow={onComponentFlow}
          flowToggle={flowToggle}
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
      <div className="w-full flex-grow mt-2 bg-transparent">
        <TestGenContainer
          currentTestId={currentTestId}
          currentHTML={currentHTML}
          currentComponent={currentComponent}
        />
      </div>
    </div>
  );
};

export default MainPage;
