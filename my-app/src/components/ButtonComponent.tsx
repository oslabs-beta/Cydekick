import React from 'react';
import PreviewPopup from './PreviewPopup';
const { dialog } = window.require('@electron/remote');

const { ipcRenderer } = window.require('electron');


const ButtonComponent = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveFile = async () => {
    // Get the file content
    const content = ipcRenderer.sendSync('read-file');
    
    // Open the save dialog to let the user select where to save the file
    const { filePath } = await dialog.showSaveDialog({
      title: 'Save your file',
      defaultPath: 'UserTestFile.cy.js',
      filters: [
        { name: 'JavaScript', extensions: ['js'] },
      ],
    });
    
    // If the user selects a path, write the content to that path
    if (filePath) {
      const fs = window.require('fs');
      fs.writeFileSync(filePath, content);
    }
  };


  return (
    <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
      <button onClick={handleOpen}
      style={{ border: '1px solid black', padding: '5px 10px', cursor: 'pointer', marginRight: '5px' }}
      >
        Preview and Edit File
      </button>
     
      <button onClick={handleSaveFile}
      style={{ border: '1px solid black', padding: '5px 10px', cursor: 'pointer', marginRight: '5px' }}
      >
        Save File As...
      </button>
      {open && <PreviewPopup onClose={handleClose} />}
    </div>
  );
};

export default ButtonComponent;