import SmallerPreviewPopup from './PreviewPopup'
import React from 'react';
const { ipcRenderer } = window.require('electron');


function DescribePage(){
    const [code, setCode] = React.useState('');

    React.useEffect(() => {
        const fileContent = ipcRenderer.sendSync('read-file'); //  , testBlock
        setCode(fileContent);
    }, []);

    function createDescribeBlock() {
        // Create the content for the test.cy.js file
        // For example, you can use the current 'code' state value
        const testFileContent = describeBlock('YourTestDescription'); // Replace with your desired description and test code
    
        // Send a message to the main process to create the describe block
        ipcRenderer.send('create-describe-block', testFileContent);
    
        // Listen for a confirmation message from the main process
        ipcRenderer.once('describe-block-created', (event, filePath) => {
          console.log(`File '${filePath}' has been created with the describe block.`);
        });
      }

      //describe block
    function describeBlock(string: string): string {
        return `describe(${string}, () => {`;
    }


    return (
        <div>
          <h1 className='ml-8'>Name for describe block:</h1>
          <input type='text' className='border border-neutral-950 ml-8' />
          <br></br>
          <button className='border border-neutral-950 ml-8'>
            Create describe block
          </button>
          <SmallerPreviewPopup />
        </div>
      );
    }
}
export default DescribePage

