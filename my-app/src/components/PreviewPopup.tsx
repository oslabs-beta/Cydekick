import React from 'react';
import MonacoEditor from 'react-monaco-editor';
// const { ipcRenderer } = window.require('electron');
const path = window.require('path');
const fs = window.require('fs');
const os = window.require('os');
type PreviewPopupProps = {
  onClose: () => void;
}

const PreviewPopup: React.FC<PreviewPopupProps> = ({ onClose }) => {
  const [code, setCode] = React.useState('');
  const filePreviewPath = path.join(
    os.tmpdir(),
    "UserTests",
    "UserTestFile.cy.js"
  );
  React.useEffect(() => {
    setCode(fs.readFileSync(filePreviewPath,'utf-8'));
  }, []);

  const handleEditorChange = (newValue: string) => {
    setCode(newValue);
  };

  const handleClose = () => {
    fs.writeFileSync(filePreviewPath, code);
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