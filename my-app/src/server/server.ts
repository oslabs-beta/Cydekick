const express = window.require('express');
const cors = window.require('cors');
import { finder } from '@medv/finder';
import inputToString from '../eventRecording/recordedInputToString';
import { ipcRenderer } from 'electron';
const fs = window.require('fs');
const path = window.require('path');
const app = express();
const port = 9471;

app.use(cors());
app.use(express.json());

const filePath = path.join(process.cwd(), 'UserTests', 'TestBlock.cy.js');

function parseEvent(event: Event, passedInRoot: any): any {
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
function handleEvent(event: any, doc: any): void {
  console.log(event);
  if (event.isTrusted === true) {
    const bob = inputToString.createBlock(parseEvent(event, doc));
    return bob;
  }
}

app.use('/bebop', (req, res) => {
  console.log('bebop');
  console.log(req.body);
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
    .then((resultFromWebview: any) => {
      if (resultFromWebview) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(resultFromWebview, 'text/html');
        console.log(doc);
        const html = parser.parseFromString(req.body.target, 'text/html');
        const ele = html.querySelector('body').firstChild;
        if (req.body.fakeVal) {
          ele.value = req.body.fakeVal;
        }
        console.log(ele);
        console.log(doc);
        req.body.target = ele;
        console.log(req.body.target);
        fs.appendFileSync(filePath, '\n\t\t' + handleEvent(req.body, doc));
        // ipcRenderer.send('write-file', handleEvent(req.body, doc));
        res.sendStatus(200);
      }
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}.`);
});
