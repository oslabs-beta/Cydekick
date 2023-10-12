import { empty } from "./optionVariables";

type ModalCreateCodeType = (string | number)[];

const actionOptions = {
  check: {
    option: "Check",
    code: ".check()",
    tooltip: "Check checkbox(es) or radio(s).",
    modal: [
      { type: "label", labelText: "Check checkbox(es) or radio(s)." },
      {
        type: "input",
        inputType:
          "OPTIONAL: Value of checkbox or radio that should be checked.",
      },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0] === empty) {
        return `.check()`;
      } else {
        return `.check('${args[0]}')`;
      }
    },
  },
  clear: {
    option: "Clear",
    code: ".clear()",
    tooltip: "Clear the input field.",
  },
  click: {
    option: "Click",
    code: ".click()",
    tooltip: "Click the element.",
    modal: [
      { type: "label", labelText: "Click the element." },
      {
        type: "input",
        inputType:
          "OPTIONAL: A specified position to scroll the window or element to. Valid positions are topLeft, top, topRight, left, center, right, bottomLeft, bottom, and bottomRight.",
      },
      {
        type: "input",
        inputType:
          "OPTIONAL: (x,y) x: The distance in pixels from window/element's left or percentage of the window/element's width to scroll to. y: the distance in pixels from window/element's top or percentage of the window/element's height to scroll to.",
      },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0] === empty && args[1] === empty) {
        return `.click()`;
      } else if (args[1] === empty) {
        return `.click('${args[0]}')`;
      } else if (args[0] !== empty && args[1] !== empty) {
        const value1: string | number = isNaN(Number(args[0]))
          ? `'${args[0]}'`
          : Number(args[0]);
        const value2: string | number = isNaN(Number(args[1]))
          ? `'${args[1]}'`
          : Number(args[1]);
        return `.click(${value1}, ${value2})`;
      }
    },
  },
  doubleClick: {
    option: "Double Click",
    code: ".dblclick()",
    tooltip: "Double-click the element.",
    modal: [
      { type: "label", labelText: "Double-click the element." },
      {
        type: "input",
        inputType:
          "OPTIONAL: A specified position to scroll the window or element to. Valid positions are topLeft, top, topRight, left, center, right, bottomLeft, bottom, and bottomRight.",
      },
      {
        type: "input",
        inputType:
          "OPTIONAL: (x,y) x: The distance in pixels from window/element's left or percentage of the window/element's width to scroll to. y: the distance in pixels from window/element's top or percentage of the window/element's height to scroll to.",
      },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0] === empty && args[1] === empty) {
        return `.dblclick()`;
      } else if (args[1] === empty) {
        return `.dblclick('${args[0]}')`;
      } else if (args[0] !== empty && args[1] !== empty) {
        const value1: string | number = isNaN(Number(args[0]))
          ? `'${args[0]}'`
          : Number(args[0]);
        const value2: string | number = isNaN(Number(args[1]))
          ? `'${args[1]}'`
          : Number(args[1]);
        return `.dblclick(${value1}, ${value2})`;
      }
    },
  },
  rightClick: {
    option: "Right Click",
    code: ".rightclick()",
    tooltip: "Right-click the element.",
    modal: [
      { type: "label", labelText: "Right-click the element." },
      {
        type: "input",
        inputType:
          "OPTIONAL: A specified position to scroll the window or element to. Valid positions are topLeft, top, topRight, left, center, right, bottomLeft, bottom, and bottomRight.",
      },
      {
        type: "input",
        inputType:
          "OPTIONAL: (x,y) x: The distance in pixels from window/element's left or percentage of the window/element's width to scroll to. y: the distance in pixels from window/element's top or percentage of the window/element's height to scroll to.",
      },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0] === empty && args[1] === empty) {
        return `.rightclick()`;
      } else if (args[1] === empty) {
        return `.rightclick('${args[0]}')`;
      } else if (args[0] !== empty && args[1] !== empty) {
        const value1: string | number = isNaN(Number(args[0]))
          ? `'${args[0]}'`
          : Number(args[0]);
        const value2: string | number = isNaN(Number(args[1]))
          ? `'${args[1]}'`
          : Number(args[1]);
        return `.rightclick(${value1}, ${value2})`;
      }
    },
  },
  scrollIntoView: {
    option: "ScrollIntoView",
    code: ".scrollIntoView()",
    tooltip: "Scroll the element into view.",
  },
  scrollTo: {
    option: "ScrollTo",
    code: ".scrollTo()",
    tooltip: "Scroll the element to a specific position (Chained Off Dom el).",
    modal: [
      {
        type: "label",
        labelText: "Scroll the element to a specific position.",
      },
      {
        type: "input",
        inputType:
          "A specified position to scroll the window or element to. Valid positions are topLeft, top, topRight, left, center, right, bottomLeft, bottom, and bottomRight.",
      },
      {
        type: "input",
        inputType:
          "(x,y) x: The distance in pixels from window/element's left or percentage of the window/element's width to scroll to. y: the distance in pixels from window/element's top or percentage of the window/element's height to scroll to.",
      },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[1] === empty) {
        return `.scrollTo('${args[0]}')`;
      } else if (args[0] !== empty && args[1] !== empty) {
        const value1: string | number = isNaN(Number(args[0]))
          ? `'${args[0]}'`
          : Number(args[0]);
        const value2: string | number = isNaN(Number(args[1]))
          ? `'${args[1]}'`
          : Number(args[1]);
        return `.scrollTo(${value1}, ${value2})`;
      } else {
        return;
      }
    },
  },
  scrollToCy: {
    option: "Cy.ScrollTo",
    code: "cy.scrollTo()",
    tooltip: "Scroll the element to a specific position (Chained Off Cy).",
    modal: [
      {
        type: "label",
        labelText: "Scroll the element to a specific position.",
      },
      {
        type: "input",
        inputType:
          "A specified position to scroll the window or element to. Valid positions are topLeft, top, topRight, left, center, right, bottomLeft, bottom, and bottomRight.",
      },
      {
        type: "input",
        inputType:
          "(x,y) x: The distance in pixels from window/element's left or percentage of the window/element's width to scroll to. y: the distance in pixels from window/element's top or percentage of the window/element's height to scroll to.",
      },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[1] === empty) {
        return `cy.scrollTo('${args[0]}')`;
      } else if (args[0] !== empty && args[1] !== empty) {
        const value1: string | number = isNaN(Number(args[0]))
          ? `'${args[0]}'`
          : Number(args[0]);
        const value2: string | number = isNaN(Number(args[1]))
          ? `'${args[1]}'`
          : Number(args[1]);
        return `cy.scrollTo(${value1}, ${value2})`;
      } else {
        return;
      }
    },
  },
  select: {
    option: "Select",
    code: ".select()",
    tooltip: "Select an option from a dropdown.",
    modal: [
      { type: "label", labelText: "Select an option from a dropdown." },
      {
        type: "input",
        inputType:
          "The value, index, or text content of the <option> to be selected.",
      },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0] === empty) {
        return `.select()`;
      } else {
        const value1: string | number = isNaN(Number(args[0]))
          ? `'${args[0]}'`
          : Number(args[0]);
        return `.select(${value1})`;
      }
    },
  },
  selectFile: {
    option: "Select File",
    code: ".selectFile()",
    tooltip: "Select a file to upload.",
    modal: [
      { type: "label", labelText: "Select a file to upload." },
      { type: "input", inputType: "A path to a file within the project root" },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0]) {
        return `.selectFile('${args[0]}')`;
      } else {
        return;
      }
    },
  },
  trigger: {
    option: "Trigger",
    code: ".trigger()",
    tooltip: "Trigger an event on the element.",
    modal: [
      { type: "label", labelText: "Trigger an event on the element." },
      {
        type: "input",
        inputType: "The name of the event to be triggered on the DOM element.",
      },
      {
        type: "input",
        inputType:
          "OPTIONAL: The distance in pixels from element's left to trigger the event.",
      },
      {
        type: "input",
        inputType:
          "OPTIONAL: The distance in pixels from element's top to trigger the event.",
      },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0] && args[1] === empty && args[2] === empty) {
        return `.trigger('${args[0]}')`;
      } else if (args[0] !== empty && args[1] !== empty && args[2] === empty) {
        return `.trigger('${args[0]}', '${args[1]}')`;
      } else if (args[0] !== empty && args[1] !== empty && args[2] !== empty) {
        const value1: string | number = isNaN(Number(args[1]))
          ? `'${args[1]}'`
          : Number(args[1]);
        const value2: string | number = isNaN(Number(args[2]))
          ? `'${args[2]}'`
          : Number(args[2]);
        return `.trigger('${args[0]}', ${value1}, ${value2})`;
      } else {
        return;
      }
    },
  },
  type: {
    option: "Type",
    code: ".type()",
    tooltip: "Type text into the input field.",
    modal: [
      { type: "label", labelText: "Type text into the input field." },
      {
        type: "input",
        inputType: "The text to be typed into the DOM element.",
      },
    ],
    modalCreateCode: function (text: ModalCreateCodeType): string {
      if (text[0]) {
        return `.type('${text[0]}')`;
      } else {
        return;
      }
    },
  },
  uncheck: {
    option: "UnCheck",
    code: ".uncheck()",
    tooltip: "Uncheck a checkbox or radio button.",
    modal: [
      { type: "label", labelText: "Text to type" },
      {
        type: "input",
        inputType: "OPTIONAL: Value of checkbox that should be unchecked.",
      },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[0] === empty) {
        return `.uncheck()`;
      } else {
        return `.uncheck('${args[0]}')`;
      }
    },
  },
};

export default actionOptions;
