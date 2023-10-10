import React, { useState } from "react";
import SmallerPreviewPopup from "./SmallerPreviewPopup";
import DropdownButton from "./DropdownButton";
const fs = window.require("fs");
const path = window.require("path");
import { Tree } from "../types/Tree";
import actionOptions from "../options/actionOptions";
import assertionOptions from "../options/assertionOptions";
import otherCommandOptions from "../options/otherCommandOptions";
import { encodingArray } from "../options/optionVariables";

type ModalCreateCodeType = (string | number)[];

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
  const [dataCy, setDataCy] = useState<string>("");
  const [code, setCode] = React.useState<string>("");
  const [empty, setEmpty] = React.useState<string>("");
  const filePath = path.join(process.cwd(), "UserTests", "TestBlock.cy.js");
  const filePreviewPath = path.join(
    process.cwd(),
    "UserTests",
    "UserTestFile.cy.js"
  );
  const [dropDown, setDropDown] = useState<string>("");
  //renders current state of testblock.cy.js onto the monaco editor
  React.useEffect(() => {
    const filePath = path.join(process.cwd(), "UserTests", "TestBlock.cy.js");
    const fileContent = fs.readFileSync(filePath, "utf8");
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
    fs.appendFileSync(filePath, "})");
    setCurrentPageNum(1);
  }

  function endDescribeBlock() {
    fs.appendFileSync(filePath, "\n\t" + "})" + "\n" + "})");
    setCurrentPageNum(0);
    const testBlockContent = fs.readFileSync(filePath, "utf8");
    fs.writeFileSync(filePreviewPath, testBlockContent);
  }

  function endStatement() {
    fs.appendFileSync(filePath, "\n\t\t" + selectedOptions.join(""));
    setSelectedOptions([]);
    const fileContent = fs.readFileSync(filePath, "utf8");
    setCode(fileContent);
  }

  const queryOptions = {
    as: {
      option: "as",
      code: `.as()`,
      tooltip: "Retrieve and alias elements.",
      modal: [
        { type: "label", labelText: "Retrieve and alias elements." },
        {
          type: "input",
          inputType:
            "The name of the alias to be referenced later within a cy.get() or cy.wait() command using an @ prefix.",
        },
      ],
      modalCreateCode: function (args: ModalCreateCodeType): string {
        if (args[0] !== empty && args[1] === empty) {
          return `.as('${args[0]}')`;
        } else if (args[0] !== empty && args[1] !== empty) {
          return `.as('${args[0]}', '${args[1]}')`;
        } else {
          return;
        }
      },
    },
    children: {
      option: "Children",
      code: `.children()`,
      tooltip: "Select child elements.",
    },
    closest: {
      option: "Closest",
      code: `.closest()`,
      tooltip: "Find nearest matching ancestor.",
      modal: [
        { type: "label", labelText: "Find nearest matching ancestor." },
        {
          type: "input",
          inputType: "A selector used to filter matching DOM elements.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0]) {
          return `.closest('${text[0]}')`;
        } else {
          return;
        }
      },
    },
    contains: {
      option: "Contains",
      code: `.contains('[${dataCy}]')`,
      tooltip: "Locate element with specified text (Chained off Dom El).",
      modal: [
        { type: "label", labelText: "Locate element with specified text." },
        {
          type: "input",
          inputType: "Get the DOM element containing the content.",
        },
        {
          type: "input",
          inputType:
            "Specify a selector to filter DOM elements containing the text. Cypress will ignore its default preference order for the specified selector. Using a selector allows you to return more shallow elements (higher in the tree) that contain the specific text.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0] !== empty && text[1] === empty) {
          const value =  typeof text[0] === 'number' ? `'${text[0]}'` : text[0];
          return `.contains(${value})`;
        } else if (text[0] !== empty && text[1] !== empty) {
          const value = typeof text[1] === 'number' ? `'${text[1]}'` : text[1];
          return `.contains('${text[0]}', ${value})`;
        } else {
          return;
        }
      },
    },
    containsCy: {
      option: "Cy.Contains",
      code: `cy.contains('[${dataCy}]')`,
      tooltip: "Locate element with specified text (Chained off Cy).",
      modal: [
        { type: "label", labelText: "Locate element with specified text." },
        {
          type: "input",
          inputType: "Get the DOM element containing the content.",
        },
        {
          type: "input",
          inputType:
            "Specify a selector to filter DOM elements containing the text. Cypress will ignore its default preference order for the specified selector. Using a selector allows you to return more shallow elements (higher in the tree) that contain the specific text.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0] !== empty && text[1] === empty) {
          const value = typeof text[0] === 'number' ? `'${text[0]}'` : text[0];
          return `cy.contains(${value})`;
        } else if (text[0] !== empty && text[1] !== empty) {
          const value = typeof text[1] === 'number' ? `'${text[1]}'` : text[1];
          return `cy.contains('${text[0]}', ${value})`;
        } else {
          return;
        }
      },
    },
    document: {
      option: "Document",
      code: `cy.document()`,
      tooltip: "Access the document object.",
    },
    eq: {
      option: "Eq",
      code: `.eq()`,
      tooltip: "Select by index position.",
      modal: [
        { type: "label", labelText: "Select by index position." },
        {
          type: "input",
          inputType:
            "A number indicating the index to find the element at within an array of elements. A negative number indicates the index position from the end to find the element at within an array of elements.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0]) {
          return `.eq('${text[0]}')`;
        } else {
          return;
        }
      },
    },
    filter: {
      option: "Filter",
      code: `.filter()`,
      tooltip: "Filter elements by selector.",
      modal: [
        { type: "label", labelText: "Filter elements by selector." },
        {
          type: "input",
          inputType: "A selector used to filter matching DOM elements.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0]) {
          return `.filter('${text[0]}')`;
        } else {
          return;
        }
      },
    },
    find: {
      option: "Find",
      code: `.find()`,
      tooltip: "Search for nested elements.",
      modal: [
        { type: "label", labelText: "Search for nested elements." },
        {
          type: "input",
          inputType: "A selector used to filter matching DOM elements.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0]) {
          return `.find('${text[0]}')`;
        } else {
          return;
        }
      },
    },
    first: {
      option: "First",
      code: `.first()`,
      tooltip: "Select the first element.",
    },
    focused: {
      option: "Focused",
      code: `cy.focused()`,
      tooltip: "Select the focused element.",
    },
    get: {
      option: "Get",
      code: `cy.get('[${dataCy}]')`,
      tooltip: "Select elements by selector.",
    },
    hash: {
      option: "Hash",
      code: `cy.hash()`,
      tooltip: "Access the URL hash.",
    },
    its: {
      option: "Its",
      code: `.its()`,
      tooltip: "Access element properties.",
      modal: [
        { type: "label", labelText: "Access element properties." },
        {
          type: "input",
          inputType:
            "Index, name of property or name of nested properties (with dot notation) to get.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0]) {
          const value = typeof text[0] === 'number' ? `'${text[0]}'` : text[0];
          return `.its(${value})`;
        } else {
          return;
        }
      },
    },
    last: {
      option: "Last",
      code: `.last()`,
      tooltip: "Select the last element.",
    },
    location: {
      option: "Location",
      code: `cy.location()`,
      tooltip: "Access the URL location.",
      modal: [
        { type: "label", labelText: "Access the URL location." },
        {
          type: "input",
          inputType:
            "OPTIONAL: A key on the location object. Returns this value instead of the full location object.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0] === empty) {
          return `cy.location()`;
        } else {
          return `cy.location('${text[0]}')`;
        }
      },
    },
    next: {
      option: "Next",
      code: `.next()`,
      tooltip: "Select the next sibling element.",
      modal: [
        { type: "label", labelText: "Select the next sibling element." },
        {
          type: "input",
          inputType:
            "OPTIONAL: A selector used to filter matching DOM elements.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0] === empty) {
          return `.next()`;
        } else {
          return `.next('${text[0]}')`;
        }
      },
    },
    nextAll: {
      option: "NextAll",
      code: `.nextAll()`,
      tooltip: "Select all next siblings.",
      modal: [
        { type: "label", labelText: "Select all next siblings." },
        {
          type: "input",
          inputType:
            "OPTIONAL: A selector used to filter matching DOM elements.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0] === empty) {
          return `.nextAll()`;
        } else {
          return `.nextAll('${text[0]}')`;
        }
      },
    },
    nextUntil: {
      option: "NextUntil",
      code: `.nextUntil()`,
      tooltip: "Select until specified sibling.",
      modal: [
        { type: "label", labelText: "Select until specified sibling." },
        {
          type: "input",
          inputType:
            "The selector where you want finding next siblings to stop.",
        },
        {
          type: "input",
          inputType:
            "OPTIONAL: A selector used to filter matching DOM elements.",
        },
      ],
      modalCreateCode: function (args: ModalCreateCodeType): string {
        if (args[0] !== empty && args[1] === empty) {
          return `.nextUntil('${args[0]}')`;
        } else if (args[0] !== empty && args[1] !== empty) {
          return `.nextUntil('${args[0]}', '${args[1]}')`;
        } else {
          return;
        }
      },
    },
    not: {
      option: "Not",
      code: `.not()`,
      tooltip: "Exclude elements by selector.",
      modal: [
        { type: "label", labelText: "Exclude elements by selector." },
        {
          type: "input",
          inputType: "A selector used to remove matching DOM elements.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0]) {
          return `.not('${text[0]}')`;
        } else {
          return;
        }
      },
    },
    parent: {
      option: "Parent",
      code: `.parent()`,
      tooltip: "Select the parent element.",
      modal: [
        { type: "label", labelText: "Select the parent element." },
        {
          type: "input",
          inputType:
            "OPTIONAL: A selector used to filter matching DOM elements.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0] === empty) {
          return `.parent()`;
        } else {
          return `.parent('${text[0]}')`;
        }
      },
    },
    parents: {
      option: "Parents",
      code: `.parents()`,
      tooltip: "Select all ancestor elements.",
      modal: [
        { type: "label", labelText: "Select all ancestor elements." },
        {
          type: "input",
          inputType:
            "OPTIONAL: A selector used to filter matching DOM elements.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0] === empty) {
          return `.parents()`;
        } else {
          return `.parents('${text[0]}')`;
        }
      },
    },
    parentsUntil: {
      option: "ParentsUntil",
      code: `.parentsUntil()`,
      tooltip: "Select ancestors until specified.",
      modal: [
        { type: "label", labelText: "Select ancestors until specified." },
        {
          type: "input",
          inputType:
            "The selector where you want finding parent ancestors to stop.",
        },
        {
          type: "input",
          inputType:
            "OPTIONAL: A selector used to filter matching DOM elements.",
        },
      ],
      modalCreateCode: function (args: ModalCreateCodeType): string {
        if (args[0] !== empty && args[1] === empty) {
          return `.parentsUntil('${args[0]}')`;
        } else if (args[0] !== empty && args[1] !== empty) {
          return `.parentsUntil('${args[0]}', '${args[1]}')`;
        } else {
          return;
        }
      },
    },
    prev: {
      option: "Prev",
      code: `.prev()`,
      tooltip: "Select the previous sibling element.",
      modal: [
        { type: "label", labelText: "Select the previous sibling element." },
        {
          type: "input",
          inputType:
            "OPTIONAL: A selector used to filter matching DOM elements.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0] === empty) {
          return `.prev()`;
        } else {
          return `.prev('${text[0]}')`;
        }
      },
    },
    prevAll: {
      option: "PrevAll",
      code: `.prevAll()`,
      tooltip: "Select all previous siblings.",
      modal: [
        { type: "label", labelText: "Select all previous siblings." },
        {
          type: "input",
          inputType:
            "OPTIONAL: A selector used to filter matching DOM elements.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0] === empty) {
          return `.prevAll()`;
        } else {
          return `.prevAll('${text[0]}')`;
        }
      },
    },
    prevUntil: {
      option: "PrevUntil",
      code: `.prevUntil()`,
      tooltip: "Select until specified sibling.",
      modal: [
        { type: "label", labelText: "Select until specified sibling." },
        {
          type: "input",
          inputType:
            "The selector where you want finding previous siblings to stop.",
        },
        {
          type: "input",
          inputType:
            "OPTIONAL: A selector used to filter matching DOM elements.",
        },
      ],
      modalCreateCode: function (args: ModalCreateCodeType): string {
        if (args[0] !== empty && args[1] === empty) {
          return `.prevUntil('${args[0]}')`;
        } else if (args[0] !== empty && args[1] !== empty) {
          return `.prevUntil('${args[0]}', '${args[1]}')`;
        } else {
          return;
        }
      },
    },
    readFile: {
      option: "Readfile",
      code: `cy.readFile()`,
      tooltip: "Read and parse a file.",
      modal: [
        { type: "label", labelText: "Read and parse a file." },
        {
          type: "input",
          inputType: "A path to a file within the project root ",
        },
        { type: "select", options: encodingArray },
      ],
      modalCreateCode: function (args: ModalCreateCodeType): string {
        if (args[0] !== empty && args[1] === empty) {
          return `cy.readFile('${args[0]}')`;
        } else if (args[0] !== empty && args[1] !== empty) {
          return `cy.readFile('${args[0]}', '${args[1]}')`;
        } else {
          return;
        }
      },
    },
    Root: {
      option: "Root",
      code: `cy.root()`,
      tooltip: "Select the root element.",
    },
    shadow: {
      option: "Shadow",
      code: `.shadow()`,
      tooltip: "Select shadow DOM elements.",
    },
    siblings: {
      option: "Siblings",
      code: `.siblings()`,
      tooltip: "Select all siblings.",
      modal: [
        { type: "label", labelText: "Select all siblings." },
        {
          type: "input",
          inputType:
            "OPTIONAL: A selector used to filter matching DOM elements.",
        },
      ],
      modalCreateCode: function (text: ModalCreateCodeType): string {
        if (text[0] === empty) {
          return `.siblings()`;
        } else {
          return `.siblings('${text[0]}')`;
        }
      },
    },
    title: {
      option: "Title",
      code: `cy.title()`,
      tooltip: "Access the document title.",
    },
    url: {
      option: "URL",
      code: `cy.url()`,
      tooltip: "Access the current URL.",
    },
    window: {
      option: "Window",
      code: `cy.window()`,
      tooltip: "Access the window object.",
    },
  };

  return (
    <div className="flex h-full p-2">
      <div className="flex-1 w-1/2 flex flex-col justify-center items-center rounded-lg bg-gradient-to-b from-secondaryPrimary to-secondaryPrimaryDark p-4">
        {/* Button and Dropdowns */}
        <div className="flex w-full justify-around">
          <DropdownButton
            options={queryOptions}
            label="Query"
            onClickOption={handleOptionClick}
            dropDown={dropDown}
            setDropDown={setDropDown}
          />
          <DropdownButton
            options={actionOptions}
            label="Action"
            onClickOption={handleOptionClick}
            dropDown={dropDown}
            setDropDown={setDropDown}
          />
          <DropdownButton
            options={assertionOptions}
            label="Assertion"
            onClickOption={handleOptionClick}
            dropDown={dropDown}
            setDropDown={setDropDown}
          />
          <DropdownButton
            options={otherCommandOptions}
            label="Other"
            onClickOption={handleOptionClick}
            dropDown={dropDown}
            setDropDown={setDropDown}
          />
        </div>

        {/* Statement Bar */}
        <div className="flex justify-between rounded-sm p-2 mt-5 mb-5 h-1/5 w-full bg-gradient-to-b from-primary to-primaryDark text-xs text-secondary border border-1 border-transparent border-b-primaryDark transform transition duration-300 hover:shadow-lg hover:font-bold hover:border-secondary hover:scale-105">
          <div className="overflow-x-auto">
          {selectedOptions.join("")}
          </div>
          <button
          onClick={() => {
            setSelectedOptions(selectedOptions.slice(0, -1));
          }}
          className="border-2 border-secondary hover:bg-primaryDark p-2"
        >BACK
        </button>
        </div>


        {/* Currently Selected Bar */}
        
        <div className="rounded-sm p-1 mb-5 h-1/5 w-full overflow-y-auto bg-gradient-to-b from-primary to-primaryDark text-xs text-secondary border border-1 border-transparent border-b-primaryDark transform transition duration-300 hover:shadow-lg hover:font-bold hover:border-secondary hover:scale-105">
          <strong>Currently selected:</strong>
          {currentHTML}
          {currentComponent &&
            currentComponent.name &&
            ` in ${currentComponent.name}`}
          {currentTestId && ` with ${currentTestId}`}
        </div>

        {/* End Block Buttons */}
        <div className="flex w-full justify-around">
          <button
            className='rounded-lg p-1 w-1/4 bg-gradient-to-b from-primary to-primaryDark text-secondary text-sm border border-1 border-transparent border-b-primaryDark transform transition duration-300 hover:shadow-lg hover:font-bold hover:border-secondary hover:scale-105"'
            onClick={endDescribeBlock}
          >
            End describe block
          </button>
          <button
            className='rounded-lg p-1 w-1/4 bg-gradient-to-b from-primary to-primaryDark text-secondary text-sm border border-1 border-transparent border-b-primaryDark transform transition duration-300 hover:shadow-lg hover:font-bold hover:border-secondary hover:scale-105"'
            onClick={endItBlock}
          >
            End it block
          </button>
          <button
            className='rounded-lg p-1 w-1/4 bg-gradient-to-b from-primary to-primaryDark text-secondary text-sm border border-1 border-transparent border-b-primaryDark transform transition duration-300 hover:shadow-lg hover:font-bold hover:border-secondary hover:scale-105"'
            onClick={endStatement}
          >
            End statement
          </button>
        </div>
      </div>

      <div className="w-1/2 h-full overflow-hidden">
        <SmallerPreviewPopup code={code} setCode={setCode} />
      </div>
    </div>
  );
};

export default StatementPage;
