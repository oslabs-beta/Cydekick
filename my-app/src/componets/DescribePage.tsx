import SmallerPreviewPopup from './SmallerPreviewPopup'
import React from 'react';
const fs = window.require('fs');
const path = window.require('path')
const { ipcRenderer } = window.require('electron');

function DescribePage({SetCurrentPageNum}){
    const [code, setCode] = React.useState<string>('');

    React.useEffect(() => {
        // const fileContent = ipcRenderer.sendSync('read-file'); //  , testBlock
        const fileContent = `'Welcome to Cydekick!' \n'Enter text for your describe block!'`
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
        // ipcRenderer.send('create-describe-block', testFileContent);
    
        // Listen for a confirmation message from the main process
        // ipcRenderer.once('describe-block-created', (event, filePath) => {
        //   console.log(`File '${filePath}' has been created with the describe block.`);
        // });
        console.log(process.cwd())
        // /Users/siddhantsaxena/OSP/Cydekick/my-app/UserTests/TestBlock.cy.js
        // fs.writeFileSync(path.resolve(__dirname, '../../UserTests/TestBlock.cy.js'), testFileContent);
        console.log(path.join(process.cwd(), 'UserTests', 'TestBlock.cy.js'))
        const filePath = path.join(process.cwd(), 'UserTests', 'TestBlock.cy.js');
        fs.writeFileSync(filePath, testFileContent);

        // setCode(testFileContent)
        SetCurrentPageNum(1)
      }

      //describe block
    function describeBlock(string: string): string {
        return `describe('${string}', () => {`;
    }


    return (
      <div className='flex'>
      <div
        id='bot'
        className='flex-1 w-3/5 h-3/5 flex items-center justify-center flex-col'>
        <h1 className='text-2xl font-bold mb-4'>Name for describe block:</h1>
        <input
          type='text'
          id='describeText'
          className='text-2xl font-bold mb-4'
        />
        <br></br>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded-md'
          onClick={createDescribeBlock}>
          Create describe block
        </button>
      </div>
      <div className='flex-1 w-2/5 h-2/5 bg-gray-200 border border-gray-400 rounded-r-lg overflow-hidden'>
        <SmallerPreviewPopup code={code}/>
      </div>
    </div>
      );
    }

export default DescribePage

