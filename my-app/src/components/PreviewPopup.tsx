import React from 'react';
import MonacoEditor from 'react-monaco-editor';
const { ipcRenderer } = window.require('electron');

type PreviewPopupProps = {
  onClose: () => void;
}

const PreviewPopup: React.FC<PreviewPopupProps> = ({ onClose }) => {
  const [code, setCode] = React.useState('');

  React.useEffect(() => {
    const fileContent = ipcRenderer.sendSync('read-file');
    setCode(fileContent);
  }, []);

  const handleEditorChange = (newValue: string) => {
    setCode(newValue);
  };

  const handleClose = () => {
    ipcRenderer.send('write-file', code);
    onClose();
  };

  

  return (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={
          { 
            selectOnLineNumbers: true, 
            autoClosingQuotes: "always",
          }}
        onChange={handleEditorChange}
      />
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default PreviewPopup;