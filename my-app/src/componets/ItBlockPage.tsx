import SmallerPreviewPopup from './SmallerPreviewPopup';

import React from 'react';
const { ipcRenderer } = window.require('electron');

function ItBlockPage() {
  const [code, setCode] = React.useState('');

  React.useEffect(() => {
    const fileContent = ipcRenderer.sendSync('read-file'); //  , testBlock
    setCode(fileContent);
  }, []);

  function createItBlock() {
    // Create the content for the test.cy.js file
    // For example, you can use the current 'code' state value
    const testFileContent = itBlock('YourTestDescription'); // Replace with your desired description and test code

    // Send a message to the main process to create the it block
    ipcRenderer.send('create-it-block', testFileContent);

    // Listen for a confirmation message from the main process
    ipcRenderer.once('it-block-created', (event, filePath) => {
      console.log(`File '${filePath}' has been created with the it block.`);
    });
  }


  function itBlock(string: string): string {
    return `it(${string}, () => {})`;
  }



  return (
    <div>
      <h1 className='ml-8'>Name for test:</h1>
      <input type='text' className='border border-neutral-950 ml-8' />
      <br></br>
      <button className='border border-neutral-950 ml-8'>

        Create It block
      </button>
      <SmallerPreviewPopup />

    </div>
  );
}
export default ItBlockPage;
