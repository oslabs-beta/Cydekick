// import {empty, encodingArray, commonAssertions} from './optionVariables'


// const queryOptions = {
//     as: {
//       option: 'as',
//       code: `cy.as()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (args: []): string {
//         if (args[0] !== empty && args[1] === empty) {
//           return `.as('${args[0]}')`;
//         } else if (args[0] !== empty && args[1] !== empty) {
//           return `.as('${args[0]}', '${args[1]}')`;
//         } else {
//           return;
//         }
//       },
//     },
//     children: {
//       option: 'Children',
//       code: `.children()`,
//       tooltip: 'tooltip',
//     },
//     closest: {
//       option: 'Closest',
//       code: `.closest()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0]) {
//           return `.closest('${text[0]}')`;
//         } else {
//           return;
//         }
//       },
//     },
//     contains: {
//       option: 'Contains',
//       code: `cy.contains('[${dataCy}]')`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0] !== empty && text[1] === empty) {
//           const value = isNaN(text[0]) ? `'${text[0]}'` : text[0];
//           return `.contains(${value})`;
//         } else if (text[0] !== empty && text[1] !== empty) {
//           const value = isNaN(text[1]) ? `'${text[1]}'` : text[1];
//           return `.contains('${text[0]}', ${value})`;
//         } else {
//           return;
//         }
//       },
//     },
//     document: {
//       option: 'Document',
//       code: `cy.document()`,
//       tooltip: 'tooltip',
//     },
//     eq: {
//       option: 'Eq',
//       code: `.eq()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0]) {
//           return `.eq('${text[0]}')`;
//         } else {
//           return;
//         }
//       },
//     },
//     filter: {
//       option: 'Filter',
//       code: `.filter()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0]) {
//           return `.filter('${text[0]}')`;
//         } else {
//           return;
//         }
//       },
//     },
//     find: {
//       option: 'Find',
//       code: `.find()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0]) {
//           return `.find('${text[0]}')`;
//         } else {
//           return;
//         }
//       },
//     },
//     first: {
//       option: 'First',
//       code: `.first()`,
//       tooltip: 'tooltip',
//     },
//     focused: {
//       option: 'Focused',
//       code: `cy.focused()`,
//       tooltip: 'tooltip',
//     },
//     get: {
//       option: 'Get',
//       code: `cy.get('[${dataCy}]')`,
//       tooltip: 'tooltip',
//     },
//     hash: {
//       option: 'Hash',
//       code: `cy.hash()`,
//       tooltip: 'tooltip',
//     },
//     its: {
//       option: 'Its',
//       code: `.its()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0]) {
//           const value = isNaN(text[0]) ? `'${text[0]}'` : text[0];
//           return `.its(${value})`;
//         } else {
//           return;
//         }
//       },
//     },
//     last: {
//       option: 'Last',
//       code: `.last()`,
//       tooltip: 'tooltip',
//     },
//     location: {
//       option: 'Location',
//       code: `cy.location()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0] === empty) {
//           return `cy.location()`;
//         } else {
//           return `cy.location('${text[0]}')`;
//         }
//       },
//     },
//     next: {
//       option: 'Next',
//       code: `.next()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0] === empty) {
//           return `.next()`;
//         } else {
//           return `.next('${text[0]}')`;
//         }
//       },
//     },
//     nextAll: {
//       option: 'NextAll',
//       code: `.nextAll()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0] === empty) {
//           return `.nextAll()`;
//         } else {
//           return `.nextAll('${text[0]}')`;
//         }
//       },
//     },
//     nextUntil: {
//       option: 'NextUntil',
//       code: `.nextUntil()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (args: []): string {
//         if (args[0] !== empty && args[1] === empty) {
//           return `.nextUntil('${args[0]}')`;
//         } else if (args[0] !== empty && args[1] !== empty) {
//           return `.nextUntil('${args[0]}', '${args[1]}')`;
//         } else {
//           return;
//         }
//       },
//     },
//     not: {
//       option: 'Not',
//       code: `.not()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0]) {
//           return `.not('${text[0]}')`;
//         } else {
//           return;
//         }
//       },
//     },
//     parent: {
//       option: 'Parent',
//       code: `.parent()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0] === empty) {
//           return `.parent()`;
//         } else {
//           return `.parent('${text[0]}')`;
//         }
//       },
//     },
//     parents: {
//       option: 'Parents',
//       code: `.parents()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0] === empty) {
//           return `.parents()`;
//         } else {
//           return `.parents('${text[0]}')`;
//         }
//       },
//     },
//     parentsUntil: {
//       option: 'ParentsUntil',
//       code: `.parentsUntil()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (args: []): string {
//         if (args[0] !== empty && args[1] === empty) {
//           return `.parentsUntil('${args[0]}')`;
//         } else if (args[0] !== empty && args[1] !== empty) {
//           return `.parentsUntil('${args[0]}', '${args[1]}')`;
//         } else {
//           return;
//         }
//       },
//     },
//     prev: {
//       option: 'Prev',
//       code: `.prev()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0] === empty) {
//           return `.prev()`;
//         } else {
//           return `.prev('${text[0]}')`;
//         }
//       },
//     },
//     prevAll: {
//       option: 'PrevAll',
//       code: `.prevAll()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0] === empty) {
//           return `.prevAll()`;
//         } else {
//           return `.prevAll('${text[0]}')`;
//         }
//       },
//     },
//     prevUntil: {
//       option: 'PrevUntil',
//       code: `.prevUntil()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (args: []): string {
//         if (args[0] !== empty && args[1] === empty) {
//           return `.prevUntil('${args[0]}')`;
//         } else if (args[0] !== empty && args[1] !== empty){
//           return `.prevUntil('${args[0]}', '${args[1]}')`;
//         } else {
//           return;
//         }
//       },
//     },
//     readFile: {
//       option: 'Readfile',
//       code: `cy.readFile()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (args: []): string {
//         if (args[0] !== empty && args[1] === empty) {
//           return `cy.readFile('${args[0]}')`;
//         } else if (args[0] !== empty && args[1] !== empty){
//           return `cy.readFile('${args[0]}', '${args[1]}')`;
//         } else {
//           return;
//         }
//       },
//     },
//     Root: {
//       option: 'Root',
//       code: `cy.root()`,
//       tooltip: 'tooltip',
//     },
//     shadow: {
//       option: 'Shadow',
//       code: `.shadow()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0] === empty) {
//           return `.shadow()`;
//         } else {
//           return `.shadow('${text[0]}')`;
//         }
//       },
//     },
//     siblings: {
//       option: 'Siblings',
//       code: `.siblings()`,
//       tooltip: 'tooltip',
//       modal: [
//         { type: 'label', labelText: 'Text to type' },
//         { type: 'input', inputType: 'text' },
//       ],
//       modalCreateCode: function (text: []): string {
//         if (text[0] === empty) {
//           return `.siblings()`;
//         } else {
//           return `.siblings('${text[0]}')`;
//         }
//       },
//     },
//     title: {
//       option: 'Title',
//       code: `cy.title()`,
//       tooltip: 'tooltip',
//     },
//     url: {
//       option: 'URL',
//       code: `cy.url()`,
//       tooltip: 'tooltip',
//     },
//     window: {
//       option: 'Window',
//       code: `cy.window()`,
//       tooltip: 'tooltip',
//     },
//   };

// export default queryOptions;