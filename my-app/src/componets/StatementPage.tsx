// MainPage.tsx
import React, { useState } from 'react';
import SmallerPreviewPopup from './SmallerPreviewPopup';
import DropdownButton from './DropdownButton'
import { parsedEvent } from '../functionality/types';


const StatementPage: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [form, setForm] = useState<parsedEvent>({
    method: '',
    query: '',
    selector: '',
    selectorValue1: '',
    selectorValue2: '',
  })

  const handleOptionClick = (option: string) => {
    setSelectedOptions([...selectedOptions, option]);
  };

  function handleTests(event: parsedEvent): string {
    if (event.selector) {
      if (event.selectorValue2) {
        return `cy.${event.method}('${event.query}').${event.selector}(${event.selectorValue1}, ${event.selectorValue2});`;
      }
      if (event.selectorValue1 && !event.selectorValue2) {
        return `cy.${event.method}('${event.query}').${event.selector}(${event.selectorValue1});`;
      }
      return `cy.${event.method}('${event.query}').${event.selector}();`;
    } else {
      return `cy.${event.method}('${event.query}')`;
    }
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col w-2/3 p-5">
        {/* Button and Dropdowns */}
        <div className="flex space-x-4 mb-5">
          <DropdownButton label="Query" onClickOption={handleOptionClick} />
          <DropdownButton label="Action" onClickOption={handleOptionClick} />
          <DropdownButton label="Assertion" onClickOption={handleOptionClick} />
        </div>

        {/* Statement Bar */}
        <div className="h-10 border mb-2 pl-2">
          {selectedOptions.join(' ')}
        </div>

        {/* Currently Selected Bar */}
        <div className="h-10 border mb-5 pl-2">
          Currently selected:
        </div>

        {/* End Block Buttons */}
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">End describe block</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">End it block</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">End statement</button>
        </div>
      </div>

      <div className="w-1/3 border-l">
        <SmallerPreviewPopup />
      </div>
    </div>
  );
};

export default StatementPage