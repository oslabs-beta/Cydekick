import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "../Routes/Home";
import MainPage from "../Routes/MainPage";

const App = () => {
    const [url, setUrl] = React.useState("http://localhost:9000/");
    const [fileTree, setFileTree] = React.useState([]);
    

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home setUrl={setUrl} setFileTree={setFileTree} url={url}/>} />
        <Route path="/MainPage" element={<MainPage url={url} fileTree={fileTree}/>}/>
      </Routes>
    </HashRouter>
  );
};

export default App;
