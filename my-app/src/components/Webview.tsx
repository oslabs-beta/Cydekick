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
      handleReset();
      handleClick();
    }
  }, [currentComponent, isWebviewReady]);

  //     `
  //     const leftColumn = document.querySelector('${currentComponent.htmlChildrenTestIds[0]}');
  //     let result = null;
  //     if (leftColumn) {
  //         const clone = leftColumn.cloneNode(true);
  //         document.body.innerHTML = '';
  //         document.body.appendChild(clone);
  //         result = clone.outerHTML;
  //     }
  //     result;
  // `
  function handleClick() {
    console.log("entered function handleClick");
    const webview = document.getElementById(
      "webview"
    ) as Electron.WebviewTag | null;
    webview
      .executeJavaScript(
        `   
            // const originalBodyContent = document.body.innerHTML;
            const leftColumn = document.querySelector('${currentComponent.htmlChildrenTestIds[0]}');
            let result = null;
            if (leftColumn) {
                const clone = leftColumn.cloneNode(true);
                document.body.innerHTML = '';
                document.body.appendChild(clone);
                result = clone.outerHTML;
            }
            result;
        `
      )
      .then((resultFromWebview: string) => {
        // Here, use the result from the webview to update your React component state
        if (resultFromWebview) {
          console.log(resultFromWebview);
          setData(resultFromWebview);
        }
      });
  }
  function handleReset() {
    const webview = webviewRef.current;
    if (webview) {
      webview.loadURL(url);
    }
  }

  return (
    <div className="w-1/2 h-screen flex flex-col p-2">
      <button
        onClick={handleReset}
        className="self-end justify-self-end rounded-lg p-2 mb-2 z-1"
        style={{ backgroundColor: "#1DF28F" }}
      >
        Refresh
      </button>
      <webview
        ref={webviewRef}
        id="webview"
        src={url}
        className="flex-grow"
      ></webview>
    </div>
  );
};
export default Webview;
