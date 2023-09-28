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

  return (
    <div >
      <MonacoEditor
        width='370'
        height='400'
        language='javascript'
        theme='vs-dark'
        value={code}
        options={{
          selectOnLineNumbers: true,
          autoClosingQuotes: 'always',
        }}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default SmallerPreviewPopup;

