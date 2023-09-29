import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import fs from 'fs';

const PreviewPopup = ({ onClose }) => {
  const [code, setCode] = React.useState('');

  React.useEffect(() => {
    const fileContent = fs.readFileSync('./src/emptyFile.cy.js', 'utf-8');
    setCode(fileContent);
  }, []);

  const handleEditorChange = (newValue) => {
    setCode(newValue);
  };

  const handleClose = () => {
    fs.writeFileSync('./src/emptyFile.cy.js', code);
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
        options={{ selectOnLineNumbers: true }}
        onChange={handleEditorChange}
      />
      <button onClick={handleClose}>Close</button>
    </div>
  );
};

export default PreviewPopup;