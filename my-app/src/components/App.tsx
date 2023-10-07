import React from "react";
import Home from "../Routes/Home";
import MainPage from "../Routes/MainPage";
import {Tree} from "../types/Tree"

const App = () => {
  const [url, setUrl] = React.useState('');
  const [fileTree, setFileTree] = React.useState<Tree>({
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
  const [pageState, setPageState] = React.useState("Home");

  return pageState === "Home" ? (
    <Home
      setUrl={setUrl}
      setFileTree={setFileTree}
      url={url}
      setPageState={setPageState}
      fileTree={fileTree}
    />
  ) : (
    <MainPage fileTree={fileTree} url={url} setPageState={setPageState} />
  );
};

export default App;
