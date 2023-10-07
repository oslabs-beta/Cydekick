import SmallerPreviewPopup from './SmallerPreviewPopup';
const fs = window.require('fs');
const path = window.require('path')
import React from 'react';

type ItBlockPageProps = {
  setCurrentPageNum: React.Dispatch<React.SetStateAction<number>>
}

function ItBlockPage({ setCurrentPageNum }: ItBlockPageProps) {
  //states
  const [code, setCode] = React.useState('');

  //renders the current state of the editor
  React.useEffect(() => {
    const filePath = path.join(process.cwd(), 'UserTests', 'TestBlock.cy.js');
    const fileContent = fs.readFileSync(filePath, 'utf8')
    setCode(fileContent);
  }, []);

  //appends the itBlock to the Editor
  function createItBlock(): void {
    const itText = (document.getElementById('itText') as HTMLInputElement).value
    const testFileContent = itBlock(itText);
    const filePath = path.join(process.cwd(), 'UserTests', 'TestBlock.cy.js');
    fs.appendFileSync(filePath, testFileContent);
    setCurrentPageNum(2);
  }

  //creates an it String that will be displayed on the monaco editor
  function itBlock(string: string): string {
    return '\n\t' + `it('${string}', () => {`;
  }

  return (
    <div className='flex h-full'>
      <div
        id='bot'
        className='flex-1 w-3/5 h-3/5 flex items-center justify-center flex-col'>
        <h1 className='text-2xl font-bold mb-4'>Name for test:</h1>
        <input
          type='text'
          id='itText'
          className='text-2xl font-bold mb-4'
        />
        <br></br>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded-md'
          onClick={createItBlock}>
          Create it block
        </button>
      </div>
      <div className='w-1/2 overflow-hidden'>
        <SmallerPreviewPopup code={code} setCode={setCode}/>
      </div>
    </div>
  );
}
export default ItBlockPage;
