import { Parser } from "../parser";
import React from "react";
import { Tree } from "../types/Tree";

type GetFileProps = {
  setter: (tre: Tree) => void;
};

const GetFile = ({ setter }: GetFileProps) => {
  const [fileName, setFileName] = React.useState("");

  function parseTree() {
    const file = (document.getElementById("theInputFile") as HTMLInputElement)
      .files[0];
    const DaParser = new Parser(file.path);
    DaParser.parse();
    setFileName(DaParser.tree.fileName);
    setter(DaParser.tree);
  }

  return (
<div className="flex flex-col rounded-full justify-center items-center w-full p-2 border border-transparent bg-primary hover:shadow-xl hover:border-secondary transition duration-300">
  <label htmlFor="theInputFile" className="cursor-pointer">
    Choose Root Component (e.g., App.jsx):
  </label>
  <input
    data-cy="test"
    type="file"
    id="theInputFile"
    onChange={parseTree}
    className="hidden"
  />
  <div className="flex items-center justify-between mt-2">
    <span className="text-secondary text-xs">
      {fileName.length === 0
        ? "No file selected"
        : `Currently Selected: ${fileName}`}
    </span>
  </div>
</div>
  );
};

export default GetFile;
