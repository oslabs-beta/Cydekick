import React from 'react';
import MonacoEditor from 'react-monaco-editor';
// const { ipcRenderer } = window.require('electron');
const path = window.require('path');
const fs = window.require('fs');
const os = window.require('os');
type PreviewPopupProps = {
  onClose: () => void;
};

const PreviewPopup: React.FC<PreviewPopupProps> = ({ onClose }) => {
  const [code, setCode] = React.useState('');
  const filePreviewPath = path.join(
    os.tmpdir(),
    'UserTests',
    'UserTestFile.cy.js',
  );
  React.useEffect(() => {
    setCode(fs.readFileSync(filePreviewPath, 'utf-8'));
  }, []);

  const handleEditorChange = (newValue: string) => {
    setCode(newValue);
  };

  const handleClose = () => {
    fs.writeFileSync(filePreviewPath, code);
    onClose();
  };

  return (
    // <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
    //   <MonacoEditor
    //     width="800"
    //     height="600"
    //     language="javascript"
    //     theme="vs-dark"
    //     value={code}
    //     options={
    //       {
    //         selectOnLineNumbers: true,
    //         autoClosingQuotes: "always",
    //       }}
    //     onChange={handleEditorChange}
    //   />
    //   <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md mt-4" onClick={handleClose}>Close</button>
    // </div>

    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}>
      <div style={{ position: 'relative', width: '800px', height: '600px' }}>
        <MonacoEditor
          language='javascript'
          theme='vs-dark'
          value={code}
          options={{
            selectOnLineNumbers: true,
            autoClosingQuotes: 'always',
          }}
          onChange={handleEditorChange}
          width='100%'
          height='100%'
        />
        <button
          onClick={handleClose}
          className='bg-gradient-to-b from-primary to-primaryDark text-secondary font-semibold px-4 py-2 rounded-md absolute bottom-4 right-4 transition duration-300 hover:shadow-lg hover:font-bold'>
          Close
        </button>
      </div>
    </div>
  );
};

export default PreviewPopup;
