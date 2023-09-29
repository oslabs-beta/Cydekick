import { Parser } from '../parser';
import React from 'react';
import { Tree } from '../types/Tree';

type GetFileProps = {
  setter: (tre:Tree) => void,
}

const GetFile = ({setter}: GetFileProps) => {
  const [fileName, setFileName] = React.useState('Choose File');

  function parseTree() {
    const file = (document.getElementById('theInputFile') as HTMLInputElement).files[0];
    const DaParser = new Parser(file.path);
    DaParser.parse();
    setFileName(DaParser.tree.fileName)
    setter(DaParser.tree);
  }

  return (
      <div className='w-50 rounded-lg p-1 hover: cursor-pointer' style={{backgroundColor: "#1DF28F"}}> 
      <label htmlFor='theInputFile' className='hover: cursor-pointer'>{fileName}</label>
      <input data-cy='test' type='file' id='theInputFile' onChange={parseTree} className='hidden'/>
      </div>
  );
};

export default GetFile;
