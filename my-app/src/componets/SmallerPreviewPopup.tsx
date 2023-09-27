import React from 'react';
import MonacoEditor from 'react-monaco-editor';
// import { remote } from 'electron';
const { ipcRenderer } = window.require('electron');

// const fs = remote.require('fs');

const PreviewPopup = () => {
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
    <>
      <div>
        <MonacoEditor
          width='500'
          height='393'
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
    </>
  );
};

export default PreviewPopup;
