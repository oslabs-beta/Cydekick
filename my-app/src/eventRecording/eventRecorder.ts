/**
 * Where the magic happens.
 *
 * Responsible for recording the DOM events.
 */
import { finder } from '@medv/finder';
import getXPath from 'get-xpath';
import type { ParsedEvent } from '../types/parsedEvent';
import { EventType, MatchPattern } from '../types/constant';
import { get } from 'http';

/**
 * Parses DOM events into an object with the necessary data.
 * @param event
 * @returns {ParsedEvent}
 */
function parseEvent(event: Event): any {
  console.log('we parsing');
  let selector: string;

  if ((event.target as Element).hasAttribute('data-cy')) {
    selector = `[data-cy=${(event.target as Element).getAttribute('data-cy')}]`;
  } else if ((event.target as Element).hasAttribute('data-test')) {
    selector = `[data-test=${(event.target as Element).getAttribute(
      'data-test',
    )}]`;
  } else if ((event.target as Element).hasAttribute('data-testid')) {
    selector = `[data-testid=${(event.target as Element).getAttribute(
      'data-testid',
    )}]`;
  } else {
    console.log(event.target);
    selector = finder(event.target as Element, {
      attr: (name, value) =>
        name === 'data-cy' || name === 'data-test' || name === 'data-testid',
    });
  }
  const parsedEvent: ParsedEvent = {
    selector,
    action: event.type,
    tag: (event.target as Element).tagName,
    value: (event.target as HTMLInputElement).value,
  };
  if ((event.target as HTMLAnchorElement).hasAttribute('href'))
    parsedEvent.href = (event.target as HTMLAnchorElement).href;
  if ((event.target as Element).hasAttribute('id'))
    parsedEvent.id = (event.target as Element).id;
  if (parsedEvent.tag === 'INPUT')
    parsedEvent.inputType = (event.target as HTMLInputElement).type;
  if (event.type === 'keydown') parsedEvent.key = (event as KeyboardEvent).key;
  console.log(parsedEvent);
  return parsedEvent;
}

/**
 * Checks if DOM event was triggered by user; if so, it calls parseEvent on the data.
 * @param event
 */
async function handleEvent(event: Event): Promise<void> {
  console.log(event);
  if (event.isTrusted === true) {
    console.log(parseEvent(event));
  }
}

/**
 * Adds event listeners to the DOM.
 */

// function sendFetchRequest() {
//   fetch('http://localhost:9000', {
//     method: 'POST',
//     headers:{

//     }
//     body: {
//       data: 'ihfiehfis',
//       body2: 'idheasfd',
//     },
//   }).catch(err => console.log(err));
// }
function addDOMListeners(): void {
  console.log(EventType);
  Object.values({
    CLICK: 'click',
    CHANGE: 'change',
    DBLCLICK: 'dblclick',
    KEYDOWN: 'keydown',
    SUBMIT: 'submit',
  }).forEach(event => {
    document.addEventListener(event, handleEvent, {
      capture: true,
      passive: true,
    });
  });
}

/**
 * Removes event listeners from the DOM.
 */
function removeDOMListeners(): void {
  Object.values({
    CLICK: 'click',
    CHANGE: 'change',
    DBLCLICK: 'dblclick',
    KEYDOWN: 'keydown',
    SUBMIT: 'submit',
  }).forEach(event => {
    document.removeEventListener(event, handleEvent, { capture: true });
  });
}

/**
 * Initializes the event recorder.
 */
export function initialize(): void {
  console.log('intialized');
  addDOMListeners();
}
