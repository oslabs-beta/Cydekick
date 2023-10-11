/**
 * Generates the Cypress code that will simulate the recorded user session.
 *
 * Each time the user records, this function will generate a cy.visit command that will
 * store the current url, as well each subsequent user interaction with the browser.
 */
import type { ParsedEvent } from '../types/parsedEvent';
import { EventType } from '../types/constant';

/**
 * Helper functions that handle each action type.
 * @param event
 */
const method = 'get';
function handleClick(event: ParsedEvent): string {
  return `cy.${method}('${event.selector}').click();`;
}

function handleKeydown(event: ParsedEvent): string {
  switch (event.key) {
    case 'Backspace':
      return `cy.${method}('${event.selector}').type('{backspace}');`;
    case 'Escape':
      return `cy.${method}('${event.selector}').type('{esc}');`;
    case 'ArrowUp':
      return `cy.${method}('${event.selector}').type('{uparrow}');`;
    case 'ArrowRight':
      return `cy.${method}('${event.selector}').type('{rightarrow}');`;
    case 'ArrowDown':
      return `cy.${method}('${event.selector}').type('{downarrow}');`;
    case 'ArrowLeft':
      return `cy.${method}('${event.selector}').type('{leftarrow}');`;
    default:
      return null;
  }
}

function handleChange(event: ParsedEvent): string {
  if (event.inputType === 'checkbox' || event.inputType === 'radio')
    return null;
  return `cy.${method}('${event.selector}').type('${event.value.replace(
    /'/g,
    "\\'",
  )}');`;
}

function handleDoubleclick(event: ParsedEvent): string {
  return `cy.${method}('${event.selector}').dblclick();`;
}

function handleSubmit(event: ParsedEvent): string {
  return `cy.${method}('${event.selector}').submit();`;
}

function handleUrl(url: string): string {
  const { origin, pathname } = new URL(url);
  return `cy.url().should('contains', '${origin + pathname}');`;
}

export default {
  createBlock: (events: ParsedEvent): any => {
    switch (events.action) {
      case EventType.CLICK:
        return handleClick(events);
      case EventType.KEYDOWN:
        return handleKeydown(events);
      case EventType.CHANGE:
        return handleChange(events);
      case EventType.DBLCLICK:
        return handleDoubleclick(events);
      case EventType.SUBMIT:
        return handleSubmit(events);
      default:
        throw new Error(`Unhandled event: ${events.action}`);
    }
  },
  createVisit: (url: string): string => `cy.visit('${url}');`,
  createUrl: (url: string): string => handleUrl(url),
};
