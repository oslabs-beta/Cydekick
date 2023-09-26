/**
 * Generates the Cypress code that will be generated based off user .
 *
 * Each time the user records, this function will generate a cy.visit command that will
 * store the current url, as well each subsequent user interaction with the browser.
 */

//  EXAMPLE CODE ***

// it('home link should be active when url is "/"', () => {
// No need to pass in custom initialEntries as default url is '/'
//   cy.mount(<Navigation />)

//   cy.get('a').contains('Home').should('have.class', 'active')
// })

// it('login link should be active when url is "/login"', () => {
//   cy.mount(<Navigation />, {
//     routerProps: {
//       initialEntries: ['/login'],
//     },
//   })

//   cy.get('a').contains('Login').should('have.class', 'active')
// })

// A solid test covers three phases
// Setup the application
// Take an action <---- we are HERE
// Make an assertion about the resulting application state


import { eventType } from './constants'
import { parsedEvent } from './types';

//on mount

//handle click
function handleClick(event: parsedEvent): string {
  return `cy.${event.method}('${event.selector}').click();`;
}

//handle dblCLick
function handleDoubleClick(event: parsedEvent): string {
  return `cy.${event.method}('${event.selector}').dblclick();`;
}

//handle keydown
function handleKeydown(event: parsedEvent): string {
  switch (event.key) {
    case 'Backspace':
      return `cy.${event.method}('${event.selector}').type('{backspace}');`;
    case 'Escape':
      return `cy.${event.method}('${event.selector}').type('{esc}');`;
    case 'ArrowUp':
      return `cy.${event.method}('${event.selector}').type('{upArrow}');`;
    case 'ArrowRight':
      return `cy.${event.method}('${event.selector}').type('{rightArrow}');`;
    case 'ArrowDown':
      return `cy.${event.method}('${event.selector}').type('{downArrow}');`;
    case 'ArrowLeft':
      return `cy.${event.method}('${event.selector}').type('{leftArrow}');`;
    default:
      return null;
  }
}

//handle change (like checking a checkbox or radio)
function handleType(event: parsedEvent): string {
  return `cy.${event.method}('${event.selector}').type('${event.typeValue}');`;
}

//handle submit
function handleSubmit(event: parsedEvent): string {
  return `cy.${event.method}('${event.selector}').submit();`;
}

//handleURL
function handleURL(url: string): string {
  return `cy.$url().should('contains', '${url}');`;
}

//exported functions that help action functions
  //createBlock when invoked determines what action is being used and passes it down the switch of actions
  //createVisit makes a cypress visit block
  //createURLBlock makes test block for URLs
export default {
  createBlock: (event: parsedEvent): string => {
    switch(event.action){
      case eventType.click: 
        return handleClick(event);
      case eventType.doubleClick:
          return handleDoubleClick(event);
      case eventType.keyDown:
          return handleKeydown(event);
      case eventType.type:
          return handleType(event);
      case eventType.submit:
          return handleSubmit(event);
      default:
        throw new Error(`unhandled event: ${event.action}`);
    }
  },
  createVisitBlock: (url: string): string => `cy.visit('${url}')`,
  createURLBlock: (url: string): string => handleURL(url),
}
