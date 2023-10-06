import { empty, encodingArray, commonAssertions } from './optionVariables';


const actionOptions = {
    check: {
      option: 'Check',
      code: '.check()',
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (args: []): string {
        if (args[0] === empty) {
          return `.check()`;
        } else {
          return `.check('${args[0]}')`;
        }
      },
    },
    clear: {
      option: 'Clear',
      code: '.clear()',
      tooltip: 'tooltip',
    },
    click: {
      option: 'Click',
      code: '.click()',
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (args: []): string {
        if (args[0] === empty && args[1] === empty) {
          return `.click()`;
        } else if (args[1] === empty) {
          return `.click('${args[0]}')`;
        } else if (args[0] !== empty && args[1] !== empty) {
          const value1 = isNaN(args[0]) ? `'${args[0]}'` : args[0];
          const value2 = isNaN(args[1]) ? `'${args[1]}'` : args[1];
          return `.click(${value1}, ${value2})`;
        }
      },
    },
    doubleClick: {
      option: 'Double Click',
      code: '.dblclick()',
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (args: []): string {
        if (args[0] === empty && args[1] === empty) {
          return `.dblclick()`;
        } else if (args[1] === empty) {
          return `.dblclick('${args[0]}')`;
        } else if (args[0] !== empty && args[1] !== empty) {
          const value1 = isNaN(args[0]) ? `'${args[0]}'` : args[0];
          const value2 = isNaN(args[1]) ? `'${args[1]}'` : args[1];
          return `.dblclick(${value1}, ${value2})`;
        }
      },
    },
    rightClick: {
      option: 'Right Click',
      code: '.rightclick()',
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (args: []): string {
        if (args[0] === empty && args[1] === empty) {
          return `.rightclick()`;
        } else if (args[1] === empty) {
          return `.rightclick('${args[0]}')`;
        } else if (args[0] !== empty && args[1] !== empty) {
          const value1 = isNaN(args[0]) ? `'${args[0]}'` : args[0];
          const value2 = isNaN(args[1]) ? `'${args[1]}'` : args[1];
          return `.rightclick(${value1}, ${value2})`;
        }
      },
    },
    scrollIntoView: {
      option: 'ScrollIntoView',
      code: '.scrollIntoView()',
      tooltip: 'tooltip',
    },
    scrollTo: {
      option: 'Scroll To',
      code: '.scrollTo()',
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (args: []): string {
        if (args[1] === empty) {
          return `.scrollTo('${args[0]}')`;
        } else if (args[0] !== empty && args[1] !== empty) {
          const value1 = isNaN(args[0]) ? `'${args[0]}'` : args[0];
          const value2 = isNaN(args[1]) ? `'${args[1]}'` : args[1];
          return `.scrollTo(${value1}, ${value2})`;
        }
      },
    },
    select: {
      option: 'Select',
      code: '.select()',
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (args: []): string {
        if (args[0] === empty) {
          return `.select()`;
        } else {
          const value1 = isNaN(args[0]) ? `'${args[0]}'` : args[0];
          return `.select(${value1})`;
        }
      },
    },
    selectFile: {
      option: 'Select File',
      code: '.selectFile()',
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (args: []): string {
        return `.selectFile('${args[0]}')`;
      },
    },
    trigger: {
      option: 'Trigger',
      code: '.trigger()',
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
        { type: 'input', inputType: 'text' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (args: []): string {
        if (args[0] && args[1] === empty && args[2] === empty) {
          return `.trigger('${args[0]}')`;
        } else if (
          args[0] !== empty &&
          args[1] !== empty &&
          args[2] === empty
        ) {
          return `.trigger('${args[0]}', '${args[1]}')`;
        } else if (
          args[0] !== empty &&
          args[1] !== empty &&
          args[2] !== empty
        ) {
          const value1 = isNaN(args[1]) ? `'${args[1]}'` : args[1];
          const value2 = isNaN(args[2]) ? `'${args[2]}'` : args[2];
          return `.trigger('${args[0]}', ${value1}, ${value2})`;
        }
      },
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
    uncheck: {
      option: 'UnCheck',
      code: '.uncheck()',
      tooltip: 'tooltip',
      modal: [
        { type: 'label', labelText: 'Text to type' },
        { type: 'input', inputType: 'text' },
      ],
      modalCreateCode: function (args: []): string {
        if (args[0] === empty) {
          return `.uncheck()`;
        } else {
          return `.uncheck('${args[0]}')`;
        }
      },
    },
  };

  export default actionOptions;