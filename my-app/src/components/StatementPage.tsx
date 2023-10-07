import React, { useState } from 'react';
import SmallerPreviewPopup from './SmallerPreviewPopup';
import DropdownButton from './DropdownButton';
const fs = window.require('fs');
const path = window.require('path');
import { Tree } from '../types/Tree';
import { text } from 'stream/consumers';
// import queryOptions from '../options/queryOptions';
import actionOptions from '../options/actionOptions';
import assertionOptions from '../options/assertionOptions';
import otherCommandOptions from '../options/otherCommandOptions';

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
  const [empty, setEmpty] = React.useState<string>('');
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
    as: {
      option: 'as',
      code: `cy.as()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (args: []): string {
        if (args[1] === empty) {
          return `.as('${args[0]}')`;
        } else {
          return `.as('${args[0]}', '${args[1]}')`;
        }
      },
    },
    children: {
      option: 'Children',
      code: `.children()`,
      tooltip: 'tooltip',
    },
    closest: {
      option: 'Closest',
      code: `.closest()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        return `.closest('${text[0]}')`;
      },
    },
    contains: {
      option: 'Contains',
      code: `cy.contains('[${dataCy}]')`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        if (text[1] === empty) {
          const value = isNaN(text[0]) ? `'${text[0]}'` : text[0];
          return `.contains(${value})`;
        } else {
          const value = isNaN(text[1]) ? `'${text[1]}'` : text[1];
          return `.contains('${text[0]}', ${value})`;
        }
      },
    },
    document: {
      option: 'Document',
      code: `cy.document()`,
      tooltip: 'tooltip',
    },
    eq: {
      option: 'Eq',
      code: `.eq()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        return `.eq(${text[0]})`;
      },
    },
    filter: {
      option: 'Filter',
      code: `.filter()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        return `.filter('${text[0]}')`;
      },
    },
    find: {
      option: 'Find',
      code: `.find()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        return `.find('${text[0]}')`;
      },
    },
    first: {
      option: 'First',
      code: `.first()`,
      tooltip: 'tooltip',
    },
    focused: {
      option: 'Focused',
      code: `cy.focused()`,
      tooltip: 'tooltip',
    },
    get: {
      option: 'Get',
      code: `cy.get('[${dataCy}]')`,
      tooltip: 'tooltip',
    },
    hash: {
      option: 'Hash',
      code: `cy.hash()`,
      tooltip: 'tooltip',
    },
    its: {
      option: 'Its',
      code: `.its()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        const value = isNaN(text[0]) ? `'${text[0]}'` : text[0];
        return `.its(${value})`;
      },
    },
    last: {
      option: 'Last',
      code: `.last()`,
      tooltip: 'tooltip',
    },
    location: {
      option: 'Location',
      code: `cy.location()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        if (text[0] === empty) {
          return `cy.location()`;
        } else {
          return `cy.location('${text[0]}')`;
        }
      },
    },
    next: {
      option: 'Next',
      code: `.next()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        if (text[0] === empty) {
          return `.next()`;
        } else {
          return `.next('${text[0]}')`;
        }
      },
    },
    nextAll: {
      option: 'NextAll',
      code: `.nextAll()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        if (text[0] === empty) {
          return `.nextAll()`;
        } else {
          return `.nextAll('${text[0]}')`;
        }
      },
    },
    nextUntil: {
      option: 'NextUntil',
      code: `.nextUntil()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (args: []): string {
        if (args[1] === empty) {
          return `.nextUntil('${args[0]}')`;
        } else {
          return `.nextUntil('${args[0]}', '${args[1]}')`;
        }
      },
    },
    not: {
      option: 'Not',
      code: `.not()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        return `.not('${text[0]}')`;
      },
    },
    parent: {
      option: 'Parent',
      code: `.parent()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        if (text[0] === empty) {
          return `.parent()`;
        } else {
          return `.parent('${text[0]}')`;
        }
      },
    },
    parents: {
      option: 'Parents',
      code: `.parents()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        if (text[0] === empty) {
          return `.parents()`;
        } else {
          return `.parents('${text[0]}')`;
        }
      },
    },
    parentsUntil: {
      option: 'ParentsUntil',
      code: `.parentsUntil()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (args: []): string {
        if (args[1] === empty) {
          return `.parentsUntil('${args[0]}')`;
        } else {
          return `.parentsUntil('${args[0]}', '${args[1]}')`;
        }
      },
    },
    prev: {
      option: 'Prev',
      code: `.prev()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        if (text[0] === empty) {
          return `.prev()`;
        } else {
          return `.prev('${text[0]}')`;
        }
      },
    },
    prevAll: {
      option: 'PrevAll',
      code: `.prevAll()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        if (text[0] === empty) {
          return `.prevAll()`;
        } else {
          return `.prevAll('${text[0]}')`;
        }
      },
    },
    prevUntil: {
      option: 'PrevUntil',
      code: `.prevUntil()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (args: []): string {
        if (args[1] === empty) {
          return `.prevUntil('${args[0]}')`;
        } else {
          return `.prevUntil('${args[0]}', '${args[1]}')`;
        }
      },
    },
    readFile: {
      option: 'Readfile',
      code: `cy.readFile()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (args: []): string {
        if (args[1] === empty) {
          return `cy.readFile('${args[0]}')`;
        } else {
          return `cy.readFile('${args[0]}', '${args[1]}')`;
        }
      },
    },
    Root: {
      option: 'Root',
      code: `cy.root()`,
      tooltip: 'tooltip',
    },
    shadow: {
      option: 'Shadow',
      code: `.shadow()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        if (text[0] === empty) {
          return `.shadow()`;
        } else {
          return `.shadow('${text[0]}')`;
        }
      },
    },
    siblings: {
      option: 'Siblings',
      code: `.siblings()`,
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (text: []): string {
        if (text[0] === empty) {
          return `.siblings()`;
        } else {
          return `.siblings('${text[0]}')`;
        }
      },
    },
    title: {
      option: 'Title',
      code: `cy.title()`,
      tooltip: 'tooltip',
    },
    url: {
      option: 'URL',
      code: `cy.url()`,
      tooltip: 'tooltip',
    },
    window: {
      option: 'Window',
      code: `cy.window()`,
      tooltip: 'tooltip',
    },
  };
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
          <DropdownButton
            options={otherCommandOptions}
            label='Other Commands'
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

      <div className='w-1/2 overflow-hidden'>
        <SmallerPreviewPopup code={code} setCode={setCode} />
      </div>
    </div>
  );
};

export default StatementPage;
