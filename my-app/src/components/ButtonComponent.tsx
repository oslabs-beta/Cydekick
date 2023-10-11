import React from 'react';
import PreviewPopup from './PreviewPopup';
import path from 'path';
import os from 'os';
import fs from 'fs';

const { ipcRenderer } = window.require('electron');


const ButtonComponent = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//   const handleSaveFile = async () => {
//     const tempDirPath = path.join(os.tmpdir(), 'UserTests', 'UserTestFile.cy.js');
//     const content = fs.readFileSync(tempDirPath, 'utf-8');

//     // const { dialog } = window.require('@electron/remote');
//     const filePath = await dialog.showSaveDialog({
//       title: 'Save your file',
//       defaultPath: 'UserTestFile.cy.js',
//       filters: [{ name: 'JavaScript', extensions: ['js'] }],
//     });

//     if (filePath) {
//       fs.writeFileSync(filePath, content);
//     }
//   };
const handleSaveFile = () => {
    const tempDirPath = path.join(os.tmpdir(), 'UserTests', 'UserTestFile.cy.js');
    const content = fs.readFileSync(tempDirPath, 'utf-8');
  
    ipcRenderer.invoke('save-file', content);
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