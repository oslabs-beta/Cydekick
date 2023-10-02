import React, { useState } from 'react';
import SmallerPreviewPopup from './SmallerPreviewPopup';
import DropdownButton from './DropdownButton';
const fs = window.require('fs');
const path = window.require('path');
import { Tree } from '../types/Tree';
import { text } from 'stream/consumers';

type StatementPageProps = {
  setCurrentPageNum: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: Tree;
  currentHTML: string;
  currentTestId: string;
};

const StatementPage: React.FC<StatementPageProps> = ({
  setCurrentPageNum,
  currentComponent,
  currentHTML,
  currentTestId,
}) => {
  //state variables
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [dataCy, setDataCy] = useState<string>('');
  const [code, setCode] = React.useState<string>('');
  const filePath = path.join(process.cwd(), 'UserTests', 'TestBlock.cy.js');
  const filePreviewPath = path.join(
    process.cwd(),
    'UserTests',
    'UserTestFile.cy.js',
  );

  //renders current state of testblock.cy.js onto the monaco editor
  React.useEffect(() => {
    const filePath = path.join(process.cwd(), 'UserTests', 'TestBlock.cy.js');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    setCode(fileContent);
  }, []);

  //whenever we grab our data-cy test Id from the prop, we set it in state and is used as the testId for the component tests
  React.useEffect(() => {
    setDataCy(currentTestId);
  }, [currentTestId]);

  //function is invoked whenever a user selects one of the option in the dropdown and reassigns state so that it appears in the statement bar
  const handleOptionClick = (option: string) => {
    setSelectedOptions([...selectedOptions, option]);
  };

  //a function attached to a button to append the Itblock onto the editor
  function endItBlock() {
    fs.appendFileSync(filePath, '})');
    setCurrentPageNum(1);
  }

  function endDescribeBlock() {
    fs.appendFileSync(filePath, '\n\t' + '})' + '\n' + '})');
    setCurrentPageNum(0);
    const testBlockContent = fs.readFileSync(filePath, 'utf8');
    fs.writeFileSync(filePreviewPath, testBlockContent);
  }

  function endStatement() {
    fs.appendFileSync(filePath, '\n\t\t' + selectedOptions.join(''));
    setSelectedOptions([]);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    setCode(fileContent);
  }

  const queryOptions = {
    get: {
      option: 'Get',
      code: `cy.get('[${dataCy}]')`,
      tooltip: 'tooltip',
    },
    contains: {
      option: 'Contains',
      code: `cy.contains('[${dataCy}]')`,
      tooltip: 'tooltip',
    },
  };

  const actionOptions = {
    click: {
      option: 'Click',
      code: '.click()',
      tooltip: 'tooltip',
    },
    type: {
      option: 'Type',
      code: '.type()',
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        return `.type('${text[0]}')`;
      },
    },
    doubleClick: {
      option: 'Contains',
      code: '.dlbClick()',
      tooltip: 'tooltip',
    },
  };

  const assertionOptions = {
    should: {
      option: 'Should',
      code: '.should()',
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'select', options: ['be.visible', 'be.empty', 'eq'] },
        { type: 'input', inputType: 'text' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (args: []): string {
        console.log(args);
        if (args.length === 1) {
          return `.should('${args[0]}')`;
        } else if (args.length === 2) {
          return `.should('${args[0]}', '${args[1]}')`;
        } else if (args.length === 3) {
          return `.should('${args[0]}', '${args[1]}', '${args[2]}')`;
        }
      },
    },
    expect: {
      option: 'Expect',
      code: '.expect()',
      tooltip: 'tooltip',
    },
  };

  //   .should(chainers)
  // .should(chainers, value)
  // .should(chainers, method, value)
  // .should(callbackFn)

  return (
    <div className='flex h-screen'>
      <div className='flex flex-col w-3/5 p-5'>
        {/* Button and Dropdowns */}
        <div className='flex justify-between'>
          <DropdownButton
            options={queryOptions}
            label='Query'
            onClickOption={handleOptionClick}
          />
          <DropdownButton
            options={actionOptions}
            label='Action'
            onClickOption={handleOptionClick}
          />
          <DropdownButton
            options={assertionOptions}
            label='Assertion'
            onClickOption={handleOptionClick}
          />
        </div>

        {/* Statement Bar */}
        <div className='h-10 border mb-2 pl-2'>{selectedOptions.join('')}</div>

        {/* Currently Selected Bar */}
        <div className='h-10 border mb-5 pl-2'>
          Currently selected:
          {currentHTML}
          {currentComponent &&
            currentComponent.name &&
            ` in ${currentComponent.name}`}
          {currentTestId && ` with ${currentTestId}`}
        </div>

        {/* End Block Buttons */}
        <div className='flex space-x-4'>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded'
            onClick={endDescribeBlock}>
            End describe block
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded'
            onClick={endItBlock}>
            End it block
          </button>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded'
            onClick={endStatement}>
            End statement
          </button>
        </div>
      </div>

      <div className='w-2/5 border-l overflow-hidden'>
        <SmallerPreviewPopup code={code} setCode={setCode} />
      </div>
    </div>
  );
};

export default StatementPage;
