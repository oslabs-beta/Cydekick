// MainPage.tsx
import React, { useState } from 'react';
import SmallerPreviewPopup from './SmallerPreviewPopup';
import DropdownButton from './DropdownButton'
const fs = window.require('fs');
const path = window.require('path')

const StatementPage: React.FC = ({SetCurrentPageNum, currentComponent, currentHTML, currentTestId}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [dataCy, setDataCy] = useState<string>('');
  const [code, setCode] = React.useState<string>('');
  const filePath = path.join(process.cwd(), 'UserTests', 'TestBlock.cy.js')
  const filePreviewPath = path.join(process.cwd(), 'UserTests', 'UserTestFile.cy.js')
  
  React.useEffect(() => {
    const filePath = path.join(process.cwd(), 'UserTests', 'TestBlock.cy.js');
    const fileContent = fs.readFileSync(filePath, 'utf8')
    console.log(fileContent)
    setCode(fileContent);
  }, []);

  React.useEffect(() =>{
    setDataCy(currentTestId)
  },[currentTestId]);
  
  const handleOptionClick = (option: string) => {
    setSelectedOptions([...selectedOptions, option]);
  };
  function endItBlock(){
    fs.appendFileSync(filePath, "})");
    SetCurrentPageNum(1)
  }
  function endDescribeBlock(){

    fs.appendFileSync(filePath, "\n\t" + "})" + "\n" + "})");
    SetCurrentPageNum(0)
    const testBlockContent = fs.readFileSync(filePath, 'utf8')
    fs.writeFileSync(filePreviewPath, testBlockContent)
  }

  function endStatement() {
    fs.appendFileSync(filePath, '\n\t\t' + selectedOptions.join(''))
    setSelectedOptions([])
    const fileContent = fs.readFileSync(filePath, 'utf8')
    setCode(fileContent)
  }

  const queryOptions = {
                        get: 
                          {
                            option: 'Get',
                            code: `cy.get('[${dataCy}]')`,
                            tooltip: 'tooltip'
                          }, 
                        contains: 
                          {
                            option: 'Contains',
                            code: `cy.contains('[${dataCy}]')`,
                            tooltip: 'tooltip'
                          }, 
                       };

  const actionOptions = {
                          click: 
                          {
                            option: 'Click',
                            code: '.click()',
                            tooltip: 'tooltip'
                          }, 
                          type: 
                          {
                            option: 'Type',
                            code: '.type()',
                            tooltip: 'tooltip'
                          }, 
                          doubleClick: 
                          {
                            option: 'Contains',
                            code: '.dlbClick()',
                            tooltip: 'tooltip'
                          }, 
                        };

  const assertionOptions = {
                            should: 
                            {
                              option: 'Should',
                              code: '.should()',
                              tooltip: 'tooltip'
                            }, 
                            expect: 
                            {
                              option: 'Expect',
                              code: '.expect()',
                              tooltip: 'tooltip'
                            }, 
                            
                          };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-3/5 p-5">
        {/* Button and Dropdowns */}
        <div className="flex justify-between">
          <DropdownButton options={queryOptions} label="Query" onClickOption={handleOptionClick} />
          <DropdownButton options={actionOptions} label="Action" onClickOption={handleOptionClick} />
          <DropdownButton options={assertionOptions} label="Assertion" onClickOption={handleOptionClick} />
        </div>

        {/* Statement Bar */}
        <div className="h-10 border mb-2 pl-2">
          {selectedOptions.join('')}
        </div>

        {/* Currently Selected Bar */}
        <div className="h-10 border mb-5 pl-2">
        Currently selected: 
        {currentHTML}
        {currentComponent && currentComponent.name && ` in ${currentComponent.name}`}
        {currentTestId && ` with ${currentTestId}`}
        </div>

        {/* End Block Buttons */}
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={endDescribeBlock}>End describe block</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={endItBlock}>End it block</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={endStatement}>End statement</button>
        </div>
      </div>

      <div className="w-2/5 border-l overflow-hidden">
        <SmallerPreviewPopup code={code}/>
      </div>
    </div>
  );
};

export default StatementPage
