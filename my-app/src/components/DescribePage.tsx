import SmallerPreviewPopup from './SmallerPreviewPopup'
import React from 'react';
const fs = window.require('fs');
const os = window.require('os');

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
    // const filePath = path.join(__dirname, 'src', 'UserTests', 'TestBlock.cy.js');
    const filePath = path.join(os.tmpdir(), 'UserTests', 'TestBlock.cy.js');


    fs.writeFileSync(filePath, testFileContent);
    setCurrentPageNum(1)
  }

  //describe block that returns a describe string
  function describeBlock(string: string): string {
    return `describe('${string}', () => {`;
  }


  return (
  <div className='flex h-full p-2'>
  <div
    id='bot'
    className='flex-1 w-1/2 flex flex-col justify-center items-center rounded-lg bg-gradient-to-b from-secondaryPrimary to-secondaryPrimaryDark p-4'>
    <h1 className='text-2xl font-semibold mb-4 text-secondary'>Name for describe block:</h1>
    <input
      type='text'
      id='describeText'
      className="w-1/2 rounded-full p-2 bg-gradient-to-b from-primary to-primaryDark text-secondary text-center border border-1 border-transparent border-b-primaryDark focus:outline-none focus:border-secondary focus:font-bold focus:shadow-lg focus:scale-105 transition duration-300 hover:font-bold hover:border-secondary hover:shadow-lg hover:scale-105"
      />
    <button
  className="rounded-full p-2 mt-5 w-1/2 bg-gradient-to-b from-primary to-primaryDark text-secondary border border-1 border-transparent border-b-primaryDark transform transition duration-300 hover:shadow-lg hover:font-bold hover:border-secondary hover:scale-105"
  onClick={createDescribeBlock}>
      Create describe block
    </button>
  </div>
  <div className='w-1/2 h-full overflow-hidden'>
    <SmallerPreviewPopup code={code} setCode={setCode}/>
  </div>
</div>
  );
}

export default DescribePage

