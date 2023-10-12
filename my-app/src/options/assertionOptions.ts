import { empty, commonAssertions } from "./optionVariables";

type ModalCreateCodeType = (string | number)[];

const assertionOptions = {
  should: {
    option: "Should",
    code: ".should()",
    tooltip: "Assert element state or value.",
    modal: [
      { type: "label", labelText: "Assert element state or value." },
      { type: "select", options: commonAssertions },
      {
        type: "input",
        inputType: "OPTIONAL: Value to assert against chainer.",
      },
      {
        type: "input",
        inputType: "OPTIONAL: A method to be called on the chainer.",
      },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[1] === empty && args[2] === empty) {
        return `.should('${args[0]}')`;
      } else if (args[2] === empty) {
        const value1: string | number = isNaN(Number(args[1]))
          ? `'${args[1]}'`
          : Number(args[1]);
        return `.should('${args[0]}', ${value1})`;
      } else if (args[0] && args[1] && args[2]) {
        const value1: string | number = isNaN(Number(args[1]))
          ? `'${args[1]}'`
          : Number(args[1]);
        const value2: string | number = isNaN(Number(args[2]))
          ? `'${args[2]}'`
          : Number(args[2]);
        return `.should('${args[0]}', ${value1}, ${value2})`;
      } else {
        return;
      }
    },
  },
  and: {
    option: "And",
    code: ".and()",
    tooltip: "Chain additional assertions.",
    modal: [
      { type: "label", labelText: "Chain additional assertions." },
      { type: "select", options: commonAssertions },
      {
        type: "input",
        inputType: "OPTIONAL: Value to assert against chainer.",
      },
      {
        type: "input",
        inputType: "OPTIONAL: A method to be called on the chainer.",
      },
    ],
    modalCreateCode: function (args: ModalCreateCodeType): string {
      if (args[1] === empty && args[2] === empty) {
        return `.and('${args[0]}')`;
      } else if (args[2] === empty) {
        const value1: string | number = isNaN(Number(args[1]))
          ? `'${args[1]}'`
          : Number(args[1]);
        return `.and('${args[0]}', ${value1})`;
      } else if (args[0] && args[1] && args[2]) {
        const value1: string | number = isNaN(Number(args[1]))
          ? `'${args[1]}'`
          : Number(args[1]);
        const value2: string | number = isNaN(Number(args[2]))
          ? `'${args[2]}'`
          : Number(args[2]);
        return `.and('${args[0]}', ${value1}, ${value2})`;
      } else {
        return;
      }
    },
  },
};

export default assertionOptions;
