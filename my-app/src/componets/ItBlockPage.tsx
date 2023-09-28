import SmallerPreviewPopup from './SmallerPreviewPopup';

import React from 'react';
const { ipcRenderer } = window.require('electron');

function ItBlockPage({SetCurrentPageNum}) {
  const [code, setCode] = React.useState('');

  React.useEffect(() => {
    const fileContent = ipcRenderer.sendSync('read-file'); //  , testBlock
    setCode(fileContent);
  }, []);

  function createItBlock(): void {
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
    <div className='flex'>
      <div
        id='bot'
        className='flex-1 w-3/5 h-3/5 flex items-center justify-center flex-col'>
        <h1 className='text-2xl font-bold mb-4'>Name for test:</h1>
        <input
          type='text'
          id='describeText'
          className='text-2xl font-bold mb-4'
        />
        <br></br>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded-md'
          onClick={() => {
            SetCurrentPageNum(2);
          }}>
          Create it block
        </button>
      </div>
      <div className='flex-1 w-2/5 h-2/5 bg-gray-200 border border-gray-400 rounded-r-lg overflow-hidden'>
        <SmallerPreviewPopup />
      </div>
    </div>
  );
}
export default ItBlockPage;
