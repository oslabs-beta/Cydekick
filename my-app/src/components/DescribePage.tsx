import SmallerPreviewPopup from './SmallerPreviewPopup'
import React from 'react';
const fs = window.require('fs');
const path = window.require('path')

type DescribePageProps = {
  setCurrentPageNum: React.Dispatch<React.SetStateAction<number>>
}

function DescribePage({ setCurrentPageNum }: DescribePageProps) {

  //States
  const [code, setCode] = React.useState<string>(''); // initial string that is displayed on the editor

  //text that is rendered whenever the describe page is mounted
  React.useEffect(() => {
    const fileContent = `'Welcome to Cydekick!' \n'Enter text for your describe block!'`
    setCode(fileContent);
  }, []);

  //Describe block function that appends our describe block to the monaco editor
  function createDescribeBlock(): void {
    const describeText = (document.getElementById('describeText') as HTMLInputElement).value
    const testFileContent = describeBlock(describeText);
    const filePath = path.join(process.cwd(), 'UserTests', 'TestBlock.cy.js');
    fs.writeFileSync(filePath, testFileContent);
    setCurrentPageNum(1)
  }

  //describe block that returns a describe string
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
        <SmallerPreviewPopup code={code} setCode={setCode}/>
      </div>
    </div>
  );
}

export default DescribePage

