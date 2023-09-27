import SmallerPreviewPopup from './SmallerPreviewPopup'
import React from 'react';
const { ipcRenderer } = window.require('electron');


function DescribePage({SetCurrentPageNum}){
    const [code, setCode] = React.useState('');

    React.useEffect(() => {
        const fileContent = ipcRenderer.sendSync('read-file'); //  , testBlock
        setCode(fileContent);
    }, []);

    function createDescribeBlock(): void {
        // Create the content for the test.cy.js file
        // const describeText = document.getElementById('describeText').value
        const describeText = (document.getElementById('describeText') as HTMLInputElement).value
        console.log(describeText)
        // For example, you can use the current 'code' state value
        const testFileContent = describeBlock(describeText); // Replace with your desired description and test code
    
        // Send a message to the main process to create the describe block
        ipcRenderer.send('create-describe-block', testFileContent);
    
        // Listen for a confirmation message from the main process
        ipcRenderer.once('describe-block-created', (event, filePath) => {
          console.log(`File '${filePath}' has been created with the describe block.`);
        });
        SetCurrentPageNum(1)
      }

      //describe block
    function describeBlock(string: string): string {
        return `describe(${string}, () => {`;
    }


    return (
      <div className="flex">
        <div className='flex-1 flex-col w-3/5 h-3/5 items-center justify-center'>
          <h1 className='text-2xl font-bold mb-4'>Name for describe block:</h1>
          <input type='text' id='describeText' className='text-2xl font-bold mb-4' />
          <br></br>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-md' onClick={createDescribeBlock}>
            Create describe block
          </button>
        </div>
        <div className='flex-1 bg-gray-200 border border-gray-400 rounded-r-lg'>
          <SmallerPreviewPopup />
          </div>
      </div>
      );
    }

export default DescribePage

