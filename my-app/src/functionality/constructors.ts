// A solid test covers three phases
// Setup the application
// Take an action <---- we are HERE
// Make an assertion about the resulting application state

// import { eventType } from './constants'
import { parsedEvent } from './types';

//action template
function handleTests(event: parsedEvent): string {
  if (event.selector){
    if (event.selectorValue2){
      return `cy.${event.method}('${event.query}').${event.selector}(${event.selectorValue1}, ${event.selectorValue2});`;
    }
    if (event.selectorValue1 && !event.selectorValue2){
      return `cy.${event.method}('${event.query}').${event.selector}(${event.selectorValue1});`;
    }
    return `cy.${event.method}('${event.query}').${event.selector}();`;
  } else {
    return `cy.${event.method}('${event.query}')`;
  }
}

handleTests({
  method: 'get', // This is allowed
  query: 'button',
  selector: 'click', // This is allowed
  selectorValue1: 'anotherButton',
});

handleTests({
  method: 'test', // This is not allowed
  query: 'button',
  selector: 'anotherValue', // This is not allowed
  selectorValue1: 'anotherButton',
});



//describe block
function describeBlock(string: string): string {
  return `describe(${string}, () => {})`;
}

//it block
function itBlock(string: string): string {
  return `it(${string}, () => {})`;
}

//on mount
function handleMount(string: string): string {
  return `cy.mount(${string})`;
}

//handleURL assertion
function handleURL(url: string): string {
  return `cy.url().should('contains', '${url}');`;
}

//create a visit block
function createVisitBlock (url: string): string {
  return `cy.visit(${url})`;
}

export default {
  createVisitBlock,
  handleURL,
  handleTests,
  describeBlock,
  itBlock,
  handleMount,
};

// createBlock: (event: parsedEvent): string => {
//   switch(event.action){
//     case eventType.click:
//       return handleClick(event);
//     case eventType.doubleClick:
//         return handleDoubleClick(event);
//     case eventType.keyDown:
//         return handleKeydown(event);
//     case eventType.type:
//         return handleType(event);
//     case eventType.submit:
//         return handleSubmit(event);
//     default:
//       throw new Error(`unhandled event: ${event.action}`);
//   }
// },

//handle click
// function handleClick(event: parsedEvent): string {
//   return `cy.${event.method}('${event.selector}').click();`;
// }

//handle dblCLick
// function handleDoubleClick(event: parsedEvent): string {
//   return `cy.${event.method}('${event.selector}').dblclick();`;
// }

//handle keydown
// function handleKeydown(event: parsedEvent): string {
//   switch (event.key) {
//     case 'Backspace':
//       return `cy.${event.method}('${event.selector}').type('{backspace}');`;
//     case 'Escape':
//       return `cy.${event.method}('${event.selector}').type('{esc}');`;
//     case 'ArrowUp':
//       return `cy.${event.method}('${event.selector}').type('{upArrow}');`;
//     case 'ArrowRight':
//       return `cy.${event.method}('${event.selector}').type('{rightArrow}');`;
//     case 'ArrowDown':
//       return `cy.${event.method}('${event.selector}').type('{downArrow}');`;
//     case 'ArrowLeft':
//       return `cy.${event.method}('${event.selector}').type('{leftArrow}');`;
//     default:
//       return null;
//   }
// }

//handle change (like checking a checkbox or radio)
// function handleType(event: parsedEvent): string {
//   return `cy.${event.method}('${event.selector}').type('${event.actionValue}');`;
// }

//handle submit
// function handleSubmit(event: parsedEvent): string {
//   return `cy.${event.method}('${event.selector}').submit();`;
// }
