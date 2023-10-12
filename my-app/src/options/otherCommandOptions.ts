import { empty, encodingArray } from "./optionVariables";

type ModalCreateCodeType = (string | number)[];

const otherCommandOptions = {
  blur: {
    option: "Blur",
    code: ".blur()",
    tooltip: "Remove focus from the selected element, triggering a blur event.",
  },
  clearAllCookies: {
    option: "Clear All Cookies",
    code: "cy.clearAllCookies()",
    tooltip: "Clear all cookies in the browser.",
  },
  clearAllLocalStorage: {
    option: "Clear All Local Storage",
    code: "cy.clearAllLocalStorage()",
    tooltip: "Clear all items from the local storage.",
  },
  clearAllSessionStorage: {
    option: "Clear All Session Storage",
    code: "cy.clearAllSessionStorage()",
    tooltip: "Clear all items from the session storage.",
  },
  clearCookie: {
    option: "Clear Cookie",
    code: "cy.clearCookie()",
    tooltip: "Clear a specific cookie by name.",
    modal: [
      { type: "label", labelText: "Clear a specific cookie by name." },
      { type: "input", inputType: "The name of the cookie to be cleared." },
    ],
    modalCreateCode: function (text: ModalCreateCodeType): string {
      if (text[0]) {
        return `cy.clearCookie('${text[0]}')`;
      } else {
        return;
      }
    },
  },
  clearCookies: {
    option: "Clear Cookies",
    code: "cy.clearCookies()",
    tooltip: "Clear all cookies in the browser.",
  },
  clearLocalStorage: {
    option: "Clear Local Storage",
    code: "cy.clearLocalStorage()",
    tooltip: "Clear all items from the local storage.",
    modal: [
      { type: "label", labelText: "Clear all items from the local storage." },
      {
        type: "input",
        inputType: "OPTIONAL: Specify key to be cleared in localStorage.",
      },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0] === empty) {
        return `cy.clearLocalStorage()`;
      } else {
        return `cy.clearLocalStorage('${args[0]}')`;
      }
    },
  },
  debug: {
    option: "Debug",
    code: ".debug()",
    tooltip: "Trigger a debug breakpoint in your test (Chained Off Dom El).",
  },
  debugCy: {
    option: "Cy.Debug",
    code: "cy.debug()",
    tooltip: "Trigger a debug breakpoint in your test (Chained Off Cy).",
  },
  end: {
    option: "End",
    code: ".end()",
    tooltip: "End the current command chain and return the previous subject.",
  },
  exec: {
    option: "Exec",
    code: "cy.exec()",
    tooltip: "Execute a system command from within a Cypress test.",
    modal: [
      {
        type: "label",
        labelText: "Execute a system command from within a Cypress test.",
      },
      {
        type: "input",
        inputType: "The system command to be executed from the project root",
      },
    ],
    modalCreateCode: function (text: ModalCreateCodeType): string {
      if (text[0]) {
        return `cy.exec('${text[0]}')`;
      } else {
        return;
      }
    },
  },
  fixture: {
    option: "Fixture",
    code: "cy.fixture()",
    tooltip: "Load a fixture file's contents for use in tests.",
    modal: [
      {
        type: "label",
        labelText: "Load a fixture file's contents for use in tests.",
      },
      {
        type: "input",
        inputType:
          "A path to a file within the fixturesFolder , which defaults to cypress/fixtures.",
      },
      { type: "select", options: encodingArray },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0] !== empty && args[1] === "null") {
        return `cy.fixture('${args[0]}')`;
      } else if (args[0] !== empty && args[1] !== "null") {
        return `cy.fixture('${args[0]}', '${args[1]}')`;
      } else {
        return;
      }
    },
  },
  focus: {
    option: "Focus",
    code: ".focus()",
    tooltip: "Set focus on the selected element.",
  },
  getAllCookies: {
    option: "Get All Cookies",
    code: "cy.getAllCookies()",
    tooltip: "Retrieve all cookies present in the browser.",
  },
  getAllLocalStorage: {
    option: "Get All Local Storage",
    code: "cy.getAllLocalStorage()",
    tooltip: "Retrieve all items from the local storage.",
  },
  getAllSessionStorage: {
    option: "Get All Session Storage",
    code: "cy.getAllSessionStorage()",
    tooltip: "Retrieve all items from the session storage.",
  },
  getCookie: {
    option: "Get Cookie",
    code: "cy.getCookie()",
    tooltip: "Retrieve the value of a specific cookie by name.",
    modal: [
      {
        type: "label",
        labelText: "Retrieve the value of a specific cookie by name.",
      },
      { type: "input", inputType: "The name of the cookie to get." },
    ],
    modalCreateCode: function (text: ModalCreateCodeType): string {
      if (text[0]) {
        return `cy.getCookie('${text[0]}')`;
      } else {
        return;
      }
    },
  },
  getCookies: {
    option: "Get Cookies",
    code: "cy.getCookies()",
    tooltip: "Retrieve all cookies present in the browser.",
  },
  go: {
    option: "Go",
    code: ".go()",
    tooltip: "Navigate forward or backward in the browser's history.",
    modal: [
      {
        type: "label",
        labelText: "Navigate forward or backward in the browser's history.",
      },
      {
        type: "input",
        inputType:
          "The direction to navigate. You can use back or forward to go one step back or forward. You could also navigate to a specific history position (-1 goes back one page, 1 goes forward one page, etc).",
      },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      const value1: string | number = isNaN(Number(args[0]))
        ? `'${args[0]}'`
        : Number(args[0]);
      if (args[0]) {
        return `cy.go(${value1})`;
      } else {
        return;
      }
    },
  },
  log: {
    option: "Log",
    code: "cy.log()",
    tooltip: "Log a message to the Cypress Command Log.",
    modal: [
      { type: "label", labelText: "Log a message to the Cypress Command Log." },
      {
        type: "input",
        inputType:
          "Message to be printed to Cypress Command Log. Accepts a Markdown formatted message.",
      },
    ],
    modalCreateCode: function (text: ModalCreateCodeType): string {
      if (text[0]) {
        return `cy.log('${text[0]}')`;
      } else {
        return;
      }
    },
  },
  pause: {
    option: "Pause",
    code: ".pause()",
    tooltip:
      "Pause the test execution to inspect the application's state (Chained Off Dom el).",
  },
  pauseCy: {
    option: "Pause",
    code: "cy.pause()",
    tooltip:
      "Pause the test execution to inspect the application's state (Chained Off Cy).",
  },
  reload: {
    option: "Reload",
    code: "cy.reload()",
    tooltip: "Reload the current page or the specified page.",
    modal: [
      {
        type: "label",
        labelText: "Reload the current page or the specified page.",
      },
      { type: "select", options: ["null", "true", "false"] },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0] === "null") {
        return `cy.reload()`;
      } else {
        return `cy.reload(${args[0]})`;
      }
    },
  },
  screenshot: {
    option: "Screenshot",
    code: ".screenshot()",
    tooltip:
      "Take a screenshot of the current viewport or a specific element (Chained Off Dom El).",
    modal: [
      {
        type: "label",
        labelText:
          "Take a screenshot of the current viewport or a specific element.",
      },
      { type: "select", options: ["null", "true", "false"] },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0] === "null") {
        return `.screenshot()`;
      } else {
        return `.screenshot('${args[0]}')`;
      }
    },
  },
  screenshotCy: {
    option: "Screenshot",
    code: "cy.screenshot()",
    tooltip:
      "Take a screenshot of the current viewport or a specific element (Chained Off Cy).",
    modal: [
      {
        type: "label",
        labelText:
          "Take a screenshot of the current viewport or a specific element.",
      },
      { type: "select", options: ["null", "true", "false"] },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0] === "null") {
        return `cy.screenshot()`;
      } else {
        return `cy.screenshot('${args[0]}')`;
      }
    },
  },
  setCookie: {
    option: "Set Cookie",
    code: "cy.setCookie()",
    tooltip: "Set a specific cookie with a name and value.",
    modal: [
      {
        type: "label",
        labelText: "Set a specific cookie with a name and value.",
      },
      { type: "input", inputType: "The name of the cookie to set." },
      { type: "input", inputType: "The value of the cookie to set." },
    ],
    modalCreateCode: function (text: ModalCreateCodeType): string {
      if (text[0] && text[1]) {
        return `cy.setCookie('${text[0]}', '${text[1]}')`;
      } else {
        return;
      }
    },
  },
  submit: {
    option: "Submit",
    code: ".submit()",
    tooltip: "Submit a form element.",
  },
  tick: {
    option: "Tick",
    code: "cy.tick()",
    tooltip: "Control the Cypress clock to manipulate time in tests.",
    modal: [
      {
        type: "label",
        labelText: "Control the Cypress clock to manipulate time in tests.",
      },
      {
        type: "input",
        inputType:
          "The number of milliseconds to move the clock. Any timers within the affected range of time will be called.",
      },
    ],
    modalCreateCode: function (text: ModalCreateCodeType): string {
      if (text[0]) {
        return `cy.tick(${text[0]})`;
      } else {
        return;
      }
    },
  },
  viewport: {
    option: "Viewport",
    code: "cy.viewport()",
    tooltip: "Set the dimensions of the browser's viewport.",
    modal: [
      {
        type: "label",
        labelText: "Set the dimensions of the browser's viewport.",
      },
      {
        type: "input",
        inputType:
          "Width of viewport in pixels (must be a non-negative, finite number).",
      },
      {
        type: "input",
        inputType:
          "Height of viewport in pixels (must be a non-negative, finite number).",
      },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0] !== empty && args[1] !== empty) {
        const value1: string | number = isNaN(Number(args[0]))
          ? `'${args[0]}'`
          : Number(args[0]);
        const value2: string | number = isNaN(Number(args[1]))
          ? `'${args[1]}'`
          : Number(args[1]);
        return `cy.viewport(${value1}, ${value2})`;
      } else {
        return;
      }
    },
  },
  visit: {
    option: "Visit",
    code: "cy.visit()",
    tooltip: "Navigate to a specific URL.",
    modal: [
      { type: "label", labelText: "Navigate to a specific URL." },
      { type: "input", inputType: "The URL to visit." },
    ],
    modalCreateCode: function (text: ModalCreateCodeType): string {
      if (text[0]) {
        return `cy.visit('${text[0]}')`;
      } else {
        return;
      }
    },
  },
  wait: {
    option: "Wait",
    code: "cy.wait()",
    tooltip:
      "Pause the test to wait for a specific amount of time or until a specific event occurs.",
    modal: [
      {
        type: "label",
        labelText:
          "Pause the test to wait for a specific amount of time or until a specific event occurs.",
      },
      {
        type: "input",
        inputType: "The amount of time to wait in milliseconds.",
      },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0] !== empty && args[1] !== empty) {
        const value1: string | number = isNaN(Number(args[0]))
          ? `'${args[0]}'`
          : Number(args[0]);
        return `cy.wait(${value1})`;
      } else {
        return;
      }
    },
  },
  writeFile: {
    option: "Write File",
    code: "cy.writeFile()",
    tooltip: "Write content to a file with optional encoding.",
    modal: [
      {
        type: "label",
        labelText: "Write content to a file with optional encoding.",
      },
      { type: "input", inputType: "A path to a file within the project root" },
      {
        type: "input",
        inputType: "The contents to be written to the file.xt",
      },
      { type: "select", options: encodingArray },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0] !== empty && args[1] !== empty && args[2] === "null") {
        return `cy.writeFile('${args[0]}', '${args[1]}')`;
      } else if (args[0] !== empty && args[1] !== empty && args[2] !== "null") {
        return `cy.writeFile('${args[0]}', '${args[1]}', '${args[2]}')`;
      } else {
        return;
      }
    },
  },
};

export default otherCommandOptions;
