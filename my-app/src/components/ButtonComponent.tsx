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
    <div className='w-1/2 flex justify-between'>
      <button onClick={handleOpen}
      className= "w-1/2 border-2 border-transparent border-r-secondary transition duration-300 ease-in-out hover:bg-secondary hover:text-secondaryPrimary hover:font-bold hover:border-secondaryPrimary"
      >
        Preview and Edit File
      </button>
     
      <button onClick={handleSaveFile} className="w-1/2 rounded-br-lg border-2 border-transparent transition duration-300 ease-in-out hover:bg-secondary hover:text-secondaryPrimary hover:font-bold hover:border-secondaryPrimary"    >
        Save File As...
      </button>
      {open && <PreviewPopup onClose={handleClose} />}
    </div>
  );
};

export default ButtonComponent;