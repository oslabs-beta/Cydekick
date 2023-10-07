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
    <div className='flex h-full p-2'>
      <div
        id='bot'
        className='flex-1 w-1/2 flex flex-col justify-center items-center rounded-lg bg-gradient-to-b from-secondaryPrimary to-secondaryPrimaryDark p-4'>
        <h1 className='text-2xl font-semibold mb-4 text-secondary'>Name for test:</h1>
        <input
          type='text'
          id='itText'
          className="w-1/2 rounded-full p-2 bg-gradient-to-b from-primary to-primaryDark text-secondary text-center border border-1 border-transparent border-b-primaryDark focus:outline-none focus:border-secondary focus:font-bold focus:shadow-lg focus:scale-105 transition duration-300 hover:font-bold hover:border-secondary hover:shadow-lg hover:scale-105"
          />
        <br></br>
        <button
  className="rounded-full p-2 mt-5 w-1/2 bg-gradient-to-b from-primary to-primaryDark text-secondary border border-1 border-transparent border-b-primaryDark transform transition duration-300 hover:shadow-lg hover:font-bold hover:border-secondary hover:scale-105"
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
