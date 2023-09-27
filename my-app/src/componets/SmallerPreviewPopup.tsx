import React from 'react';
import MonacoEditor from 'react-monaco-editor';
// import { remote } from 'electron';
const { ipcRenderer } = window.require('electron');

// const fs = remote.require('fs');

const SmallerPreviewPopup = () => {

  const [code, setCode] = React.useState('');

  React.useEffect(() => {
    const fileContent = ipcRenderer.sendSync('read-file');
    setCode(fileContent);
  }, []);

  const handleEditorChange = newValue => {
    setCode(newValue);
  };

  const handleClose = () => {
    ipcRenderer.send('write-file', code);
  };

  return (
    <div className='fixed top-0 right-0 z-100'>
      <MonacoEditor
        width='370'
        height='900'
        language='javascript'
        theme='vs-dark'
        value={code}
        options={{
          selectOnLineNumbers: true,
          autoClosingQuotes: 'always',
        }}
        onChange={handleEditorChange}
      />
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default SmallerPreviewPopup;

