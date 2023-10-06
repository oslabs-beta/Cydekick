import { empty, encodingArray, commonAssertions } from './optionVariables';

const otherCommandOptions = {
  blur: {
    option: 'Blur',
    code: '.blur()',
    tooltip: 'tooltip',
  },
  clearAllCookies: {
    option: 'Clear All Cookies',
    code: 'cy.clearAllCookies()',
    tooltip: 'tooltip',
  },
  clearAllLocalStorage: {
    option: 'Clear All Local Storage',
    code: 'cy.clearAllLocalStorage()',
    tooltip: 'tooltip',
  },
  clearAllSessionStorage: {
    option: 'Clear All Session Storage',
    code: 'cy.clearAllSessionStorage()',
    tooltip: 'tooltip',
  },
  clearCookie: {
    option: 'Clear Cookie',
    code: 'cy.clearCookie()',
    tooltip: 'tooltip',
    modal: [
      { type: 'label', labelText: 'Text to type' },
      { type: 'input', inputType: 'text' },
    ],
    modalCreateCode: function (text: []): string {
      return `cy.clearCookie('${text[0]}')`;
    },
  },
  clearCookies: {
    option: 'Clear Cookies',
    code: 'cy.clearCookies()',
    tooltip: 'tooltip',
  },
  clearLocalStorage: {
    option: 'Clear Local Storage',
    code: 'cy.clearLocalStorage()',
    tooltip: 'tooltip',
    modal: [
      { type: 'label', labelText: 'Text to type' },
      { type: 'input', inputType: 'text' },
    ],
    modalCreateCode: function (args: []): string {
      if (args[0] === empty) {
        return `cy.clearLocalStorage()`;
      } else {
        return `cy.clearLocalStorage('${args[0]}')`;
      }
    },
  },
  debug: {
    option: 'Debug',
    code: '.debug()',
    tooltip: 'tooltip',
  },
  end: {
    option: 'End',
    code: '.end()',
    tooltip: 'tooltip',
  },
  exec: {
    option: 'Exec',
    code: 'cy.exec()',
    tooltip: 'tooltip',
    modal: [
      { type: 'label', labelText: 'Text to type' },
      { type: 'input', inputType: 'text' },
    ],
    modalCreateCode: function (text: []): string {
      return `cy.exec('${text[0]}')`;
    },
  },
  fixture: {
    option: 'Fixture',
    code: 'cy.fixture()',
    tooltip: 'tooltip',
    modal: [
      { type: 'label', labelText: 'Text to type' },
      { type: 'input', inputType: 'text' },
      { type: 'select', options: encodingArray },
    ],
    modalCreateCode: function (args: []): string {
      if (args[0] !== empty && args[1] === 'null') {
        return `cy.fixture('${args[0]}')`;
      } else if (args[0] !== empty && args[1] !== 'null') {
        return `cy.fixture('${args[0]}', '${args[1]}')`;
      } else {
        return;
      }
    },
  },
  focus: {
    option: 'Focus',
    code: '.focus()',
    tooltip: 'tooltip',
  },
  getAllCookies: {
    option: 'Get All Cookies',
    code: 'cy.getAllCookies()',
    tooltip: 'tooltip',
  },
  getAllLocalStorage: {
    option: 'Get All Local Storage',
    code: 'cy.getAllLocalStorage()',
    tooltip: 'tooltip',
  },
  getAllSessionStorage: {
    option: 'Get All Session Storage',
    code: 'cy.getAllSessionStorage()',
    tooltip: 'tooltip',
  },
  getCookie: {
    option: 'Get Cookie',
    code: 'cy.getCookie()',
    tooltip: 'tooltip',
    modal: [
      { type: 'label', labelText: 'Text to type' },
      { type: 'input', inputType: 'text' },
    ],
    modalCreateCode: function (text: []): string {
      return `cy.getCookie('${text[0]}')`;
    },
  },
  getCookies: {
    option: 'Get Cookies',
    code: 'cy.getCookies()',
    tooltip: 'tooltip',
  },
  go: {
    option: 'Go',
    code: '.go()',
    tooltip: 'tooltip',
    modal: [
      { type: 'label', labelText: 'Text to type' },
      { type: 'input', inputType: 'text' },
    ],
    modalCreateCode: function (args: []): string {
      const value1 = isNaN(args[0]) ? `'${args[0]}'` : args[0];
      return `cy.go(${value1})`;
    },
  },
  log: {
    option: 'Log',
    code: 'cy.log()',
    tooltip: 'tooltip',
    modal: [
      { type: 'label', labelText: 'Text to type' },
      { type: 'input', inputType: 'text' },
    ],
    modalCreateCode: function (text: []): string {
      return `cy.log('${text[0]}')`;
    },
  },
  pause: {
    option: 'Pause',
    code: 'cy.pause()',
    tooltip: 'tooltip',
  },
  reload: {
    option: 'Reload',
    code: 'cy.reload()',
    tooltip: 'tooltip',
    modal: [
      { type: 'label', labelText: 'Text to type' },
      { type: 'select', options: ['null', 'true', 'false'] },
    ],
    modalCreateCode: function (args: []): string {
      if (args[0] === 'null') {
        return `cy.reload()`;
      } else {
        return `cy.reload(${args[0]})`;
      }
    },
  },
  screenshot: {
    option: 'Screenshot',
    code: 'cy.screenshot()',
    tooltip: 'tooltip',
    modal: [
      { type: 'label', labelText: 'Text to type' },
      { type: 'select', options: ['null', 'true', 'false'] },
    ],
    modalCreateCode: function (args: []): string {
      if (args[0] === 'null') {
        return `cy.screenshot()`;
      } else {
        return `cy.screenshot('${args[0]}')`;
      }
    },
  },
  setCookie: {
    option: 'Set Cookie',
    code: 'cy.setCookie()',
    tooltip: 'tooltip',
    modal: [
      { type: 'label', labelText: 'Text to type' },
      { type: 'input', inputType: 'text' },
      { type: 'input', inputType: 'text' },
    ],
    modalCreateCode: function (text: []): string {
      if (text[0] && text[1]) {
        return `cy.setCookie('${text[0]}', '${text[1]}')`;
      } else {
        return;
      }
    },
  },
  submit: {
    option: 'Submit',
    code: '.submit()',
    tooltip: 'tooltip',
  },
  tick: {
    option: 'Tick',
    code: 'cy.tick()',
    tooltip: 'tooltip',
    modal: [
      { type: 'label', labelText: 'Text to type' },
      { type: 'input', inputType: 'text' },
    ],
    modalCreateCode: function (text: []): string {
      if (text[0]) {
        return `cy.tick(${text[0]})`;
      } else {
        return;
      }
    },
  },
  viewport: {
    option: 'viewport',
    code: 'cy.viewport()',
    tooltip: 'tooltip',
    modal: [
      { type: 'label', labelText: 'Text to type' },
      { type: 'input', inputType: 'text' },
      { type: 'input', inputType: 'text' },
    ],
    modalCreateCode: function (args: []): string {
      if (args[0] !== empty && args[1] !== empty) {
        const value1 = isNaN(args[0]) ? `'${args[0]}'` : args[0];
        const value2 = isNaN(args[1]) ? `'${args[1]}'` : args[1];
        return `cy.viewport(${value1}, ${value2})`;
      } else {
        return;
      }
    },
  },
  visit: {
    option: 'Visit',
    code: 'cy.visit()',
    tooltip: 'tooltip',
    modal: [
      { type: 'label', labelText: 'Text to type' },
      { type: 'input', inputType: 'text' },
    ],
    modalCreateCode: function (text: []): string {
      if (text[0]) {
        return `cy.visit('${text[0]}')`;
      } else {
        return;
      }
    },
  },
  wait: {
    option: 'Wait',
    code: 'cy.wait()',
    tooltip: 'tooltip',
    modal: [
      { type: 'label', labelText: 'Text to type' },
      { type: 'input', inputType: 'text' },
      { type: 'input', inputType: 'text' },
    ],
    modalCreateCode: function (args: []): string {
      if (args[0] !== empty && args[1] !== empty) {
        const value1 = isNaN(args[0]) ? `'${args[0]}'` : args[0];
        return `cy.wait(${value1})`;
      } else {
        return;
      }
    },
  },
  writeFile: {
    option: 'Write File',
    code: 'cy.writeFile()',
    tooltip: 'tooltip',
    modal: [
      { type: 'label', labelText: 'Text to type' },
      { type: 'input', inputType: 'text' },
      { type: 'input', inputType: 'text' },
      { type: 'select', options: encodingArray },
    ],
    modalCreateCode: function (args: []): string {
      if (args[0] !== empty && args[1] !== empty && args[2] === 'null') {
        return `cy.writeFile('${args[0]}', '${args[1]}')`;
      } else if (args[0] !== empty && args[1] !== empty && args[2] !== 'null') {
        return `cy.writeFile('${args[0]}', '${args[1]}', '${args[2]}')`;
      } else {
        return;
      }
    },
  },
};

export default otherCommandOptions;
