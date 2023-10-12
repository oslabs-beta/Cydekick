import React from "react";
import { Tree } from "../types/Tree";

type WebViewProps = {
  url: string;
  currentComponent: Tree;
  currentTestId: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
};

const Webview = (props: WebViewProps) => {
  const { url, currentComponent, setData, currentTestId } = props;
  const webviewRef = React.useRef<Electron.WebviewTag | null>(null);
  const [isWebviewReady, setIsWebviewReady] = React.useState(false);
  const [oldComponent, setOldComponent] = React.useState([null, null]);
  const [oldHTML, setOldHTML] = React.useState([null, null, null]);

  // Set up the dom-ready event listener
  React.useEffect(() => {
    const handleDomReady = () => setIsWebviewReady(true);
    const webview = webviewRef.current;
    webview?.addEventListener("dom-ready", handleDomReady);

    return () => {
      webview?.removeEventListener("dom-ready", handleDomReady);
    };
  }, []);

  React.useEffect(() => {
    if (currentComponent && isWebviewReady) {
      const webview = document.getElementById(
        "webview"
      ) as Electron.WebviewTag | null;
      webview
        .executeJavaScript(
          // Use a try-catch block to handle any potential errors
          `try {
    // Use the provided CSS selector to select the element
    let selectedComponent = document.querySelector('${currentComponent.htmlChildrenTestIds[0]}');
    let oldComponent = document.querySelector('${oldComponent[1]}');
    let oldBorder = selectedComponent ? window.getComputedStyle(selectedComponent).border : 'none';
    let result = null;
    // Check if the element exists
    if (selectedComponent) {
      selectedComponent.style.border = "2px solid #1DF28F"
      // Get the outerHTML of the element
      result = selectedComponent.outerHTML;
    }
    if (oldComponent){
      oldComponent.style.border = "${oldComponent[0]}"
    }

  
    // Return the result
    [result, oldBorder, '${currentComponent.htmlChildrenTestIds[0]}'];
  } catch (error) {
    // Handle any errors that occur during execution
    error.message; // You can return the error message for debugging
  }`
        )
        .then((resultFromWebview: [string, string, string]) => {
          // Here, use the result from the webview to update your React component state
          const [result, oldBorder, testid] = resultFromWebview;
          if (result) {
            setOldComponent([oldBorder, testid]);
            setData(result);
          }
        });
    }
  }, [currentComponent, isWebviewReady]);


  React.useEffect(() => {
    if (currentTestId) {
      const webview = document.getElementById(
        "webview"
      ) as Electron.WebviewTag | null;
      webview
        .executeJavaScript(
          `
          try{
          let selectedHTML = document.querySelector('[${currentTestId}]');
          let oldHTML = document.querySelector('[${oldHTML[1]}]');
          let oldBorder = selectedHTML ? window.getComputedStyle(selectedHTML).border : 'none';
          let flashing = false;
          let intervalId;
          if (selectedHTML) {
            intervalId = setInterval(() =>{
              selectedHTML.style.border = flashing ? oldBorder : "3px solid #048C7F";
              flashing = !flashing
            }, 1000)
            
          };          
          if (oldHTML){
            clearInterval(${oldHTML[2]})
            oldHTML.style.border = "${oldHTML[0]}"
          }
          [oldBorder, '${currentTestId}', intervalId]
        } catch (error) {
          // Handle any errors that occur during execution
          error.message; // You can return the error message for debugging
        }
          `
        )
        .then((resultFromWebview: any[]) => {
        // Here, use the result from the webview to update your React component state
          const [oldBorder, oldTestid, intervalId] = resultFromWebview;
          if (oldBorder) {
            setOldHTML([oldBorder, oldTestid, intervalId ]);
          }
        });
    }
  }, [currentTestId]);

  return (
    <div className="w-1/2 p-2">
      <webview
        ref={webviewRef}
        id="webview"
        src={url}
        className="w-full h-full"
      ></webview>
    </div>
  );
};
export default Webview;
