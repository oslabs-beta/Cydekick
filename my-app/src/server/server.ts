const express = window.require('express');
const cors = window.require('cors');
import { finder } from '@medv/finder';
import inputToString from '../eventRecording/recordedInputToString';
const fs = window.require('fs');
const path = window.require('path');
const app = express();
const port = 9471;
import type { ParsedEvent } from '../types/parsedEvent';
app.use(cors());
app.use(express.json());

//now u may be wondering why a server exist at all for a poject its a valid thought as orginally there was going to be no server however when it came time for the record input feature
// webview was not willing to cooperate. essitally we need to add event listeners to the users page which is being displayed in the webview. and when the event listener is triggered
// we run some code and like magic we turned the user input into code. but this is where the problem lies. there isnt a way to know when an event listner in the webview is triggered
// so when an event listner is triggered it now sends a fetch request with the relevant data and this server is here to reccive the fetch request the event listners on the web view
// are making. look at the recordInput function in stamentPage.tsx if you are still confused. now is there a better way to do this very likley yes. however i do not know that way.
// one day we will live in a world were this server file is not nessacary

const filePath = path.join(process.cwd(), 'UserTests', 'TestBlock.cy.js');

function parseEvent(event: Event, passedInRoot: Element): ParsedEvent {
  console.log('we parsing');
  let selector: string;
  console.log(event);
  console.log(event.target);
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
      root: passedInRoot,
      idName: name => true, // Check if this ID can be used.
      className: name => true, // Check if this class name can be used.
      tagName: name => true,
      attr: (name, value) =>
        name === 'data-cy' || name === 'data-test' || name === 'data-testid',
    });
  }
  const parsedEvent: any = {
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
function handleEvent(event: Event, doc: Element): any {
  console.log(event);
  if (event.isTrusted === true) {
    try {
      const bob = inputToString.createBlock(parseEvent(event, doc));
      return bob;
    } catch (err) {
      return '// one of your recroded inputs was invalid';
    }
  }
}

app.use('/bebop', (req: any, res: any) => {
  console.log('bebop');
  const webview = document.getElementById(
    'webview',
  ) as Electron.WebviewTag | null;

  console.log(webview);
  webview
    .executeJavaScript(
      `
  try {
  let result = document.documentElement.outerHTML
  result;
  }
  catch(err){
    result = err
  }
  `,
    )
    .then((resultFromWebview: string) => {
      if (resultFromWebview) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(resultFromWebview, 'text/html');
        const htmlRootElement = doc.documentElement as HTMLElement;
        console.log(doc);
        const html = parser.parseFromString(req.body.target, 'text/html');
        const ele = html.querySelector('body').firstChild;
        console.log(ele.textContent);

        if (req.body.fakeVal && ele instanceof HTMLInputElement) {
          ele.value = req.body.fakeVal;
        }
        console.log(ele);
        console.log(doc);
        req.body.target = ele;
        console.log(req.body.target);
        const theCode = handleEvent(req.body, htmlRootElement);
        if (theCode) {
          fs.appendFileSync(filePath, '\n\t\t' + theCode);
        }
        // ipcRenderer.send('write-file', handleEvent(req.body, doc));
        res.sendStatus(200);
      }
    });
});
export default function () {
  console.log('this is only here to stop an error');
}
app.listen(port, () => {
  console.log(`listening on port ${port}.`);
});
